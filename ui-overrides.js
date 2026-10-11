// Small presentation overrides for the live Drasard site.
// Keeps the main React source untouched while applying approved copy changes.
(function () {
  const replacements = [
    ["Book a Consultation", "Enquire"],
    ["One-time setup + from €50/month", "One-time setup + €50 monthly fee"],
  ];

  function updateText(root) {
    const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);

    nodes.forEach((textNode) => {
      let value = textNode.nodeValue || "";
      replacements.forEach(([from, to]) => {
        if (value.includes(from)) value = value.split(from).join(to);
      });
      if (value !== textNode.nodeValue) textNode.nodeValue = value;
    });

    // Remove the small consent/privacy line directly below the enquiry form.
    document.querySelectorAll(".contact-form > small").forEach((el) => el.remove());
  }

  const observer = new MutationObserver(() => updateText(document.body));
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  if (document.body) updateText(document.body);
  else document.addEventListener("DOMContentLoaded", () => updateText(document.body), { once: true });
})();
