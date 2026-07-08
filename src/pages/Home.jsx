import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, HardHat, Ruler, Hammer,
  Phone, Mail, MapPin,
  ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck,
  Factory, ClipboardCheck,
} from 'lucide-react';
import { Eyebrow } from '../components/ui';
import ContactForm from '../components/ContactForm';
import CountUp from '../components/CountUp';
import HeroSlideshow from '../components/HeroSlideshow';
import useScrollReveal from '../hooks/useScrollReveal';
import { useProjects } from '../hooks/useProjects';

const stats = [
  { label: 'Yıllık Tecrübe', value: '30+' },
  { label: 'Uzman Kadro', value: '150+' },
  { label: 'Tamamlanan Proje', value: '30+' },
  { label: 'İş Ortağı', value: '20+' },
];

const services = [
  { icon: Building2, title: 'Mimari Vizyon', desc: 'Sadece binalar inşa etmiyor; modern zarafetin fonksiyonellikle buluştuğu, bulunduğu çevreye değer katan prestijli yaşam alanları yaratıyoruz.' },
  { icon: Ruler, title: 'Kusursuz Mühendislik', desc: 'Statik güvenlikten en ince dekorasyon detayına kadar, alanında uzman ekiplerle çalışarak vizyonu hatasız bir gerçeğe dönüştürüyoruz.' },
  { icon: HardHat, title: 'Proje Yönetimi', desc: 'Süreçleri mutlak şeffaflıkla yönetiyor, planlamadan teslime kadar her adımı titizlikle denetleyerek kalite standardımızdan ödün vermiyoruz.' },
  { icon: Hammer, title: 'Tavizsiz İşçilik', desc: 'Her metrekarede, estetiği ve sarsılmaz dayanıklılığı garanti eden birinci sınıf, endüstri standartlarının üzerindeki malzemeleri tercih ediyoruz.' },
];

const partners = [
  { name: 'Batı Yapı', src: '/logos/bati-yapi.png' },
  { name: 'Binbay Yapı', src: '/logos/binbay-yapi.png' },
  { name: 'Ergün', src: '/logos/ergun.png' },
  { name: 'Küba Mimarlık', src: '/logos/kuba-mimarlik.png' },
  { name: 'Mutlu İnşaat', src: '/logos/mutlu-insaat.png' },
  { name: 'Sistem A', src: '/logos/sistem-a.png' },
  { name: 'SOM', src: '/logos/som.png' },
  { name: 'UB Holding', src: '/logos/ub-holding.jpg' },
  { name: 'Öz Baykara İnşaat', src: '/logos/oz-baykara.png' },
  { name: 'Irmaklar', src: '/logos/irmaklar.png' },
];

const values = [
  'Tavizsiz İş Güvenliği',
  'Gelişmiş Yapısal Mühendislik',
  'Zaman Çizelgesine Sıkı Uyum',
  'Sürdürülebilir ve Çevre Dostu Uygulamalar',
];

const activityLines = [
  { icon: Factory, type: 'Fabrika', title: 'Fabrika & Endüstriyel Yapılar', desc: 'Üretim tesisleri, depo ve endüstriyel yapıların projelendirilmesi ve anahtar teslim inşası.' },
  { icon: Building2, type: 'Konut', title: 'Konut Projeleri', desc: 'Modern mimari ile yüksek yaşam kalitesini buluşturan prestijli konut projeleri.' },
  { icon: ClipboardCheck, type: 'Taahhüt', title: 'Taahhüt İşleri', desc: 'Planlamadan teslime kadar uçtan uca yönetilen anahtar teslim taahhüt hizmetleri.' },
];

export default function Home() {
  const { projects } = useProjects();
  useScrollReveal([projects.length]);

  // Hero'da gerçek proje kapakları döner; projeler yüklenene kadar mimari bir görsel gösterilir.
  const heroImages = useMemo(() => {
    const covers = projects.map((p) => p.cover_url).filter(Boolean).slice(0, 5);
    return covers.length
      ? covers
      : ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80'];
  }, [projects]);

  return (
    <>
      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-stone-50">
        <div className="pointer-events-none absolute inset-y-0 right-[35%] hidden w-px bg-stone-200 lg:block" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid min-h-[88vh] items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-0">
            <div className="lg:col-span-6 lg:pr-6">
              <Eyebrow>Güvenle Yükselen</Eyebrow>
              <h1 className="mt-7 font-serif text-[2.6rem] leading-[1.07] text-ink-900 sm:text-5xl lg:text-[3.85rem]">
                Vizyonu gerçeğe,<br />
                gerçeği <span className="italic text-bronze-700">mükemmelliğe</span><br />
                dönüştürüyoruz.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-500">
                Sarsılmaz dayanıklılık ve yenilikçi mühendislik. Köklü saha tecrübemiz ve tavizsiz iş ahlakımızla projelerinizi temelden çatıya eksiksiz yönetiyor, söz verdiğimiz zamanda teslim ediyoruz.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#projects" className="group flex items-center justify-center gap-3 bg-bronze-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700">
                  Projelerimize Göz Atın
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link to="/hakkimizda" className="flex items-center justify-center border border-ink-900/20 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-800 transition-colors hover:border-bronze-600 hover:text-bronze-700">
                  Hakkımızda
                </Link>
              </div>
              <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-medium text-ink-500">
                {['Kurumsal Güvence', 'Zamanında Teslim', 'Tavizsiz Kalite'].map((t) => (
                  <span key={t} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rotate-45 bg-bronze-600" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-6">
              <div className="relative">
                <div className="absolute -inset-3 hidden border border-bronze-300/60 lg:block" />
                <div className="relative overflow-hidden">
                  <HeroSlideshow images={heroImages} className="h-[52vh] w-full lg:h-[64vh]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-ink-950/5 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 hidden bg-white p-6 shadow-soft lg:block">
                  <div className="font-serif text-5xl leading-none text-ink-900">30+</div>
                  <div className="mt-2 text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-700">
                    Yıl Saha<br />Tecrübesi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`reveal px-4 py-12 text-center lg:py-14 ${idx > 0 ? 'lg:border-l lg:border-stone-200' : ''} ${idx % 2 === 1 ? 'border-l border-stone-200' : ''} ${idx > 1 ? 'border-t border-stone-200 lg:border-t-0' : ''}`}
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <CountUp value={stat.value} className="block font-serif text-5xl text-ink-900 lg:text-6xl" />
                <div className="mt-3 text-[0.7rem] font-semibold uppercase tracking-widestx text-bronze-700">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faaliyet Alanlarımız */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Faaliyet Alanlarımız</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.7rem]">
              Uzmanlaştığımız alanlar
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {activityLines.map((a, idx) => (
              <Link
                key={idx}
                to={`/projeler?tur=${encodeURIComponent(a.type)}`}
                className="reveal group flex flex-col border border-stone-200 bg-white p-9 transition-all duration-300 hover:-translate-y-1 hover:border-bronze-300 hover:shadow-card"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="grid h-14 w-14 place-items-center bg-stone-100 text-bronze-600 transition-colors group-hover:bg-bronze-600 group-hover:text-white">
                  <a.icon className="h-7 w-7" strokeWidth={1.25} />
                </div>
                <h3 className="mt-7 font-serif text-xl text-ink-900">{a.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">{a.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze-700">
                  Projeleri Gör
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkımızda (özet) */}
      <section id="about" className="py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="reveal relative order-2 lg:order-1">
              <div className="absolute -inset-3 hidden border border-bronze-300/60 lg:block" />
              <img
                src="/lotus-istanbul.jpg"
                alt="Çobantaş projesi"
                className="relative h-[58vh] w-full object-cover"
              />
              <div className="absolute -right-5 -top-5 hidden bg-bronze-600 p-6 text-white shadow-soft lg:block">
                <ShieldCheck className="h-9 w-9" strokeWidth={1.25} />
                <div className="mt-3 text-[0.65rem] font-semibold uppercase tracking-widestx">
                  Kurumsal<br />Standartlar
                </div>
              </div>
            </div>

            <div className="reveal order-1 lg:order-2">
              <Eyebrow>Şirket Profili</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.7rem]">
                Mimari vizyon ile titiz mühendisliğin kesiştiği nokta
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-ink-500">
                Çobantaş olarak biz sadece yapılar inşa etmiyoruz; müşterilerimizin kurumsal başarısını yönlendiren, nesiller boyu ayakta kalacak fiziksel değerler oluşturuyoruz. Her projede şeffaflık, dayanıklılık ve en yüksek kalite standartlarını esas alıyoruz.
              </p>

              <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {values.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-bronze-600" strokeWidth={1.75} />
                    <span className="text-sm font-medium text-ink-800">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/hakkimizda" className="group mt-11 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-bronze-700">
                Hakkımızda Sayfasını İnceleyin
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmetler / Uzmanlık */}
      <section id="services" className="border-y border-stone-200 bg-stone-100 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Bölümler &amp; Uzmanlık</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.7rem]">
                Kapsamlı uzmanlığımız
              </h2>
            </div>
            <p className="max-w-md border-l-2 border-bronze-600 pl-5 text-ink-500">
              Sektördeki derin uzmanlığımızla, farklı ölçeklerde çok disiplinli inşaat programlarını uçtan uca yürütüyoruz.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="reveal group relative border border-stone-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-bronze-300 hover:shadow-card"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <span className="absolute right-6 top-5 font-serif text-4xl text-stone-200 transition-colors group-hover:text-bronze-200">
                  0{idx + 1}
                </span>
                <service.icon className="h-9 w-9 text-bronze-600" strokeWidth={1.25} />
                <h4 className="mt-7 font-serif text-xl text-ink-900">{service.title}</h4>
                <p className="mt-4 text-sm leading-relaxed text-ink-500">{service.desc}</p>
                <div className="mt-7 h-px w-8 bg-bronze-600 transition-all duration-300 group-hover:w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projeler */}
      <section id="projects" className="bg-ink-950 py-20 text-white md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Eyebrow center light>Tamamlanan Çalışmalar</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl text-white md:text-[2.7rem]">Seçkin projelerimiz</h2>
            <p className="mx-auto mt-5 max-w-xl text-stone-400">
              İstanbul ve çevresinde hayata geçirdiğimiz, kaliteyi ve estetiği bir araya getiren yapılarımızdan bir seçki.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((project, idx) => (
              <Link
                key={project.id}
                to={`/projeler/${project.id}`}
                className="reveal group relative block aspect-[4/3] overflow-hidden bg-ink-800"
                style={{ transitionDelay: `${(idx % 3) * 90}ms` }}
              >
                <img
                  src={project.cover_url}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75" />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-7 transition-transform duration-500 group-hover:translate-y-0">
                  <div>
                    <div className="mb-2 text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-300">
                      {project.type}
                    </div>
                    <h4 className="font-serif text-2xl text-white">{project.title}</h4>
                  </div>
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-white/30 text-white opacity-0 transition-all duration-500 group-hover:border-bronze-400 group-hover:text-bronze-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="reveal mt-12 text-center">
            <Link to="/projeler" className="group inline-flex items-center gap-2.5 border border-white/25 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-bronze-400 hover:text-bronze-300">
              Tüm Projeler
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* İş Ortakları */}
      <section id="partners" className="border-b border-stone-200 bg-stone-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="reveal mb-14 text-center">
            <Eyebrow center>İş Ortaklarımız</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl text-ink-900 md:text-4xl">
              Güvenle birlikte yükseldiğimiz kurumlar
            </h2>
          </div>
          <div className="reveal grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center justify-center px-2">
                <img
                  src={p.src}
                  alt={p.name}
                  title={p.name}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                  className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İletişim */}
      <section id="contact" className="py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <Eyebrow>İletişim</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.7rem]">
                Bir sonraki projenizi konuşalım
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-500">
                Uzman mühendislik danışmanlığı veya proje yönetimi hizmetlerine mi ihtiyacınız var? Talebinizi kurumsal ekibimize iletin, en kısa sürede yanıt verelim.
              </p>

              <div className="mt-12 space-y-6">
                {[
                  { icon: MapPin, label: 'Adresimiz', value: 'Atatürk Mah. Komsan Üstü Yolu Cad. Residance Quality No:4 İç Kapı No:211 Küçükçekmece / İstanbul' },
                  { icon: Phone, label: 'Telefon', value: '+90 (532) 524 41 93' },
                  { icon: Mail, label: 'E-Posta', value: 'info@cobantas.com' },
                ].map((c, idx) => (
                  <div key={idx} className="flex items-start gap-5">
                    <span className="grid h-12 w-12 flex-shrink-0 place-items-center border border-stone-200 bg-white text-bronze-600">
                      <c.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h4 className="mb-1 text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-400">{c.label}</h4>
                      <p className="text-ink-700">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
