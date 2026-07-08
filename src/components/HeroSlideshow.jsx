import { useEffect, useState } from 'react';

// Sinematik hero: görseller yumuşak crossfade ile döner, aktif görsele yavaş Ken Burns
// zoom uygulanır. prefers-reduced-motion açıkken sabit (ilk görsel, animasyonsuz).
export default function HeroSlideshow({ images, interval = 5000, className = '' }) {
  const list = (images || []).filter(Boolean);
  const [index, setIndex] = useState(0);

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Liste değişince güvenli indeks
  useEffect(() => {
    setIndex((i) => (i >= list.length ? 0 : i));
  }, [list.length]);

  // Otomatik geçiş
  useEffect(() => {
    if (reduce || list.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), interval);
    return () => clearInterval(id);
  }, [list.length, interval, reduce]);

  if (list.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {list.map((src, i) => (
        <img
          key={`${i}-${src}`}
          src={src}
          alt=""
          aria-hidden="true"
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          } ${i === index && !reduce ? 'animate-kenburns' : ''}`}
        />
      ))}

      {/* Slayt göstergeleri (birden çok görsel varsa) */}
      {list.length > 1 && !reduce && (
        <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Görsel ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
