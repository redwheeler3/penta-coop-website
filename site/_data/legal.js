import { readFileSync } from "node:fs";

const extractDocument = (filename) => {
  const document = readFileSync(new URL(`../../public/${filename}`, import.meta.url), "utf8");
  const styles = document.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  const body = document.match(/(<div class="container">[\s\S]*?)<\/body>/)?.[1];

  if (!styles || !body) throw new Error(`Could not extract legal content from ${filename}.`);
  return { styles, body };
};

export default {
  privacy: extractDocument("privacy.html"),
  terms: extractDocument("terms.html"),
};
