// Her sayfa için doğru OG/başlık etiketlerine sahip STATİK HTML üretir.
// Build'den SONRA çalışır (package.json > postbuild).
//
// NEDEN GEREKLİ: Site tarayıcıda JavaScript ile çiziliyor. WhatsApp, LinkedIn,
// Facebook gibi paylaşım botları JavaScript ÇALIŞTIRMAZ — yalnızca sunucudan gelen
// ham HTML'i okur. Bu yüzden hangi sayfayı paylaşırsan paylaş hep anasayfanın
// önizlemesi çıkıyordu. Bu betik her rota için ayrı bir HTML dosyası yazar;
// Netlify o dosyayı doğrudan sunar, bot doğru başlık/görseli görür.
// İnsan ziyaretçi için hiçbir şey değişmez: aynı JS paketi yüklenir, SPA devralır.
//
// TASARIM KURALI: Bu betik ASLA build'i düşürmez (hata olsa da exit 0).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://cobantas.com';
const DIST = path.resolve('dist');
const BRAND = 'Çobantaş';

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const absolute = (url) => {
  if (!url) return `${SITE}/pinnacle.jpg`;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE}${url.startsWith('/') ? '' : '/'}${url}`;
};

// Bir <meta ...> etiketinin content değerini değiştirir (çok satırlı etiketleri de kapsar)
function replaceMeta(html, attrMatch, value) {
  const re = new RegExp(`<meta[^>]*${attrMatch}[^>]*>`, 'i');
  return html.replace(re, (tag) => tag.replace(/content="[^"]*"/i, `content="${esc(value)}"`));
}

function buildPage(template, { title, description, url, image }) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = replaceMeta(html, 'name="description"', description);
  html = replaceMeta(html, 'property="og:title"', title);
  html = replaceMeta(html, 'property="og:description"', description);
  html = replaceMeta(html, 'property="og:url"', url);
  html = replaceMeta(html, 'property="og:image"', image);
  html = replaceMeta(html, 'name="twitter:title"', title);
  html = replaceMeta(html, 'name="twitter:description"', description);
  html = replaceMeta(html, 'name="twitter:image"', image);
  // Her sayfaya kendi canonical adresi (artık sayfa başına HTML olduğu için doğru)
  html = html.replace(
    /<\/head>/i,
    `  <link rel="canonical" href="${esc(url)}" />\n  </head>`
  );
  return html;
}

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
  const endpoint = `${url.replace(/\/$/, '')}/rest/v1/projects?select=id,title,type,area_m2,cover_url,body`;
  const res = await fetch(endpoint, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

const STATIC_PAGES = [
  {
    file: 'hakkimizda.html',
    url: `${SITE}/hakkimizda`,
    title: `Hakkımızda | ${BRAND}`,
    description:
      "2005 yılında Mustafa Çoban tarafından İstanbul'da kurulan Çobantaş Gayrimenkul İnşaat; müteahhitlik, taahhüt, kentsel dönüşüm ve sanayi yapılarında 21 yılı aşkın tecrübe.",
    image: `${SITE}/pinnacle.jpg`,
  },
  {
    file: 'projeler.html',
    url: `${SITE}/projeler`,
    title: `Projeler | ${BRAND}`,
    description:
      'Çobantaş’ın İstanbul ve çevresinde hayata geçirdiği konut, sanayi ve taahhüt projelerinden bir seçki.',
    image: `${SITE}/alemara.jpg`,
  },
  {
    file: 'iletisim.html',
    url: `${SITE}/iletisim`,
    title: `İletişim | ${BRAND}`,
    description:
      'Çobantaş Gayrimenkul İnşaat iletişim bilgileri, konum ve teklif formu. Küçükçekmece / İstanbul.',
    image: `${SITE}/pinnacle.jpg`,
  },
];

try {
  const template = await readFile(path.join(DIST, 'index.html'), 'utf8');
  let written = 0;

  // 1) Anasayfa: yalnızca canonical eklenir (diğer etiketleri zaten doğru)
  const home = template.replace(
    /<\/head>/i,
    `  <link rel="canonical" href="${SITE}/" />\n  </head>`
  );
  await writeFile(path.join(DIST, 'index.html'), home);
  written++;

  // 2) Sabit sayfalar
  for (const p of STATIC_PAGES) {
    await writeFile(path.join(DIST, p.file), buildPage(template, p));
    written++;
  }

  // 2b) 404 sayfası — Netlify eşleşmeyen adreslerde bunu GERÇEK 404 koduyla sunar.
  //     SPA açılır ve içerideki NotFound sayfası çizilir; arama motoru 404 görür.
  let notFound = buildPage(template, {
    title: 'Sayfa bulunamadı | Çobantaş',
    description: 'Aradığınız sayfa taşınmış, adı değişmiş veya hiç var olmamış olabilir.',
    url: `${SITE}/404`,
    image: `${SITE}/pinnacle.jpg`,
  });
  notFound = replaceMeta(notFound, 'name="robots"', 'noindex, follow');
  await writeFile(path.join(DIST, '404.html'), notFound);
  written++;

  // 3) Proje detay sayfaları
  let projects = [];
  try {
    projects = await fetchProjects();
  } catch (err) {
    console.warn(`og: projeler alınamadı (${err.message}) — yalnızca sabit sayfalar üretildi`);
  }

  if (projects.length) {
    await mkdir(path.join(DIST, 'projeler'), { recursive: true });
    for (const pr of projects) {
      const bits = [pr.type, pr.area_m2 ? `${Number(pr.area_m2).toLocaleString('tr-TR')} m²` : null]
        .filter(Boolean)
        .join(' · ');
      const body = (pr.body || '').replace(/\s+/g, ' ').trim();
      const description = body
        ? body.slice(0, 180)
        : `${pr.title}${bits ? ` — ${bits}` : ''}. Çobantaş Gayrimenkul İnşaat tarafından hayata geçirilmiştir.`;
      await writeFile(
        path.join(DIST, 'projeler', `${pr.id}.html`),
        buildPage(template, {
          title: `${pr.title} | ${BRAND}`,
          description,
          url: `${SITE}/projeler/${pr.id}`,
          image: absolute(pr.cover_url),
        })
      );
      written++;
    }
  }

  console.log(`og: ${written} sayfa üretildi (${projects.length} proje detayı dahil)`);
} catch (err) {
  console.warn(`og: sayfa üretimi atlandı (${err.message}) — build devam ediyor`);
}
