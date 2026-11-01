# Drasard contact form

The contact form submits to `/api/contact` and sends the inquiry to `brasard.team@gmail.com` through Resend.

## Vercel environment variables

Add these in the Vercel project settings for Production (and Preview if you want to test previews):

- `RESEND_API_KEY` — your Resend API key
- `CONTACT_TO_EMAIL` — `brasard.team@gmail.com` (optional; this is the default)
- `RESEND_FROM_EMAIL` — a sender address/domain verified in Resend. For initial testing, Resend may allow `Drasard Website <onboarding@resend.dev>` for the Resend account owner.

Never commit the real API key to GitHub.

The visitor's email is used as `Reply-To`, so replying to the notification replies directly to the person who submitted the form.
