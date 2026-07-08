import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Ruler } from 'lucide-react';
import { Eyebrow } from '../components/ui';
import useScrollReveal from '../hooks/useScrollReveal';
import { useProject } from '../hooks/useProjects';

function Carousel({ images, title }) {
  const [i, setI] = useState(0);
  if (!images || images.length === 0) return null;
  const go = (n) => setI((prev) => (prev + n + images.length) % images.length);

  return (
    <div className="relative overflow-hidden bg-ink-900">
      <div className="aspect-[16/9] w-full">
        <img src={images[i]} alt={`${title} — görsel ${i + 1}`} className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <>
          <button onClick={() => go(-1)} aria-label="Önceki"
            className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/85 text-ink-900 transition-colors hover:bg-bronze-600 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => go(1)} aria-label="Sonraki"
            className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/85 text-ink-900 transition-colors hover:bg-bronze-600 hover:text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {images.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Görsel ${idx + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${idx === i ? 'bg-bronze-500' : 'bg-white/50 hover:bg-white'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { project, loading } = useProject(id);
  useScrollReveal();

  useEffect(() => {
    if (project) document.title = `${project.title} | Çobantaş`;
    return () => { document.title = 'Çobantaş | Gayrimenkul & İnşaat'; };
  }, [project]);

  if (loading) {
    return <div className="grid min-h-[60vh] place-items-center text-ink-500">Yükleniyor…</div>;
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink-900">Proje bulunamadı</h1>
        <Link to="/projeler" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-bronze-700">
          <ArrowLeft className="h-4 w-4" /> Tüm Projeler
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
            <Link to="/" className="transition-colors hover:text-bronze-700">Anasayfa</Link>
            <ChevronRight className="h-3 w-3 text-bronze-600" />
            <Link to="/projeler" className="transition-colors hover:text-bronze-700">Projeler</Link>
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
              <img src={project.cover_url} alt={project.title} className="relative aspect-[16/9] w-full object-cover" />
            </div>
          )}

          {/* Detay metni */}
          {project.body && (
            <div className="reveal mx-auto mt-14 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-ink-600">
              {project.body}
            </div>
          )}

          {/* Carousel galeri */}
          {project.images?.length > 0 && (
            <div className="reveal mt-16">
              <div className="mb-6"><Eyebrow>Galeri</Eyebrow></div>
              <Carousel images={project.images} title={project.title} />
            </div>
          )}

          {/* Alt gezinme */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-10">
            <Link to="/projeler" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-600 transition-colors hover:text-bronze-700">
              <ArrowLeft className="h-4 w-4" /> Tüm Projeler
            </Link>
            <Link to="/iletisim" className="group inline-flex items-center gap-2.5 bg-bronze-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700">
              İletişime Geçin
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
