import { useEffect, useRef, useState } from 'react';

// "30+", "150+", "1.200" gibi bir değeri, görünür olunca 0'dan hedefe sayar.
// prefers-reduced-motion açıksa doğrudan son değeri gösterir.
export default function CountUp({ value, duration = 1600, className }) {
  const match = String(value).match(/^(\D*)([\d.,]+)(.*)$/);
  const prefix = match ? match[1] : '';
  const numStr = match ? match[2] : String(value);
  const suffix = match ? match[3] : '';
  const target = Number(numStr.replace(/[.,]/g, '')) || 0;

  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setDisplay(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
              setDisplay(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString('tr-TR')}{suffix}
    </span>
  );
}
