# Yönetim Paneli Kurulumu (Supabase)

Panel `/admin` adresinde çalışır (örn. `https://siteniz.com/admin`). Yalnızca yetkili e-posta giriş yapabilir.
Aşağıdaki adımları bir kez yapınca panel aktif olur.

## 1. Supabase projesi
1. https://supabase.com → giriş yap → **New project** ile bir proje oluştur (ücretsiz plan yeterli).
2. Proje açılınca **Settings → API** sayfasına git. Şu iki değeri kopyala:
   - **Project URL**
   - **anon public** key

## 2. Veritabanı + depolama
1. Supabase'de soldan **SQL Editor → New query**.
2. Bu depodaki [`supabase/setup.sql`](supabase/setup.sql) dosyasının içeriğini yapıştır ve **Run** de.
   - Bu; `projects` tablosunu, güvenlik kurallarını (RLS) ve `project-media` foto kovasını oluşturur.
   - En alttaki "başlangıç verisi" bloğu mevcut 6 projeyi ekler (istemezsen o kısmı silebilirsin).

## 3. Admin kullanıcısı (sadece sen)
1. Supabase → **Authentication → Users → Add user**.
2. Giriş yapacağın **e-posta** ve **şifreyi** belirle (bunu panelde kullanacaksın).
3. Başkası kayıt olamasın diye: **Authentication → Sign In / Providers → Email** altında
   **"Allow new users to sign up"** seçeneğini **kapat**.

## 4. Anahtarları siteye tanıt
### Yerelde (bilgisayarında)
Proje kökündeki `.env` dosyasını aç ve doldur:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_ADMIN_EMAIL=senin@eposta.com
```
Sonra `npm run dev` ile çalıştır, `http://localhost:5173/admin` adresine git.

### Netlify'da (canlı site)
Netlify → siten → **Site configuration → Environment variables** → aynı 3 değişkeni ekle:
`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_EMAIL`.
Sonra yeniden deploy et.

> **Güvenlik notu:** `anon` anahtar herkese açık olacak şekilde tasarlanmıştır (sızıntı değildir);
> verilerini koruyan şey yukarıdaki RLS kurallarıdır. Gizli `service_role` anahtarını **asla** siteye/koda koyma.

## Panel nasıl kullanılır
`/admin` → e-posta + şifre ile giriş → **Yeni Proje**:
- **Kapak fotoğrafı** (liste ve kart görseli)
- **Proje adı**
- **Tür** (Müteahhitlik / Taahhüt / Kentsel Dönüşüm / Sanayi Yapıları)
- **Alan (m²)**
- **Detay metni** (proje sayfasında görünür)
- **Carousel fotoğrafları** (detay sayfasındaki kayan galeri)

Eklenen projeler **en son eklenen en başta** olacak şekilde Projeler sayfasında listelenir; bir projeye
tıklayınca detay sayfası (metin + carousel) açılır.
