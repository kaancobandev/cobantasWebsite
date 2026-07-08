import { ArrowRight } from 'lucide-react';

// İletişim formu — hem ana sayfada hem İletişim sayfasında kullanılır.
// Not: Şimdilik yalnızca arayüz (gönderim arka ucu yok).
export default function ContactForm() {
  const field = 'w-full border border-stone-300 bg-stone-50 px-4 py-3 text-ink-900 outline-none transition-colors focus:border-bronze-600 focus:bg-white focus:ring-2 focus:ring-bronze-600/15';
  const label = 'mb-2 block text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-500';

  return (
    <div className="border border-stone-200 bg-white p-8 shadow-soft md:p-10">
      <h3 className="font-serif text-2xl text-ink-900">Talep gönderin</h3>
      <p className="mt-2 text-sm text-ink-500">Formu doldurun, ekibimiz sizinle iletişime geçsin.</p>
      <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Ad</label>
            <input type="text" className={field} />
          </div>
          <div>
            <label className={label}>Soyad</label>
            <input type="text" className={field} />
          </div>
        </div>
        <div>
          <label className={label}>E-Posta</label>
          <input type="email" className={field} />
        </div>
        <div>
          <label className={label}>Telefon</label>
          <input type="tel" className={field} />
        </div>
        <div>
          <label className={label}>Açıklama</label>
          <textarea rows="4" className={field} />
        </div>
        <button type="submit" className="group flex w-full items-center justify-center gap-3 bg-bronze-600 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700">
          Talep Gönder
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
