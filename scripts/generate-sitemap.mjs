// public/sitemap.xml dosyasını üretir: sabit sayfalar + Supabase'deki proje detay sayfaları.
// Build öncesi otomatik çalışır (package.json > prebuild).
//
// TASARIM KURALI: Bu betik ASLA build'i düşürmez. Supabase'e ulaşılamazsa,
// env yoksa ya da beklenmedik bir hata olursa yalnızca sabit sayfalarla
// sitemap yazar ve başarıyla çıkar. Site yayına çıkmaya devam eder.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://cobantas.com';
const STATIC_ROUTES = [
  { loc: '/', changefreq: 'monthly', priority: '1.0' },
  { loc: '/hakkimizda', changefreq: 'yearly', priority: '0.8' },
  { loc: '/projeler', changefreq: 'monthly', priority: '0.9' },
  { loc: '/iletisim', changefreq: 'yearly', priority: '0.7' },
];

// Netlify env'i process.env'de verir; yerelde .env dosyasından okumayı dener.
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
  } catch { /* .env yoksa sorun değil */ }
  return { url, key };
}

async function fetchProjects() {
  const { url, key } = await getEnv();
  if (!url || !key) return [];
  const endpoint = `${url.replace(/\/$/, '')}/rest/v1/projects?select=id,created_at&order=created_at.desc`;
  const res = await fetch(endpoint, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

function xml(entries) {
  const body = entries
    .map((e) => {
      const lastmod = e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : '';
      return `  <url>
    <loc>${SITE}${e.loc}</loc>${lastmod}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

let projects = [];
try {
  projects = await fetchProjects();
  console.log(`sitemap: ${projects.length} proje sayfası eklendi`);
} catch (err) {
  console.warn(`sitemap: projeler alınamadı (${err.message}) — yalnızca sabit sayfalar yazılıyor`);
}

const entries = [
  ...STATIC_ROUTES,
  ...projects.map((p) => ({
    loc: `/projeler/${p.id}`,
    lastmod: p.created_at ? String(p.created_at).slice(0, 10) : undefined,
    changefreq: 'yearly',
    priority: '0.6',
  })),
];

try {
  await writeFile(path.resolve('public/sitemap.xml'), xml(entries));
  console.log(`sitemap: public/sitemap.xml yazıldı (${entries.length} adres)`);
} catch (err) {
  console.warn(`sitemap: yazılamadı (${err.message}) — build devam ediyor`);
}
