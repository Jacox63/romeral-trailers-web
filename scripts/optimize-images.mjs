// Optimiza las fotos de la marca y genera favicon + imagen Open Graph.
// Uso: npm run images
// Entrada: assets-source/instagram/*.png  ·  Salida: public/images/brand/*.webp, src/app/icon.png,
//          public/og.jpg y src/content/images.json (dimensiones reales para next/image).
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-source/instagram";
const OUT = "public/images/brand";
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /^\d{2}-.+\.png$/.test(f)).sort();
const meta = {};
for (const f of files) {
  const name = f.replace(/\.png$/, "");
  const out = path.join(OUT, `${name}.webp`);
  const info = await sharp(path.join(SRC, f)).webp({ quality: 86, effort: 6 }).toFile(out);
  meta[name] = { src: `/images/brand/${name}.webp`, width: info.width, height: info.height };
  console.log(`${name}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}
await writeFile("src/content/images.json", JSON.stringify(meta, null, 2) + "\n");

// Favicon: recorte del isotipo (picos) del logotipo original de Instagram, sin redibujarlo.
const logo = sharp(path.join(SRC, "logo-instagram.png"));
const { data, info } = await logo.clone().raw().toBuffer({ resolveWithObject: true });
let [minX, minY, maxX, maxY] = [info.width, info.height, 0, 0];
const limitY = Math.floor(info.height * 0.55); // solo la zona del isotipo, sin el texto
for (let y = 0; y < limitY; y++)
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
  }
const pad = 3;
const left = Math.max(0, minX - pad), top = Math.max(0, minY - pad);
const w = Math.min(info.width - left, maxX - minX + 1 + pad * 2);
const h = Math.min(info.height - top, maxY - minY + 1 + pad * 2);
const mark = logo.clone().extract({ left, top, width: w, height: h });
const bg = { r: 45, g: 39, b: 43, alpha: 1 };
for (const [file, size] of [["src/app/icon.png", 96], ["src/app/apple-icon.png", 180]]) {
  const inner = Math.round(size * 0.72);
  const buf = await mark.clone().resize(inner, inner, { fit: "contain", background: bg }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: buf, gravity: "center" }]).png().toFile(file);
}
console.log(`icon.png desde isotipo (${minX},${minY})-(${maxX},${maxY})`);

// Open Graph 1200x630: foto real + panel con nombre (texto en fuente del sistema).
const photo = await sharp(path.join(SRC, "01-comedor-sake.png")).resize(630, 630, { fit: "cover" }).toBuffer();
const panel = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1C1719"/>
  <text x="72" y="250" fill="#F1ECE4" font-family="DejaVu Sans, Arial, sans-serif" font-size="60" font-weight="300" letter-spacing="18">ROMERAL</text>
  <text x="74" y="296" fill="#C9956B" font-family="DejaVu Sans, Arial, sans-serif" font-size="20" letter-spacing="9">TRAILERS</text>
  <text x="72" y="392" fill="#F1ECE4" font-family="DejaVu Sans, Arial, sans-serif" font-size="30">Muebles a medida · Medellín</text>
  <text x="72" y="436" fill="#B8ADA2" font-family="DejaVu Sans, Arial, sans-serif" font-size="22">Taller de diseño · Envíos nacionales</text>
</svg>`);
await sharp(panel).composite([{ input: photo, left: 570, top: 0 }]).jpeg({ quality: 84 }).toFile("public/og.jpg");
console.log("og.jpg 1200x630");
