// Creates optimised copies of selected existing images. Original files are never modified.
// Run from the app directory:  node scripts/optimise-images.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'public/images';
const OUT = 'public/images/optimised';
fs.mkdirSync(OUT, { recursive: true });

const NAVY = '#0a2540';

/** [source file, output base name, widths, optional crop {width,height} aspect] */
const jobs = [
  ['Neovantis home page banner.png', 'home-banner', [800, 1280, 1942], { quality: 80 }],
  ['K-Wire & Pin Set.png', 'k-wire-tray-illustration', [640, 960, 1280]],
  ['Thermocouple RF Electrodes.png', 'rf-electrodes-illustration', [480, 800]],
  ['RF Procedure Kit.png', 'rf-consumables-illustration', [800, 1080]],
  ['distributors and partners hero.png', 'procurement-meeting-illustration', [800, 1200], { aspect: 16 / 9 }],
  ['neovantis-healthcare-professionals.png', 'clinical-team-illustration', [800, 1200], { aspect: 16 / 9 }],
  // Left-hand side only (laptop, tablet, notes, stethoscope); excludes the medicines on the right.
  ['clinical insights hero.png', 'documents-desk-illustration', [800, 1200], { extract: { left: 0, top: 0, width: 1244, height: 700 } }],
];

for (const [file, base, widths, opts = {}] of jobs) {
  const input = path.join(SRC, file);
  const meta = await sharp(input).metadata();
  let pipeline = () => sharp(input);
  if (opts.extract) {
    pipeline = () => sharp(input).extract(opts.extract);
  } else if (opts.aspect) {
    const h = meta.height;
    const w = Math.min(meta.width, Math.round(h * opts.aspect));
    const left = Math.round((meta.width - w) / 2);
    pipeline = () => sharp(input).extract({ left, top: 0, width: w, height: h });
  }
  for (const w of widths) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    const info = await pipeline().resize({ width: w, withoutEnlargement: true }).webp({ quality: opts.quality ?? 74 }).toFile(out);
    console.log(out, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
  }
}

// Branded share image (Open Graph): approved logo on deep navy, no product imagery.
const logo = path.join(SRC, 'neovantis-logo.png');
const logoBuf = await sharp(logo).resize({ width: 760 }).png().toBuffer();
const logoMeta = await sharp(logoBuf).metadata();
const strap = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d3456"/><stop offset="1" stop-color="#061a2e"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="600" width="1200" height="30" fill="#1f7fb6"/>
  <text x="600" y="500" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#cfe3f3">Specialist medical and surgical solutions  |  Umhlanga, Durban</text>
</svg>`);
await sharp(strap)
  .composite([{ input: logoBuf, left: Math.round((1200 - logoMeta.width) / 2), top: 150 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'og-neovantis.png'));
console.log('og-neovantis.png written');

// Icons: crop the dot mark from the approved logo and place it on navy.
const markCrop = { left: 157, top: 0, width: 24, height: 128 };
// Keep only the blue dots: make the white lettering transparent.
const { data: px, info: pxInfo } = await sharp(logo).extract(markCrop).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < px.length; i += 4) {
  const [r, g, b] = [px[i], px[i + 1], px[i + 2]];
  if (b - r < 60) px[i + 3] = 0;
}
const mark = await sharp(px, { raw: { width: pxInfo.width, height: pxInfo.height, channels: 4 } }).trim().png().toBuffer();
for (const size of [32, 180, 512]) {
  const markH = Math.round(size * 0.86);
  const m = await sharp(mark).resize({ height: markH }).toBuffer();
  const mm = await sharp(m).metadata();
  await sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: m, left: Math.round((size - mm.width) / 2), top: Math.round((size - markH) / 2) }])
    .png()
    .toFile(path.join(OUT, `icon-${size}.png`));
}
console.log('icons written');
