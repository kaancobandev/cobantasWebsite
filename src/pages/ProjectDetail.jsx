import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Ruler } from 'lucide-react';
import { Eyebrow } from '../components/ui';
import useScrollReveal from '../hooks/useScrollReveal';
import { useProject } from '../hooks/useProjects';
import { useLang } from '../context/LanguageContext';

// Galeri. Eskiden tek bir <img>'in src'si değiştiriliyordu: ok'a her basışta görsel
// sıfırdan indirilmeye başlıyor, inene kadar ekran boş kalıyordu. Şimdi tüm görseller
// üst üste tek seferde basılıyor ->
//  * galeri ekrana yaklaşınca hepsi arka planda (lazy) indirilmeye başlar,
//  * ok'a basıldığında görsel çoktan hazırdır, geçiş anında olur,
//  * geri dönüldüğünde de yeniden indirilmez (DOM'dan çıkmıyorlar).
// Henüz inmemiş bir kareye geçilirse önceki kare ekranda tutulur ve bekleme
// göstergesi çıkar; böylece hiçbir aşamada boş/siyah kutu görünmez.
function Carousel({ images, title }) {
  const { t } = useLang();
  const count = images?.length || 0;

  const [i, setI] = useState(0);
  // Ekranda duran kare. Hedef görsel henüz inmediyse bir öncekinde kalır.
  const [visible, setVisible] = useState(0);
  const [loaded, setLoaded] = useState(() => new Set());

  if (count === 0) return null;

  const show = (next) => {
    setI(next);
    if (loaded.has(next)) setVisible(next); // hazırsa anında geç
  };
  const go = (n) => show((i + n + count) % count);

  const onLoad = (idx) => {
    setLoaded((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
    if (idx === i) setVisible(idx); // beklenen görsel indi -> göster
  };

  return (
    <div className="relative select-none overflow-hidden bg-ink-900">
      <div className="relative aspect-[16/9] w-full">
        {images.map((src, idx) => (
          <img
            key={`${idx}-${src}`}
            src={src}
            alt={`${title} — ${t('detail.image')} ${idx + 1}`}
            // lazy DEĞİL: galeri sayfanın altında kalıyor, lazy olsaydı indirme ancak
            // oraya kaydırınca başlar ve ok'a basınca yine beklenirdi. Düşük öncelikle
            // hemen indiriliyor -> kapak görseli önde, galeri arkada sessizce hazırlanır.
            decoding="async"
            draggable="false"
            fetchPriority={idx === i ? 'high' : 'low'}
            aria-hidden={idx === visible ? undefined : 'true'}
            onLoad={() => onLoad(idx)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
              idx === visible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Beklenen görsel henüz inmediyse (arkada önceki kare durmaya devam eder) */}
        {!loaded.has(i) && (
          <div className="absolute inset-0 grid place-items-center bg-ink-950/45">
            <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </div>
        )}
      </div>

      {count > 1 && (
        <>
          <button onClick={() => go(-1)} aria-label={t('detail.prev')}
            className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/85 text-ink-900 transition-colors hover:bg-bronze-600 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => go(1)} aria-label={t('detail.next')}
            className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/85 text-ink-900 transition-colors hover:bg-bronze-600 hover:text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {images.map((_, idx) => (
              <button key={idx} onClick={() => show(idx)} aria-label={`${t('detail.image')} ${idx + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${idx === i ? 'bg-bronze-500' : 'bg-white/50 hover:bg-white'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { t } = useLang();
  const { id } = useParams();
  const { project, loading } = useProject(id);
  useScrollReveal([loading]);

  useEffect(() => {
    if (project) document.title = `${project.title} | Çobantaş`;
    return () => { document.title = 'Çobantaş | Gayrimenkul & İnşaat'; };
  }, [project]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="h-3 w-40 animate-pulse bg-stone-200" />
        <div className="mt-6 h-10 w-2/3 animate-pulse bg-stone-200" />
        <div className="mt-10 aspect-[16/9] w-full animate-pulse bg-stone-200" />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          <div className="h-3 w-full animate-pulse bg-stone-200" />
          <div className="h-3 w-11/12 animate-pulse bg-stone-200" />
          <div className="h-3 w-3/4 animate-pulse bg-stone-200" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink-900">{t('detail.notFound')}</h1>
        <Link to="/projeler" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-bronze-700">
          <ArrowLeft className="h-4 w-4" /> {t('detail.all')}
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Başlık */}
      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-16 lg:px-8">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-400">
            <Link to="/" className="transition-colors hover:text-bronze-700">{t('common.home')}</Link>
            <ChevronRight className="h-3 w-3 text-bronze-600" />
            <Link to="/projeler" className="transition-colors hover:text-bronze-700">{t('projectsPage.breadcrumb')}</Link>
            <ChevronRight className="h-3 w-3 text-bronze-600" />
            <span className="text-bronze-700">{project.title}</span>
          </nav>
          <Eyebrow>{project.type}</Eyebrow>
          <h1 className="mt-6 font-serif text-4xl leading-[1.1] text-ink-900 md:text-5xl">{project.title}</h1>
          {project.area_m2 ? (
            <div className="mt-6 inline-flex items-center gap-2.5 border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-ink-700">
              <Ruler className="h-4 w-4 text-bronze-600" strokeWidth={1.75} />
              {Number(project.area_m2).toLocaleString('tr-TR')} m²
            </div>
          ) : null}
        </div>
      </section>

      {/* Kapak */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {project.cover_url && (
            <div className="reveal relative overflow-hidden">
              <div className="absolute -inset-3 hidden border border-bronze-300/60 lg:block" />
              {/* Sayfanın en büyük görseli -> yüksek öncelikle çekilsin */}
              <img
                src={project.cover_url}
                alt={project.title}
                decoding="async"
                fetchPriority="high"
                className="relative aspect-[16/9] w-full object-cover"
              />
            </div>
          )}

          {/* Proje bilgileri — yalnızca dolu alanlar gösterilir */}
          {(() => {
            const specs = [
              { label: t('detail.type'), value: project.type },
              { label: t('detail.area'), value: project.area_m2 ? `${Number(project.area_m2).toLocaleString('tr-TR')} m²` : null },
              { label: t('detail.status'), value: project.status ? (t('statusMap')[project.status] || project.status) : null },
              // Serbest metin olarak girilir ("2024-2026" gibi) — olduğu gibi gösterilir
              { label: t('detail.deliveryDate'), value: project.delivery_date },
              { label: t('detail.contractor'), value: project.contractor },
              { label: t('detail.reference'), value: project.reference },
              {
                label: t('detail.referencePhone'),
                value: project.reference_phone,
                href: project.reference_phone
                  ? `tel:${String(project.reference_phone).replace(/[^\d+]/g, '')}`
                  : null,
              },
            ].filter((s) => s.value);
            if (specs.length === 0) return null;
            return (
              <div className="reveal mx-auto mt-14 max-w-3xl border-t border-stone-200">
                {/* sm:gap-x-12 => iki sütun arasında nefes payı; olmadan sol sütunun
                    sağa yaslı değeri ile sağ sütunun etiketi birbirine giriyordu */}
                <dl className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
                  {specs.map((s, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-6 border-b border-stone-200 py-4">
                      <dt className="flex-shrink-0 text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-400">{s.label}</dt>
                      <dd className="min-w-0 break-words text-right font-medium text-ink-800">
                        {s.href ? (
                          <a href={s.href} className="transition-colors hover:text-bronze-700">{s.value}</a>
                        ) : (
                          s.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })()}

          {/* Detay metni */}
          {project.body && (
            <div className="reveal mx-auto mt-14 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-ink-600">
              {project.body}
            </div>
          )}

          {/* Carousel galeri */}
          {project.images?.length > 0 && (
            <div className="reveal mt-16">
              <div className="mb-6"><Eyebrow>{t('detail.gallery')}</Eyebrow></div>
              {/* key: başka bir projeye geçilince galeri sıfırdan kurulsun */}
              <Carousel key={project.id} images={project.images} title={project.title} />
            </div>
          )}

          {/* Alt gezinme */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-10">
            <Link to="/projeler" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-600 transition-colors hover:text-bronze-700">
              <ArrowLeft className="h-4 w-4" /> {t('detail.all')}
            </Link>
            <Link to="/iletisim" className="group inline-flex items-center gap-2.5 bg-bronze-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700">
              {t('detail.contactBtn')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
