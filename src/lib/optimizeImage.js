// Admin panelinden yüklenen görselleri, Supabase'e gitmeden önce tarayıcıda
// küçültüp sıkıştırır. Telefon/fotoğraf makinesi çıktıları 3-8 MB olabiliyor;
// ham hâlleriyle yüklenince proje detayındaki galeri geç açılıyordu.

const MAX_EDGE = 2000;   // uzun kenar (px) — 16/9 galeride retina için fazlasıyla yeter

// Kalite formata göre ayrı: WebP aynı görsel kaliteyi daha düşük değerde veriyor.
// 0.78, mevcut proje fotoğraflarında %11-37 küçülme sağlıyor (gözle fark edilmiyor);
// 0.82'de dosya çoğu zaman orijinalden büyük çıkıyor ve kazanç sıfırlanıyordu.
const QUALITY = { 'image/webp': 0.78, 'image/jpeg': 0.82 };

// canvas.toBlob() WebP'yi kodlayamayan tarayıcılarda hata vermez, sessizce PNG
// döndürür — o da JPEG'den kat kat büyüktür. Bu yüzden 1x1'lik bir denemeyle
// gerçekten WebP üretilebiliyor mu diye bakıyoruz. Sonuç bir kez hesaplanır.
// (Not: WebP'yi *görüntüleme* desteği her yerde var; sorun yalnızca kodlamada.)
let webpProbe;
export function pickFormat() {
  if (!webpProbe) {
    webpProbe = new Promise((resolve) => {
      const c = document.createElement('canvas');
      c.width = 1;
      c.height = 1;
      c.toBlob(
        (b) =>
          resolve(
            b && b.type === 'image/webp'
              ? { type: 'image/webp', ext: 'webp' }
              : { type: 'image/jpeg', ext: 'jpg' }
          ),
        'image/webp',
        0.8 // 1x1 piksel — değerin önemi yok, yalnızca destek yoklaması
      );
    });
  }
  return webpProbe;
}

// Her koşulda kullanılabilir bir File döner; bir aksilik olursa orijinalin kendisi.
export default async function optimizeImage(file) {
  // SVG/GIF gibi türlere dokunma (vektör ve animasyon bozulur)
  if (!file.type.startsWith('image/') || /svg|gif/.test(file.type)) return file;

  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    // decode(): EXIF dönüşü tarayıcı tarafından uygulanmış hâlde ölçü verir
    await img.decode();

    const { type, ext } = await pickFormat();
    const scale = Math.min(1, MAX_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
    // Küçültme gerekmiyorsa ve dosya zaten hedef formattaysa (ya da kazanacak bir şey
    // kalmayacak kadar küçükse) dokunma — ikinci kez kodlamak boşuna kalite kaybı.
    if (scale === 1 && (file.type === type || file.size <= 100 * 1024)) return file;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext('2d');
    // PNG saydamlığı JPEG'de siyaha döner; iki formatta da aynı sonucu vermesi için
    // her hâlükârda beyaz zemine basıyoruz.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((res) => canvas.toBlob(res, type, QUALITY[type]));
    if (!blob || blob.size >= file.size) return file; // kazanç yoksa orijinali koru
    return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.${ext}`, { type });
  } catch {
    return file; // hata olursa orijinali yükle, kayıt engellenmesin
  } finally {
    URL.revokeObjectURL(url);
  }
}
