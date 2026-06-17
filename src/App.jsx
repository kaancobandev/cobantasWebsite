import React, { useState, useEffect } from 'react';
import {
  Building2,
  HardHat,
  Ruler,
  Hammer,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

// lucide-react marka ikonlarını kaldırdığı için kendi ikonlarımızı (SVG) tanımlıyoruz
const FacebookIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const TwitterIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const InstagramIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const LinkedinIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

// Bölüm üstü zarif "etiket" — ince bronz çizgi + büyük harf metin
const Eyebrow = ({ children, center = false, light = false }) => (
  <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
    <span className="eyebrow-line" />
    <span className={`text-[0.7rem] font-semibold uppercase tracking-widestx ${light ? 'text-bronze-300' : 'text-bronze-700'}`}>
      {children}
    </span>
    {center && <span className="eyebrow-line" />}
  </div>
);

// Kaydırdıkça içerik yumuşakça belirir (erişilebilirlik için reduced-motion'da kapalı)
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
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
  }, []);
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useScrollReveal();

  // Navbar için kaydırma efekti
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hakkımızda', href: '#about' },
    { name: 'Uzmanlık', href: '#services' },
    { name: 'Projeler', href: '#projects' },
    { name: 'İletişim', href: '#contact' },
  ];

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

  const projects = [
    { img: './alemara şantiyesi.jpg', title: 'Alemara', category: 'Konut' },
    { img: './flamingo.jpg', title: 'Flamingo Alkent', category: 'Konut' },
    { img: './lotus istanbul son hal.jpg', title: 'Lotus İstanbul', category: 'Konut' },
    { img: './bahce-bahcesehir.jpg', title: 'Bahçe Bahçeşehir', category: 'Konut' },
    { img: './panorama silivri.png', title: 'Panorama Bulvar Silivri', category: 'Konut' },
    { img: './pinnacle.jpg', title: 'Pinnacle', category: 'Konut' },
  ];

  // Logolar public/logos klasöründen gelir
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

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-ink-800">

      {/* Üst bilgi çubuğu */}
      <div className="hidden border-b border-stone-200 bg-stone-100 py-2.5 text-xs lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex gap-7 text-ink-500">
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-bronze-600" strokeWidth={1.75} /> +90 (532) 524 41 93</span>
            <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-bronze-600" strokeWidth={1.75} /> info@cobantas.com.tr</span>
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-bronze-600" strokeWidth={1.75} /> Küçükçekmece, İstanbul</span>
          </div>
          <div className="flex items-center gap-4 text-ink-400">
            <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-bronze-600"><LinkedinIcon className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-bronze-600"><InstagramIcon className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      {/* Navigasyon */}
      <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled ? 'border-stone-200 bg-stone-50/95 py-3 shadow-soft backdrop-blur' : 'border-stone-200/70 bg-stone-50/80 py-5 backdrop-blur'
      }`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3.5">
              {/* Logonuz public klasöründeki çobantaşLogo.jpeg dosyasından gelir */}
              <span className="grid h-11 w-11 place-items-center rounded-sm bg-white p-1 ring-1 ring-stone-200">
                <img src="/çobantaşLogo.jpeg" alt="Çobantaş Logo" className="h-full w-auto object-contain" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-tight text-ink-900">ÇOBANTAŞ</span>
                <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-widestx text-bronze-600">
                  Gayrimenkul İnşaat
                </span>
              </div>
            </a>

            {/* Masaüstü menü */}
            <div className="hidden items-center gap-9 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative text-xs font-semibold uppercase tracking-[0.18em] text-ink-600 transition-colors hover:text-ink-900"
                >
                  {link.name}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-bronze-600 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href="#contact"
                className="border border-ink-900/15 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-800 transition-colors hover:border-bronze-600 hover:bg-bronze-600 hover:text-white"
              >
                Teklif Alın
              </a>
            </div>

            {/* Mobil menü butonu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink-900 transition-colors hover:text-bronze-600 md:hidden"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobil menü */}
        {mobileMenuOpen && (
          <div className="absolute left-0 top-full w-full border-t border-ink-800 bg-ink-950 shadow-2xl md:hidden">
            <div className="space-y-1 px-6 pb-6 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block border-b border-white/10 px-1 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-bronze-300"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 block bg-bronze-600 px-4 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white"
              >
                Teklif Alın
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-stone-50">
        {/* İnce dekoratif dikey çizgiler */}
        <div className="pointer-events-none absolute inset-y-0 right-[35%] hidden w-px bg-stone-200 lg:block" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid min-h-[88vh] items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-0">
            {/* Metin */}
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
                <a href="#about" className="flex items-center justify-center border border-ink-900/20 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-800 transition-colors hover:border-bronze-600 hover:text-bronze-700">
                  Hakkımızda
                </a>
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

            {/* Görsel */}
            <div className="lg:col-span-6 lg:pl-6">
              <div className="relative">
                <div className="absolute -inset-3 hidden border border-bronze-300/60 lg:block" />
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
                    alt="Modern mimari"
                    className="h-[52vh] w-full object-cover lg:h-[64vh]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-ink-950/5 to-transparent" />
                </div>
                {/* Tecrübe rozeti */}
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
                className={`reveal px-4 py-12 text-center lg:py-14 ${idx > 0 ? 'lg:border-l lg:border-stone-200' : ''} ${idx % 2 === 1 ? 'border-l border-stone-200 lg:border-l' : ''} ${idx > 1 ? 'border-t border-stone-200 lg:border-t-0' : ''}`}
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <div className="font-serif text-5xl text-ink-900 lg:text-6xl">{stat.value}</div>
                <div className="mt-3 text-[0.7rem] font-semibold uppercase tracking-widestx text-bronze-700">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkımızda */}
      <section id="about" className="py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Görsel */}
            <div className="reveal relative order-2 lg:order-1">
              <div className="absolute -inset-3 hidden border border-bronze-300/60 lg:block" />
              <img
                src="./lotus istanbul son hal.jpg"
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

            {/* Metin */}
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

              <a href="#contact" className="group mt-11 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-bronze-700">
                Bizimle Çalışın
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmetler / Uzmanlık */}
      <section id="services" className="border-y border-stone-200 bg-stone-100 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Bölümler & Uzmanlık</Eyebrow>
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
            {projects.map((project, idx) => (
              <a
                key={idx}
                href="#contact"
                className="reveal group relative block aspect-[4/3] overflow-hidden bg-ink-800"
                style={{ transitionDelay: `${(idx % 3) * 90}ms` }}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75" />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-7 transition-transform duration-500 group-hover:translate-y-0">
                  <div>
                    <div className="mb-2 text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-300">
                      {project.category}
                    </div>
                    <h4 className="font-serif text-2xl text-white">{project.title}</h4>
                  </div>
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-white/30 text-white opacity-0 transition-all duration-500 group-hover:border-bronze-400 group-hover:text-bronze-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
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
            {/* Bilgi */}
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

            {/* Form */}
            <div className="reveal border border-stone-200 bg-white p-8 shadow-soft md:p-10">
              <h3 className="font-serif text-2xl text-ink-900">Talep gönderin</h3>
              <p className="mt-2 text-sm text-ink-500">Formu doldurun, ekibimiz sizinle iletişime geçsin.</p>
              <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-500">Ad</label>
                    <input type="text" className="w-full border border-stone-300 bg-stone-50 px-4 py-3 text-ink-900 outline-none transition-colors focus:border-bronze-600 focus:bg-white focus:ring-2 focus:ring-bronze-600/15" />
                  </div>
                  <div>
                    <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-500">Soyad</label>
                    <input type="text" className="w-full border border-stone-300 bg-stone-50 px-4 py-3 text-ink-900 outline-none transition-colors focus:border-bronze-600 focus:bg-white focus:ring-2 focus:ring-bronze-600/15" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-500">E-Posta</label>
                  <input type="email" className="w-full border border-stone-300 bg-stone-50 px-4 py-3 text-ink-900 outline-none transition-colors focus:border-bronze-600 focus:bg-white focus:ring-2 focus:ring-bronze-600/15" />
                </div>
                <div>
                  <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-500">Açıklama</label>
                  <textarea rows="4" className="w-full border border-stone-300 bg-stone-50 px-4 py-3 text-ink-900 outline-none transition-colors focus:border-bronze-600 focus:bg-white focus:ring-2 focus:ring-bronze-600/15" />
                </div>
                <button type="submit" className="group flex w-full items-center justify-center gap-3 bg-bronze-600 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700">
                  Talep Gönder
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-bronze-600 bg-ink-950 pb-10 pt-20 text-stone-400">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Marka */}
            <div className="lg:col-span-2 lg:pr-10">
              <div className="mb-6 flex items-center gap-3.5">
                <span className="grid h-11 w-11 place-items-center rounded-sm bg-white p-1">
                  <img src="/çobantaşLogo.jpeg" alt="Çobantaş Logo" className="h-full w-auto object-contain" />
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-bold tracking-tight text-white">ÇOBANTAŞ</span>
                  <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-widestx text-bronze-500">Gayrimenkul İnşaat</span>
                </div>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-stone-400">
                Tavizsiz yapısal bütünlük ve kurumsal yenilikçilikle yarının temellerini bugünden inşa ediyoruz.
              </p>
              <div className="mt-7 flex gap-3">
                {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center border border-white/10 text-stone-400 transition-colors hover:border-bronze-500 hover:text-bronze-400">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Kurumsal */}
            <div>
              <h4 className="mb-6 text-[0.7rem] font-semibold uppercase tracking-widestx text-white">Kurumsal</h4>
              <ul className="space-y-3.5 text-sm">
                {['Hakkımızda', 'Vizyon & Misyon', 'Devam Eden Projeler', 'Biten Projeler'].map((link) => (
                  <li key={link}>
                    <a href="#" className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                      <ChevronRight className="h-3 w-3 text-bronze-600" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Yasal */}
            <div>
              <h4 className="mb-6 text-[0.7rem] font-semibold uppercase tracking-widestx text-white">Yasal</h4>
              <ul className="space-y-3.5 text-sm">
                {['Gizlilik Politikası', 'Kişisel Verilerin Korunması', 'Kullanım Koşulları'].map((link) => (
                  <li key={link}>
                    <a href="#" className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                      <ChevronRight className="h-3 w-3 text-bronze-600" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs tracking-wide md:flex-row md:text-left">
            <p>&copy; {new Date().getFullYear()} Çobantaş Gayrimenkul İnşaat. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-white">Gizlilik Politikası</a>
              <a href="#" className="transition-colors hover:text-white">Kullanım Koşulları</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
