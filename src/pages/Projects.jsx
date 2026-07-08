import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ChevronRight } from 'lucide-react';
import { Eyebrow } from '../components/ui';
import useScrollReveal from '../hooks/useScrollReveal';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  useScrollReveal();
  const { projects, loading } = useProjects();

  useEffect(() => {
    document.title = 'Projeler | Çobantaş Gayrimenkul İnşaat';
    return () => { document.title = 'Çobantaş | Gayrimenkul & İnşaat'; };
  }, []);

  return (
    <>
      {/* Sayfa başlığı */}
      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-400">
            <Link to="/" className="transition-colors hover:text-bronze-700">Anasayfa</Link>
            <ChevronRight className="h-3 w-3 text-bronze-600" />
            <span className="text-bronze-700">Projeler</span>
          </nav>
          <Eyebrow>Portföy</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Projelerimiz
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
            İstanbul ve çevresinde hayata geçirdiğimiz, kaliteyi ve estetiği bir araya getiren çalışmalarımızdan bir seçki.
          </p>
        </div>
      </section>

      {/* Proje listesi — satırda 3, en son eklenen en başta */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <p className="text-ink-500">Yükleniyor…</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, idx) => (
                <Link
                  key={p.id}
                  to={`/projeler/${p.id}`}
                  className="reveal group overflow-hidden border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-bronze-300 hover:shadow-card"
                  style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    {p.cover_url && (
                      <img
                        src={p.cover_url}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6">
                    <div>
                      <div className="text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-700">
                        {p.type}{p.area_m2 ? ` · ${Number(p.area_m2).toLocaleString('tr-TR')} m²` : ''}
                      </div>
                      <h3 className="mt-1.5 font-serif text-xl text-ink-900">{p.title}</h3>
                    </div>
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-stone-200 text-bronze-600 transition-colors duration-300 group-hover:border-bronze-600 group-hover:bg-bronze-600 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="reveal mt-16 border-t border-stone-200 pt-12 text-center">
            <h2 className="font-serif text-2xl text-ink-900 md:text-3xl">Aklınızdaki projeyi birlikte hayata geçirelim</h2>
            <Link to="/iletisim" className="group mt-7 inline-flex items-center gap-2.5 bg-bronze-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700">
              İletişime Geçin
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
