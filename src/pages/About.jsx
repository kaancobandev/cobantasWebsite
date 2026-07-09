import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target, Eye, ShieldCheck, Gem, Scale, Leaf, Handshake, Lightbulb,
  CheckCircle2, ArrowRight, ChevronRight,
  Factory, Building2, ClipboardCheck,
} from 'lucide-react';
import { Eyebrow } from '../components/ui';
import CountUp from '../components/CountUp';
import useScrollReveal from '../hooks/useScrollReveal';
import { useLang } from '../context/LanguageContext';

const valueIcons = [ShieldCheck, Gem, Scale, Handshake, Leaf, Lightbulb];
const activityIcons = [Factory, Building2, ClipboardCheck];
const statValues = ['21+', '400+', '60+', '120+'];

export default function About() {
  const { t } = useLang();
  useScrollReveal();

  useEffect(() => {
    document.title = `${t('about.breadcrumb')} | Çobantaş`;
    return () => { document.title = 'Çobantaş | Gayrimenkul & İnşaat'; };
  }, [t]);

  const coreValues = t('about.values');
  const activityAreas = t('about.activityItems');
  const commitments = t('about.commitItems');
  const statLabels = t('about.statsLabels');

  return (
    <>
      {/* Sayfa başlığı */}
      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-400">
            <Link to="/" className="transition-colors hover:text-bronze-700">{t('common.home')}</Link>
            <ChevronRight className="h-3 w-3 text-bronze-600" />
            <span className="text-bronze-700">{t('about.breadcrumb')}</span>
          </nav>
          <Eyebrow>{t('about.eyebrow')}</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {t('about.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
            {t('about.lead')}
          </p>
        </div>
      </section>

      {/* Kurumsal profil */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="reveal relative">
              <div className="absolute -inset-3 hidden border border-bronze-300/60 lg:block" />
              <img
                src="/pinnacle.jpg"
                alt="Çobantaş"
                loading="lazy"
                decoding="async"
                className="relative h-[60vh] w-full object-cover"
              />
            </div>
            <div className="reveal">
              <Eyebrow>{t('about.profileEyebrow')}</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.6rem]">
                {t('about.profileHeading')}
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink-600">
                <p>{t('about.profileP1')}</p>
                <p>{t('about.profileP2')}</p>
                <p>{t('about.profileP3')}</p>
              </div>

              <div className="mt-9 grid grid-cols-3 gap-6 border-t border-stone-200 pt-7">
                <div>
                  <div className="font-serif text-3xl text-ink-900">2005</div>
                  <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-700">{t('about.founded')}</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-ink-900">İstanbul</div>
                  <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-700">{t('about.center')}</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-ink-900">M. Çoban</div>
                  <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-700">{t('about.founder')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faaliyet Alanlarımız */}
      <section className="border-t border-stone-200 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>{t('about.activityEyebrow')}</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.6rem]">
              {t('about.activityHeading')}
            </h2>
            <p className="mt-6 leading-relaxed text-ink-500">
              {t('about.activityIntro')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {activityAreas.map((a, idx) => {
              const Icon = activityIcons[idx];
              return (
                <div
                  key={idx}
                  className="reveal group border border-stone-200 bg-white p-9 transition-all duration-300 hover:-translate-y-1 hover:border-bronze-300 hover:shadow-card"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="grid h-14 w-14 place-items-center bg-stone-100 text-bronze-600 transition-colors group-hover:bg-bronze-600 group-hover:text-white">
                    <Icon className="h-7 w-7" strokeWidth={1.25} />
                  </div>
                  <h3 className="mt-7 font-serif text-xl text-ink-900">{a.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-500">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="border-y border-stone-200 bg-stone-100 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <div className="reveal border border-stone-200 bg-white p-9 md:p-11">
              <div className="grid h-14 w-14 place-items-center bg-bronze-600 text-white">
                <Target className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mt-7 font-serif text-2xl text-ink-900 md:text-3xl">{t('about.missionTitle')}</h3>
              <p className="mt-5 leading-relaxed text-ink-600">
                {t('about.mission')}
              </p>
            </div>
            <div className="reveal border border-stone-200 bg-white p-9 md:p-11">
              <div className="grid h-14 w-14 place-items-center bg-ink-900 text-white">
                <Eye className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mt-7 font-serif text-2xl text-ink-900 md:text-3xl">{t('about.visionTitle')}</h3>
              <p className="mt-5 leading-relaxed text-ink-600">
                {t('about.vision')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>{t('about.valuesEyebrow')}</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.6rem]">
              {t('about.valuesHeading')}
            </h2>
            <p className="mt-6 leading-relaxed text-ink-500">
              {t('about.valuesIntro')}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, idx) => {
              const Icon = valueIcons[idx];
              return (
                <div
                  key={idx}
                  className="reveal group border border-stone-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-bronze-300 hover:shadow-card"
                  style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
                >
                  <Icon className="h-9 w-9 text-bronze-600" strokeWidth={1.25} />
                  <h4 className="mt-6 font-serif text-xl text-ink-900">{v.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rakamlarla Çobantaş */}
      <section className="border-y border-stone-200 bg-ink-950 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {statValues.map((value, idx) => (
              <div
                key={idx}
                className={`reveal px-4 py-14 text-center ${idx > 0 ? 'lg:border-l lg:border-white/10' : ''} ${idx % 2 === 1 ? 'border-l border-white/10' : ''} ${idx > 1 ? 'border-t border-white/10 lg:border-t-0' : ''}`}
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <CountUp value={value} className="block font-serif text-5xl text-white lg:text-6xl" />
                <div className="mt-3 text-[0.7rem] font-semibold uppercase tracking-widestx text-bronze-300">
                  {statLabels[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taahhütlerimiz */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <Eyebrow>{t('about.commitEyebrow')}</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.6rem]">
                {t('about.commitHeading')}
              </h2>
              <p className="mt-7 max-w-lg leading-relaxed text-ink-500">
                {t('about.commitIntro')}
              </p>
              <Link to="/iletisim" className="group mt-10 inline-flex items-center gap-2.5 bg-bronze-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700">
                {t('about.commitCta')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="reveal grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:content-center">
              {commitments.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-bronze-600" strokeWidth={1.75} />
                  <span className="text-sm font-medium leading-relaxed text-ink-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
