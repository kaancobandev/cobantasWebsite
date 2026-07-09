// public/ altındaki görselleri optimize eder (yeniden boyutlandırma + sıkıştırma).
// Çalıştırma: node scripts/optimize-images.mjs
// Not: panorama-silivri.png -> panorama-silivri.jpg olarak dönüştürülür (fotoğraf için
// JPG çok daha küçük). Bu dosyaya kod ve veritabanı referansları da güncellenir.
// Girdi önce belleğe okunur (Windows'ta aynı dosyaya yazarken kilit çakışması olmasın).
import sharp from 'sharp';
import { readdir, readFile, writeFile, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

const pub = path.resolve('public');
const kb = (n) => (n / 1024).toFixed(1) + ' KB';
const size = async (p) => { try { return (await stat(p)).size; } catch { return 0; } };

async function reencodeJpg(file, width = 1920, quality = 80) {
  const p = path.join(pub, file);
  const input = await readFile(p);
  const before = input.length;
  const buf = await sharp(input).rotate().resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, progressive: true }).toBuffer();
  await writeFile(p, buf);
  console.log(`  ${file.padEnd(24)} ${kb(before).padStart(10)} -> ${kb(buf.length).padStart(10)}`);
}

console.log('Proje fotoğrafları (max 1920px, JPG q80):');
for (const f of ['alemara.jpg', 'bahce-bahcesehir.jpg', 'flamingo.jpg', 'lotus-istanbul.jpg', 'pinnacle.jpg']) {
  await reencodeJpg(f);
}

const panoPng = path.join(pub, 'panorama-silivri.png');
if (await size(panoPng)) {
  console.log('\npanorama-silivri.png -> panorama-silivri.jpg:');
  const input = await readFile(panoPng);
  const buf = await sharp(input).resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true }).toBuffer();
  await writeFile(path.join(pub, 'panorama-silivri.jpg'), buf);
  await unlink(panoPng);
  console.log(`  panorama-silivri         ${kb(input.length).padStart(10)} -> ${kb(buf.length).padStart(10)} (.png silindi)`);
}

console.log('\nİş ortağı logoları (max 320px):');
const logosDir = path.join(pub, 'logos');
for (const f of await readdir(logosDir)) {
  const p = path.join(logosDir, f);
  const ext = path.extname(f).toLowerCase();
  const input = await readFile(p);
  let img = sharp(input).resize({ width: 320, withoutEnlargement: true });
  img = ext === '.png'
    ? img.png({ compressionLevel: 9, palette: true })
    : img.jpeg({ quality: 82, mozjpeg: true });
  const buf = await img.toBuffer();
  await writeFile(p, buf);
  console.log(`  logos/${f.padEnd(20)} ${kb(input.length).padStart(10)} -> ${kb(buf.length).padStart(10)}`);
}

console.log('\nBitti.');
