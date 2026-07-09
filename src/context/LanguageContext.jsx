import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext(null);

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function initialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'tr' || saved === 'en') return saved;
    const nav = (navigator.language || '').toLowerCase();
    return nav.startsWith('tr') ? 'tr' : 'en';
  } catch {
    return 'tr';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch { /* yok say */ }
  }, [lang]);

  // t('home.hero.title') → geçerli dildeki değer; yoksa TR'ye, o da yoksa anahtara düşer
  const t = useCallback(
    (key) => {
      const val = getPath(translations[lang], key);
      if (val !== undefined) return val;
      const fb = getPath(translations.tr, key);
      return fb !== undefined ? fb : key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
