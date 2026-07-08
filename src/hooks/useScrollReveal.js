import { useEffect } from 'react';

// Kaydırdıkça ".reveal" sınıflı öğeler yumuşakça belirir.
// deps: async veri (ör. Supabase'den gelen projeler) yüklendiğinde yeniden tarasın diye
// bağımlılık verilebilir. Böylece sonradan render edilen kartlar da gözlemlenir.
// (":not(.is-visible)" sayesinde zaten görünür olanlar tekrar animasyona girmez.)
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'));
    if (els.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
