import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { paths, renderPage } from "../dist-ssr/prerender.js";

const template = await readFile("dist/index.html", "utf8");

for (const path of paths) {
  const { html, title } = renderPage(path);
  const document = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replaceAll('href="/about"', 'href="/about.html"')
    .replaceAll('href="/apply"', 'href="/apply.html"')
    .replaceAll('href="/members"', 'href="/members.html"');
  const output = path === "/" ? "dist/index.html" : join("dist", path.slice(1));
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, document);
}
