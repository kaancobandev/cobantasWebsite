// Supabase'deki proje verilerini dosyaya yedekler.
//   npm run backup              -> yalnızca veriyi (JSON) yedekler
//   npm run backup -- --media   -> görselleri de indirir (backups/media/)
//
// ÖNEMLİ FARK: Build betikleri (sitemap/og) hata olsa bile build'i düşürmez.
// Bu betik TAM TERSİ: başarısız olursa hata koduyla çıkar. Çünkü sessizce
// başarısız olan bir yedek, olmayan yedekten daha tehlikelidir.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('backups');
const withMedia = process.argv.includes('--media');

async function getEnv() {
  let url = process.env.VITE_SUPABASE_URL;
  let key = process.env.VITE_SUPABASE_ANON_KEY;
  if (url && key) return { url, key };
  try {
    const raw = await readFile(path.resolve('.env'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      if (m[1] === 'VITE_SUPABASE_URL' && !url) url = m[2].trim();
      if (m[1] === 'VITE_SUPABASE_ANON_KEY' && !key) key = m[2].trim();
    }
  } catch { /* .env yoksa env değişkenlerine bakılır */ }
  return { url, key };
}

const { url, key } = await getEnv();
if (!url || !key) {
  console.error('HATA: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY bulunamadı. Yedek alınamadı.');
  process.exit(1);
}

// 1) Projeleri çek
const endpoint = `${url.replace(/\/$/, '')}/rest/v1/projects?select=*&order=created_at.desc`;
const res = await fetch(endpoint, {
  headers: { apikey: key, Authorization: `Bearer ${key}` },
  signal: AbortSignal.timeout(30000),
});
if (!res.ok) {
  console.error(`HATA: Supabase yanıtı ${res.status}. Yedek alınamadı.`);
  process.exit(1);
}
const projects = await res.json();
if (!Array.isArray(projects)) {
  console.error('HATA: Beklenmeyen yanıt biçimi. Yedek alınamadı.');
  process.exit(1);
}

// 2) Dosyaya yaz
await mkdir(OUT_DIR, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const payload = {
  exportedAt: new Date().toISOString(),
  table: 'projects',
  count: projects.length,
  projects,
};
const json = JSON.stringify(payload, null, 2);
await writeFile(path.join(OUT_DIR, 'projects-latest.json'), json);
await writeFile(path.join(OUT_DIR, `projects-${stamp}.json`), json);
console.log(`✓ ${projects.length} proje yedeklendi -> backups/projects-latest.json (+ projects-${stamp}.json)`);

// 3) Görsel envanteri
const mediaUrls = [...new Set(projects.flatMap((p) => [p.cover_url, ...(p.images || [])]).filter(Boolean))];
console.log(`  ${mediaUrls.length} benzersiz görsel adresi kayıtlarda yer alıyor`);

// 4) İstenirse görselleri de indir
if (withMedia) {
  const mediaDir = path.join(OUT_DIR, 'media');
  await mkdir(mediaDir, { recursive: true });
  let ok = 0;
  let fail = 0;
  for (const m of mediaUrls) {
    try {
      const r = await fetch(m, { signal: AbortSignal.timeout(30000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const buf = Buffer.from(await r.arrayBuffer());
      const name = decodeURIComponent(m.split('/').pop().split('?')[0]);
      await writeFile(path.join(mediaDir, name), buf);
      ok++;
    } catch (err) {
      console.warn(`  ! indirilemedi: ${m} (${err.message})`);
      fail++;
    }
  }
  console.log(`✓ görseller: ${ok} indirildi, ${fail} başarısız -> backups/media/`);
  if (fail > 0) process.exit(1);
}
