import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '../components/ui';
import { useLang } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLang();

  useEffect(() => {
    document.title = `${t('notFound.title')} | Çobantaş`;
    return () => { document.title = 'Çobantaş | Gayrimenkul & İnşaat'; };
  }, [t]);

  return (
    <section className="bg-stone-50">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
        <Eyebrow center>404</Eyebrow>
        <h1 className="mt-7 font-serif text-4xl leading-tight text-ink-900 md:text-5xl">
          {t('notFound.title')}
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-500">
          {t('notFound.lead')}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/"
            className="group flex items-center justify-center gap-3 bg-bronze-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('notFound.home')}
          </Link>
          <Link
            to="/projeler"
            className="group flex items-center justify-center gap-3 border border-ink-900/20 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-800 transition-colors hover:border-bronze-600 hover:text-bronze-700"
          >
            {t('notFound.projects')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
