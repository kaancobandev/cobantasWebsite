import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const FORM_NAME = 'iletisim';

// Netlify Forms için gövdeyi url-encoded biçimde hazırla
function encode(data) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

// İletişim formu — hem ana sayfada hem İletişim sayfasında kullanılır.
// Gönderim Netlify Forms üzerinden info@cobantas.com'a iletilir (Netlify panelinde
// e-posta bildirimi ayarlanır). Gerçek gönderim yalnızca canlı Netlify sitesinde çalışır.
export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [form, setForm] = useState({ ad: '', soyad: '', email: '', telefon: '', aciklama: '' });
  const [botField, setBotField] = useState('');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, 'bot-field': botField, ...form }),
      });
      if (!res.ok) throw new Error('network');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full border border-stone-300 bg-stone-50 px-4 py-3 text-ink-900 outline-none transition-colors focus:border-bronze-600 focus:bg-white focus:ring-2 focus:ring-bronze-600/15';
  const label = 'mb-2 block text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-500';

  if (status === 'success') {
    return (
      <div className="border border-stone-200 bg-white p-8 text-center shadow-soft md:p-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-bronze-600 text-white">
          <CheckCircle2 className="h-7 w-7" strokeWidth={1.75} />
        </div>
        <h3 className="mt-6 font-serif text-2xl text-ink-900">Talebiniz alındı</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          En kısa sürede sizinle iletişime geçeceğiz. Bize ulaştığınız için teşekkür ederiz.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-stone-200 bg-white p-8 shadow-soft md:p-10">
      <h3 className="font-serif text-2xl text-ink-900">Talep gönderin</h3>
      <p className="mt-2 text-sm text-ink-500">Formu doldurun, ekibimiz sizinle iletişime geçsin.</p>
      <form
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* Netlify için gerekli gizli alanlar */}
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <p className="hidden">
          <label>
            Bu alanı boş bırakın:
            <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} />
          </label>
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-ad" className={label}>Ad</label>
            <input id="cf-ad" type="text" name="ad" value={form.ad} onChange={onChange} required className={field} />
          </div>
          <div>
            <label htmlFor="cf-soyad" className={label}>Soyad</label>
            <input id="cf-soyad" type="text" name="soyad" value={form.soyad} onChange={onChange} required className={field} />
          </div>
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>E-Posta</label>
          <input id="cf-email" type="email" name="email" value={form.email} onChange={onChange} required className={field} />
        </div>
        <div>
          <label htmlFor="cf-telefon" className={label}>Telefon</label>
          <input id="cf-telefon" type="tel" name="telefon" value={form.telefon} onChange={onChange} className={field} />
        </div>
        <div>
          <label htmlFor="cf-aciklama" className={label}>Açıklama</label>
          <textarea id="cf-aciklama" name="aciklama" rows="4" value={form.aciklama} onChange={onChange} required className={field} />
        </div>

        {status === 'error' && (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Gönderilirken bir sorun oluştu. Lütfen tekrar deneyin veya doğrudan info@cobantas.com adresine yazın.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group flex w-full items-center justify-center gap-3 bg-bronze-600 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Gönderiliyor…' : 'Talep Gönder'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
