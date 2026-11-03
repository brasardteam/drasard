import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const server = await createServer({
  configFile: path.resolve(projectRoot, "vite.config.ts"),
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function translate(value, dictionary) {
  return Object.entries(dictionary)
    .sort(([left], [right]) => right.length - left.length)
    .reduce((result, [source, target]) => result.split(source).join(target), value);
}

function translateMarkup(markup, dictionary) {
  const translatedText = markup.replace(/>([^<>]+)</g, (match, rawText) => {
    const decoded = decodeHtml(rawText);
    return `>${escapeHtml(translate(decoded, dictionary))}<`;
  });

  return translatedText.replace(
    /\b(aria-label|alt|placeholder|title)="([^"]*)"/g,
    (match, attribute, rawValue) => `${attribute}="${escapeHtml(translate(decodeHtml(rawValue), dictionary))}"`,
  );
}

try {
  const { default: App } = await server.ssrLoadModule("/App.tsx");
  const { translations: lvTranslations } = await server.ssrLoadModule("/lv-translation.js");
  const { translations: ruTranslations } = await server.ssrLoadModule("/ru-translation.js");
  const englishMarkup = renderToString(createElement(App, { initialLang: "EN", initialPage: "home" }));
  const englishExamplesMarkup = renderToString(createElement(App, { initialLang: "EN", initialPage: "examples" }));
  const variants = [
    { path: "dist/index.html", markup: englishMarkup, language: "EN" },
    { path: "dist/lv/index.html", markup: translateMarkup(englishMarkup, lvTranslations), language: "LV" },
    { path: "dist/ru/index.html", markup: translateMarkup(englishMarkup, ruTranslations), language: "RU" },
    { path: "dist/examples/index.html", markup: englishExamplesMarkup, language: "EN examples" },
    { path: "dist/lv/examples/index.html", markup: translateMarkup(englishExamplesMarkup, lvTranslations), language: "LV examples" },
    { path: "dist/ru/examples/index.html", markup: translateMarkup(englishExamplesMarkup, ruTranslations), language: "RU examples" },
  ];

  for (const variant of variants) {
    const htmlPath = path.resolve(projectRoot, variant.path);
    const html = await readFile(htmlPath, "utf8");
    const emptyRoot = '<div id="root"></div>';
    if (!html.includes(emptyRoot)) {
      throw new Error(`Could not find the root element in ${variant.path}.`);
    }
    await writeFile(htmlPath, html.replace(emptyRoot, `<div id="root">${variant.markup}</div>`), "utf8");
    process.stdout.write(`Pre-rendered DRASARD ${variant.language} homepage: ${variant.path}\n`);
  }
} finally {
  await server.close();
}
