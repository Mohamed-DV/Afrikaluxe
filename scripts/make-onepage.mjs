import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const rootDir = resolve(".");
const distDir = resolve(rootDir, "dist-static");
const assetsDir = resolve(distDir, "assets");
const outputDir = resolve(rootDir, "dist-onepage");
const outputFile = resolve(outputDir, "index.html");

const MIME_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function extname(fileName) {
  const dot = fileName.lastIndexOf(".");
  return dot >= 0 ? fileName.slice(dot).toLowerCase() : "";
}

function toDataUri(fileName, buffer) {
  const mime = MIME_TYPES[extname(fileName)];
  if (!mime) return null;
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

function replaceAllAssetPaths(content, replacements) {
  let out = content;
  for (const [fileName, dataUri] of replacements) {
    const tokens = [`./assets/${fileName}`, `/assets/${fileName}`, `assets/${fileName}`];
    for (const token of tokens) {
      out = out.split(token).join(dataUri);
    }
  }
  return out;
}

async function run() {
  const indexPath = join(distDir, "index.html");
  let html = await readFile(indexPath, "utf8");

  const jsMatch = html.match(/<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/i);
  const cssMatch = html.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/i);

  if (!jsMatch || !cssMatch) {
    throw new Error("Unable to find JS/CSS entries in dist-static/index.html");
  }

  const jsPath = jsMatch[1].replace(/^\.\//, "");
  const cssPath = cssMatch[1].replace(/^\.\//, "");

  let js = await readFile(join(distDir, jsPath), "utf8");
  let css = await readFile(join(distDir, cssPath), "utf8");

  const assets = await readdir(assetsDir);
  const replacements = new Map();

  for (const fileName of assets) {
    if (fileName.endsWith(".js") || fileName.endsWith(".css")) continue;
    const fileBuffer = await readFile(join(assetsDir, fileName));
    const dataUri = toDataUri(fileName, fileBuffer);
    if (dataUri) replacements.set(fileName, dataUri);
  }

  js = replaceAllAssetPaths(js, replacements);
  css = replaceAllAssetPaths(css, replacements);

  html = html.replace(/<link[^>]+href="[^"]+\.css"[^>]*>/i, `<style>${css}</style>`);
  html = html.replace(
    /<script[^>]+src="[^"]+\.js"[^>]*><\/script>/i,
    `<script type="module">${js}</script>`,
  );

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFile, html, "utf8");

  console.log(`One-page build created: ${outputFile}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
