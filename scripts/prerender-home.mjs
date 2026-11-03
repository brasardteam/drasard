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

try {
  const { default: App } = await server.ssrLoadModule("/App.tsx");
  const renderedHome = renderToString(createElement(App));
  const htmlPath = path.resolve(projectRoot, "dist/index.html");
  const html = await readFile(htmlPath, "utf8");
  const emptyRoot = '<div id="root"></div>';

  if (!html.includes(emptyRoot)) {
    throw new Error("Could not find the homepage root element in dist/index.html.");
  }

  await writeFile(
    htmlPath,
    html.replace(emptyRoot, `<div id="root">${renderedHome}</div>`),
    "utf8",
  );
  process.stdout.write("Pre-rendered the DRASARD homepage into dist/index.html\n");
} finally {
  await server.close();
}
