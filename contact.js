function clean(value, max = 4000) {
  return String(value ?? '').trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value).replace(/[&<>\"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
  }[char]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business, email, businessType, websiteType, message, website } = req.body || {};

  // Honeypot: silently accept bot submissions without sending an email.
  if (clean(website)) {
    return res.status(200).json({ ok: true });
  }

  const cleanName = clean(name, 120);
  const cleanBusiness = clean(business, 160);
  const cleanEmail = clean(email, 254);
  const cleanBusinessType = clean(businessType, 80);
  const cleanWebsiteType = clean(websiteType, 80);
  const cleanMessage = clean(message, 4000);

  if (!cleanName || !cleanEmail) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'brasard.team@gmail.com';
  const from = process.env.RESEND_FROM_EMAIL || 'Drasard Website <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('Missing RESEND_API_KEY');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;max-width:680px">
      <h2 style="margin-bottom:24px">New Drasard consultation inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>Business:</strong> ${escapeHtml(cleanBusiness || 'Not provided')}</p>
      <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Business type:</strong> ${escapeHtml(cleanBusinessType || 'Not provided')}</p>
      <p><strong>Website type:</strong> ${escapeHtml(cleanWebsiteType || 'Not provided')}</p>
      <p><strong>Project details:</strong></p>
      <div style="white-space:pre-wrap;background:#f5f2ea;padding:16px;border-radius:8px">${escapeHtml(cleanMessage || 'Not provided')}</div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: cleanEmail,
        subject: `New consultation inquiry${cleanBusiness ? ` — ${cleanBusiness}` : ''}`,
        html,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Resend error:', result);
      return res.status(502).json({ error: 'Email provider rejected the message.' });
    }

    return res.status(200).json({ ok: true, id: result.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Unable to send inquiry.' });
  }
}
