import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight, ExternalLink } from 'lucide-react';
import { Eyebrow, socialIcons } from '../components/ui';
import ContactForm from '../components/ContactForm';
import useScrollReveal from '../hooks/useScrollReveal';
import { contactInfo, socials, MAP_EMBED_URL, MAP_LINK } from '../data/site';

export default function Contact() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'İletişim | Çobantaş Gayrimenkul İnşaat';
    return () => { document.title = 'Çobantaş | Gayrimenkul & İnşaat'; };
  }, []);

  const infoItems = [
    { icon: MapPin, label: 'Adresimiz', value: contactInfo.address, href: MAP_LINK, external: true },
    { icon: Phone, label: 'Telefon', value: contactInfo.phoneDisplay, href: contactInfo.phoneHref },
    { icon: Mail, label: 'E-Posta', value: contactInfo.email, href: contactInfo.emailHref },
  ];

  return (
    <>
      {/* Başlık */}
      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-400">
            <Link to="/" className="transition-colors hover:text-bronze-700">Anasayfa</Link>
            <ChevronRight className="h-3 w-3 text-bronze-600" />
            <span className="text-bronze-700">İletişim</span>
          </nav>
          <Eyebrow>İletişim</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Bizimle iletişime geçin
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
            Proje danışmanlığı, teklif veya her türlü sorunuz için bize ulaşın. Aşağıdaki bilgilerden, sosyal medya hesaplarımızdan veya formu doldurarak en kısa sürede yanıt alın.
          </p>
        </div>
      </section>

      {/* Bilgiler + Form */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Sol: bilgiler + sosyal medya */}
            <div className="reveal">
              <div className="space-y-6">
                {infoItems.map((c, idx) => (
                  <div key={idx} className="flex items-start gap-5">
                    <span className="grid h-12 w-12 flex-shrink-0 place-items-center border border-stone-200 bg-white text-bronze-600">
                      <c.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h4 className="mb-1 text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-400">{c.label}</h4>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.external ? '_blank' : undefined}
                          rel={c.external ? 'noopener noreferrer' : undefined}
                          className="text-ink-700 transition-colors hover:text-bronze-700"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-ink-700">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sosyal medya */}
              <div className="mt-12">
                <h4 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-400">Sosyal Medya</h4>
                <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                  {socials.map((s) => {
                    const Icon = socialIcons[s.icon];
                    const placeholder = s.href === '#';
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target={placeholder ? undefined : '_blank'}
                        rel={placeholder ? undefined : 'noopener noreferrer'}
                        aria-label={s.name}
                        title={placeholder ? `${s.name} (yakında)` : s.name}
                        className={`group flex items-center gap-3 border border-stone-200 bg-white px-4 py-3.5 transition-colors hover:border-bronze-600 ${placeholder ? 'opacity-50' : ''}`}
                      >
                        <span className="grid h-9 w-9 flex-shrink-0 place-items-center bg-stone-100 text-ink-700 transition-colors group-hover:bg-bronze-600 group-hover:text-white">
                          {Icon ? <Icon className="h-4 w-4" /> : null}
                        </span>
                        <span className="truncate text-sm font-semibold text-ink-800">{s.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sağ: form */}
            <div className="reveal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Haritalar konumu */}
      <section className="border-t border-stone-200 bg-stone-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Konum</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl text-ink-900 md:text-4xl">Bizi ziyaret edin</h2>
            </div>
            <a href={MAP_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-bronze-700 transition-colors hover:text-bronze-800">
              Google Haritalar'da Aç <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="reveal overflow-hidden border border-stone-200 bg-white shadow-soft">
            <iframe
              title="Çobantaş konum"
              src={MAP_EMBED_URL}
              className="h-[380px] w-full md:h-[460px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
