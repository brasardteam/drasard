// Small presentation overrides for the live Drasard site.
// Keeps the main React source untouched while applying approved copy changes.
(function () {
  // Prevent duplicate initialization if this file is ever included twice.
  if (window.__drasardUiOverridesInitialized) return;
  window.__drasardUiOverridesInitialized = true;

  const replacements = [
    ["Book a Consultation", "Enquire"],
    ["One-time setup + from €50/month", "One-time setup + monthly fee"],
    ["One-time setup + €50 monthly fee", "One-time setup + monthly fee"],
  ];

  const demoRoutes = {
    "nova café": "/examples/nova-cafe/",
    "nova cafe": "/examples/nova-cafe/",
    "aurelia": "/examples/aurelia/",
    "north table": "/examples/north-table/",
    "ember": "/examples/ember/",
  };

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

  function routeForDemoElement(element) {
    let current = element;
    for (let i = 0; current && i < 7; i += 1, current = current.parentElement) {
      const text = (current.textContent || "").toLowerCase();
      for (const [name, route] of Object.entries(demoRoutes)) {
        if (text.includes(name)) return route;
      }
    }
    return null;
  }

  function connectDemoLinks() {
    document.querySelectorAll("a, button").forEach((element) => {
      const label = (element.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (!label.includes("demo")) return;
      const route = routeForDemoElement(element);
      if (!route) return;
      element.dataset.demoRoute = route;
      if (element.tagName === "A") {
        element.setAttribute("href", route);
        element.removeAttribute("target");
      }
    });
  }

  document.addEventListener("click", (event) => {
    const element = event.target && event.target.closest ? event.target.closest("a, button") : null;
    if (!element || !element.dataset.demoRoute) return;
    event.preventDefault();
    window.location.href = element.dataset.demoRoute;
  });

  const observer = new MutationObserver(() => {
    updateText(document.body);
    connectDemoLinks();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  if (document.body) {
    updateText(document.body);
    connectDemoLinks();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      updateText(document.body);
      connectDemoLinks();
    }, { once: true });
  }
})();
