// Giriş perdesinin (index.html'deki #intro) çıkış animasyonu.
// Perde ilk boyamada zaten ekranda; buradaki iş yalnızca uygulama hazır olunca
// kısa bir bekleme sonrası onu soldan sağa kaydırıp DOM'dan kaldırmak.
// Toplam süre ≈ 1 sn (450ms bekleme + 620ms kayma).

const HOLD_MS = 450;
const SLIDE_MS = 620;

let played = false; // aynı sayfa yüklemesinde bir kez (StrictMode çift çağrısına karşı)

export function playIntroExit() {
  if (played) return;
  played = true;

  const el = document.getElementById('intro');
  if (!el) return; // anasayfa değil ya da reduced-motion → perde hiç yok

  clearTimeout(window.__introFailsafe);

  setTimeout(() => {
    el.classList.add('intro-leave');
    setTimeout(() => {
      if (el.parentNode) el.remove();
    }, SLIDE_MS + 60);
  }, HOLD_MS);
}
