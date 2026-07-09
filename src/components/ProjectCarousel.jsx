import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

// Anasayfanın en üstündeki tam genişlik proje slider'ı.
// Görseller yumuşak crossfade ile geçer, aktif görsele yavaş Ken Burns zoom uygulanır.
// prefers-reduced-motion açıkken: otomatik geçiş ve zoom kapalı (oklarla gezilebilir).
export default function ProjectCarousel({ slides = [], interval = 5000 }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const count = slides.length;
  const go = useCallback((n) => setIndex((i) => (i + n + count) % count), [count]);

  useEffect(() => {
    if (reduce || paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [reduce, paused, count, interval]);

  if (count === 0) return null;
  const active = slides[index];

  return (
    <section
      aria-label={t('home.projects.heading')}
      className="relative w-full overflow-hidden bg-ink-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-[58vh] w-full md:h-[70vh] lg:h-[78vh]">
        {slides.map((s, i) => (
          <img
            key={s.title}
            src={s.img}
            alt={s.title}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : undefined}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            } ${i === index && !reduce ? 'animate-kenburns' : ''}`}
          />
        ))}

        {/* Metnin okunması için koyu geçiş */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-ink-950/10" />

        {/* Aktif projenin başlığı */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-20">
            <div className="mb-3 text-[0.7rem] font-semibold uppercase tracking-widestx text-bronze-300">
              {active.type || t('home.projects.eyebrow')}
            </div>
            {active.id ? (
              <Link to={`/projeler/${active.id}`} className="group inline-flex items-center gap-5">
                <h2 className="font-serif text-3xl leading-tight text-white md:text-5xl">{active.title}</h2>
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-white/30 text-white transition-colors duration-300 group-hover:border-bronze-400 group-hover:bg-bronze-600">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            ) : (
              <h2 className="font-serif text-3xl leading-tight text-white md:text-5xl">{active.title}</h2>
            )}
          </div>
        </div>

        {/* Oklar */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t('detail.prev')}
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/25 bg-ink-950/30 text-white backdrop-blur transition-colors hover:border-bronze-400 hover:bg-bronze-600 lg:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t('detail.next')}
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/25 bg-ink-950/30 text-white backdrop-blur transition-colors hover:border-bronze-400 hover:bg-bronze-600 lg:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Nokta göstergeleri */}
        {count > 1 && (
          <div className="absolute bottom-6 right-6 flex items-center gap-2 lg:right-8">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={s.title}
                aria-current={i === index ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? 'w-8 bg-bronze-500' : 'w-1.5 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
