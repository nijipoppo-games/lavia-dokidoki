// Keep index.html self-contained so HTML-only previews need no asset URLs.
// Run again after editing style.css or script.js. No dependencies required.
const fs = require("node:fs");
const path = require("node:path");
const file = name => path.join(__dirname, name);
let html = fs.readFileSync(file("index.html"), "utf8");
const css = fs.readFileSync(file("style.css"), "utf8");
const js = fs.readFileSync(file("script.js"), "utf8");
const stylePattern = /<link rel="stylesheet" href="(?:\.\/)?style\.css">|<!-- bundled-style:start -->[\s\S]*?<!-- bundled-style:end -->/;
const scriptPattern = /<script src="(?:\.\/)?script\.js" defer><\/script>|<!-- bundled-script:start -->[\s\S]*?<!-- bundled-script:end -->/;
if (!stylePattern.test(html) || !scriptPattern.test(html)) {
  throw new Error("Cannot find asset references or bundle markers in index.html");
}
html = html.replace(stylePattern, () => `<!-- bundled-style:start -->\n<style>\n${css.replace(/<\/style/gi, "<\\/style")}\n</style>\n<!-- bundled-style:end -->`);
// Inline scripts do not support defer; wait for the DOM explicitly.
html = html.replace(scriptPattern, () => `<!-- bundled-script:start -->\n<script>\ndocument.addEventListener("DOMContentLoaded", () => {\n${js.replace(/<\/script/gi, "<\\/script")}\n});\n</script>\n<!-- bundled-script:end -->`);
fs.writeFileSync(file("index.html"), html);
console.log("Built self-contained index.html from style.css and script.js");
