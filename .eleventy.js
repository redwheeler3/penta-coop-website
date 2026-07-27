export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "public/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "public/house-favicon.png": "house-favicon.png" });
  eleventyConfig.addPassthroughCopy({ "public/placeholder.svg": "placeholder.svg" });
  eleventyConfig.addPassthroughCopy({ "public/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "public/social-preview.png": "social-preview.png" });
  eleventyConfig.addPassthroughCopy({ "public/penta-images": "penta-images" });
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });
  eleventyConfig.addWatchTarget("src/index.css");

  return {
    dir: { input: "site", includes: "_includes", output: "dist" },
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "html", "md"],
  };
}
