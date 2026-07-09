import { useLang } from '../context/LanguageContext';

export default function LangToggle({ variant = 'light', className = '' }) {
  const { lang, setLang } = useLang();
  const base = 'text-[0.7rem] font-semibold uppercase tracking-[0.1em] transition-colors';
  const active = 'text-bronze-600';
  const idle = variant === 'dark' ? 'text-stone-400 hover:text-white' : 'text-ink-400 hover:text-ink-900';
  const sep = variant === 'dark' ? 'text-white/30' : 'text-ink-300';
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <button type="button" onClick={() => setLang('tr')} aria-label="Türkçe" className={`${base} ${lang === 'tr' ? active : idle}`}>TR</button>
      <span className={sep}>/</span>
      <button type="button" onClick={() => setLang('en')} aria-label="English" className={`${base} ${lang === 'en' ? active : idle}`}>EN</button>
    </div>
  );
}
