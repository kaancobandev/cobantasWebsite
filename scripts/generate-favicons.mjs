// Şirket logosundan (public/cobantas-logo.jpeg) tam favicon setini üretir.
// Çalıştırma: npm run favicons
// Logoyu değiştirdiğinde bu betiği tekrar çalıştırman yeterli.
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const pub = path.resolve('public');
const SRC = path.join(pub, 'cobantas-logo.jpeg');
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const kb = (n) => (n / 1024).toFixed(1) + ' KB';

const input = await readFile(SRC);

// 1) Logonun etrafındaki beyaz boşluğu kırp, sonra dengeli bir iç boşluk bırak
const trimmed = await sharp(input).trim({ background: '#ffffff', threshold: 12 }).toBuffer();
const meta = await sharp(trimmed).metadata();
console.log(`Kaynak: ${meta.width}x${meta.height} (kırpılmış)`);

const pad = Math.round(Math.max(meta.width, meta.height) * 0.1);
const padded = await sharp(trimmed)
  .extend({ top: pad, bottom: pad, left: pad, right: pad, background: WHITE })
  .toBuffer();

const square = (size) =>
  sharp(padded).resize(size, size, { fit: 'contain', background: WHITE }).png({ compressionLevel: 9 }).toBuffer();

// 2) PNG boyutları
const written = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['android-chrome-192x192.png', 192],
  ['android-chrome-512x512.png', 512],
];

console.log('\nÜretilen ikonlar:');
for (const [name, size] of written) {
  const buf = await square(size);
  await writeFile(path.join(pub, name), buf);
  console.log(`  ${name.padEnd(30)} ${kb(buf.length)}`);
}

// 3) favicon.ico (16/32/48 birlikte)
const ico = await pngToIco([await square(16), await square(32), await square(48)]);
await writeFile(path.join(pub, 'favicon.ico'), ico);
console.log(`  ${'favicon.ico'.padEnd(30)} ${kb(ico.length)}`);

console.log('\nBitti.');
