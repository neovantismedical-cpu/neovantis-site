// Creates optimised copies of selected existing images. Original files are never modified.
// Run from the app directory:  node scripts/optimise-images.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'public/images';
const OUT = 'public/images/optimised';
fs.mkdirSync(OUT, { recursive: true });

/** [source file, output base name, widths, optional crop {width,height} aspect] */
const jobs = [
  ['Neovantis home page banner.png', 'home-banner', [800, 1280, 1942], { quality: 80 }],
  ['Neovantis home page banner theatre supply.png', 'home-theatre-banner', [800, 1280, 1920], { quality: 80 }],
  ['Neovantis About banner.png', 'about-banner', [800, 1280, 1942], { quality: 80 }],
  ['neovantis-offices.png', 'neovantis-offices', [640, 960, 1280], { quality: 78 }],
  ['K-Wire & Pin Set.png', 'k-wire-tray-illustration', [640, 960, 1280]],
  ['Thermocouple RF Electrodes.png', 'rf-electrodes-illustration', [480, 800]],
  ['RF Procedure Kit.png', 'rf-consumables-illustration', [800, 1080]],
  ['distributors and partners hero.png', 'procurement-meeting-illustration', [800, 1200], { aspect: 16 / 9 }],
  ['neovantis-healthcare-professionals.png', 'clinical-team-illustration', [800, 1200], { aspect: 16 / 9 }],
  // Left-hand side only (laptop, tablet, notes, stethoscope); excludes the medicines on the right.
  ['clinical insights hero.png', 'documents-desk-illustration', [800, 1200], { extract: { left: 0, top: 0, width: 1244, height: 700 } }],
  // About page photographs (approved for use).
  ['Neovantis_Nurses_Day_Portrait.jpg', 'nurses-day-portrait', [480, 800], { quality: 78 }],
  ['Neovantis_Nurses_Day.jpg', 'nurses-day-celebration', [640, 960, 1152], { quality: 78 }],
  ['Neovantis_Display_Portfolios.png', 'portfolio-display', [640, 960, 1280], { quality: 78 }],
  // Interventional Pain Management artwork, taken unaltered from the Neovantis brand guide.
  ['brand-pack/brand-spine-sketch.jpg', 'brand-spine-sketch', [900, 1600], { quality: 70, grey: true }],
  ['brand-pack/brand-theatre-team.jpg', 'circle-theatre-team', [320, 560], { quality: 76, extract: { left: 0, top: 260, width: 1815, height: 1815 } }],
  // Square centred on the clinician's hands, needles and leads, so they stay inside the circle.
  ['brand-pack/rf-treatment-lower-back.png', 'circle-rf-treatment', [320, 560], { quality: 78, extract: { left: 25, top: 75, width: 953, height: 953 } }],
  ['brand-pack/brand-clinician-spine-model.jpg', 'circle-clinician-spine-model', [320, 560], { quality: 76, extract: { left: 560, top: 0, width: 1640, height: 1640 } }],
  ['brand-pack/brand-back-anatomy-sketch.png', 'circle-back-anatomy-sketch', [320, 460], { quality: 78, extract: { left: 173, top: 0, width: 461, height: 461 } }],
];
// Pass file names as arguments to optimise only those sources, e.g. node scripts/optimise-images.mjs "Neovantis_Nurses_Day.jpg"
const only = process.argv.slice(2);
if (only.length) jobs.splice(0, jobs.length, ...jobs.filter(([file]) => only.includes(file)));

for (const [file, base, widths, opts = {}] of jobs) {
  const input = path.join(SRC, file);
  const meta = await sharp(input).metadata();
  let pipeline = () => sharp(input);
  if (opts.grey) {
    // Neutral grey version of the brand guide's sepia spine sketch.
    pipeline = () => sharp(input).grayscale();
  } else if (opts.extract) {
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

if (only.length) process.exit(0);

// Default Open Graph image using the corporate logo and palette.
const logo = path.join(SRC, 'neovantis-logo-white-tm.png');
const logoBuf = await sharp(logo).resize({ width: 760 }).png().toBuffer();
const logoMeta = await sharp(logoBuf).metadata();
const strap = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#312e2d"/>
  <path d="M1200 410V630H985Z" fill="#1e5faa"/>
  <g fill="#68bbe3">
    <circle cx="548" cy="430" r="8"/>
    <circle cx="578" cy="430" r="7"/>
    <circle cx="606" cy="430" r="6"/>
    <circle cx="631" cy="430" r="5"/>
    <circle cx="654" cy="430" r="4"/>
  </g>
  <text x="600" y="500" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#fff">Specialist medical and surgical solutions  |  Umhlanga, Durban</text>
</svg>`);
await sharp(strap)
  .composite([{ input: logoBuf, left: Math.round((1200 - logoMeta.width) / 2), top: 150 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'og-neovantis.png'));
console.log('og-neovantis.png written');

// Browser icons use the guide's decorative dot row at small sizes.
for (const size of [32, 180, 512]) {
  await sharp('public/favicon.svg', { density: 576 })
    .resize(size, size)
    .png()
    .toFile(path.join(OUT, `icon-${size}.png`));
}
console.log('icons written');
