import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, ChevronRight } from 'lucide-react';
import { socialIcons } from './ui';
import LangToggle from './LangToggle';
import { socials, contactInfo } from '../data/site';
import { useLang } from '../context/LanguageContext';

// "to" olanlar ayrı sayfaya (router), "href" olanlar ana sayfadaki bölüme (/#id) gider
const navItems = [
  { key: 'nav.about', to: '/hakkimizda' },
  { key: 'nav.expertise', href: '/#services' },
  { key: 'nav.projects', to: '/projeler' },
  { key: 'nav.contact', to: '/iletisim' },
];

export default function Layout() {
  const { t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sayfa değişince (hash yoksa) en üste dön
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  const closeMenu = () => setMobileMenuOpen(false);
  const InstagramIcon = socialIcons.instagram;
  const WhatsappIcon = socialIcons.whatsapp;
  const whatsapp = socials.find((s) => s.icon === 'whatsapp');

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-ink-800">

      {/* Erişilebilirlik: içeriğe atla bağlantısı */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-bronze-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t('common.skip')}
      </a>

      {/* Üst bilgi çubuğu */}
      <div className="hidden border-b border-stone-200 bg-stone-100 py-2.5 text-xs lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex gap-7 text-ink-500">
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-bronze-600" strokeWidth={1.75} /> {contactInfo.phoneDisplay}</span>
            <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-bronze-600" strokeWidth={1.75} /> {contactInfo.email}</span>
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-bronze-600" strokeWidth={1.75} /> {t('common.location')}</span>
          </div>
          <div className="flex items-center gap-5 text-ink-400">
            <a href="https://instagram.com/cobantas_fksy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-bronze-600"><InstagramIcon className="h-4 w-4" /></a>
            <LangToggle />
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
            <Link to="/" className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 place-items-center rounded-sm bg-white p-1 ring-1 ring-stone-200">
                <img src="/cobantas-logo.jpeg" alt="Çobantaş Logo" className="h-full w-auto object-contain" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-tight text-ink-900">ÇOBANTAŞ</span>
                <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-widestx text-bronze-600">
                  {t('brand.subtitle')}
                </span>
              </div>
            </Link>

            {/* Masaüstü menü */}
            <div className="hidden items-center gap-9 md:flex">
              {navItems.map((item) =>
                item.to ? (
                  <NavLink
                    key={item.key}
                    to={item.to}
                    className={({ isActive }) =>
                      `group relative text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-ink-900 ${
                        isActive ? 'text-bronze-700' : 'text-ink-600'
                      }`
                    }
                  >
                    {t(item.key)}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-bronze-600 transition-all duration-300 group-hover:w-full" />
                  </NavLink>
                ) : (
                  <a
                    key={item.key}
                    href={item.href}
                    className="group relative text-xs font-semibold uppercase tracking-[0.18em] text-ink-600 transition-colors hover:text-ink-900"
                  >
                    {t(item.key)}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-bronze-600 transition-all duration-300 group-hover:w-full" />
                  </a>
                )
              )}
              <Link
                to="/iletisim"
                className="border border-ink-900/15 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-800 transition-colors hover:border-bronze-600 hover:bg-bronze-600 hover:text-white"
              >
                {t('nav.quote')}
              </Link>
              <span className="hidden lg:block"><LangToggle /></span>
            </div>

            {/* Mobil menü butonu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink-900 transition-colors hover:text-bronze-600 md:hidden"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobil-menu"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobil menü */}
        {mobileMenuOpen && (
          <div id="mobil-menu" className="absolute left-0 top-full w-full border-t border-ink-800 bg-ink-950 shadow-2xl md:hidden">
            <div className="space-y-1 px-6 pb-6 pt-2">
              {navItems.map((item) =>
                item.to ? (
                  <Link
                    key={item.key}
                    to={item.to}
                    onClick={closeMenu}
                    className="block border-b border-white/10 px-1 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-bronze-300"
                  >
                    {t(item.key)}
                  </Link>
                ) : (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={closeMenu}
                    className="block border-b border-white/10 px-1 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-bronze-300"
                  >
                    {t(item.key)}
                  </a>
                )
              )}
              <Link
                to="/iletisim"
                onClick={closeMenu}
                className="mt-4 block bg-bronze-600 px-4 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white"
              >
                {t('nav.quote')}
              </Link>
              <div className="pt-4"><LangToggle variant="dark" /></div>
            </div>
          </div>
        )}
      </nav>

      {/* Sayfa içeriği */}
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-bronze-600 bg-ink-950 pb-10 pt-20 text-stone-400">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2 lg:pr-10">
              <div className="mb-6 flex items-center gap-3.5">
                <span className="grid h-11 w-11 place-items-center rounded-sm bg-white p-1">
                  <img src="/cobantas-logo.jpeg" alt="Çobantaş Logo" className="h-full w-auto object-contain" />
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-bold tracking-tight text-white">ÇOBANTAŞ</span>
                  <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-widestx text-bronze-500">{t('brand.subtitle')}</span>
                </div>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-stone-400">
                {t('footer.tagline')}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {socials.map((s) => {
                  const Icon = socialIcons[s.icon];
                  const external = s.href !== '#';
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.name}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className={`grid h-10 w-10 place-items-center border border-white/10 text-stone-400 transition-colors hover:border-bronze-500 hover:text-bronze-400 ${external ? '' : 'opacity-50'}`}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="mb-6 text-[0.7rem] font-semibold uppercase tracking-widestx text-white">{t('footer.corporate')}</h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <Link to="/hakkimizda" className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                    <ChevronRight className="h-3 w-3 text-bronze-600" />
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link to="/projeler" className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                    <ChevronRight className="h-3 w-3 text-bronze-600" />
                    {t('nav.projects')}
                  </Link>
                </li>
                <li>
                  <Link to="/hakkimizda" className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                    <ChevronRight className="h-3 w-3 text-bronze-600" />
                    {t('footer.vizyonMisyon')}
                  </Link>
                </li>
                <li>
                  <Link to="/iletisim" className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                    <ChevronRight className="h-3 w-3 text-bronze-600" />
                    {t('nav.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-[0.7rem] font-semibold uppercase tracking-widestx text-white">{t('footer.contact')}</h4>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-bronze-600" />
                  <span>{t('common.location')}</span>
                </li>
                <li>
                  <a href={contactInfo.phoneHref} className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                    <Phone className="h-3.5 w-3.5 flex-shrink-0 text-bronze-600" />
                    {contactInfo.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={contactInfo.emailHref} className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                    <Mail className="h-3.5 w-3.5 flex-shrink-0 text-bronze-600" />
                    {contactInfo.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs tracking-wide md:flex-row md:text-left">
            <p>&copy; {new Date().getFullYear()} Çobantaş {t('brand.subtitle')}. {t('footer.rights')}</p>
            <a href={contactInfo.emailHref} className="transition-colors hover:text-white">{contactInfo.email}</a>
          </div>
        </div>
      </footer>

      {/* Sabit WhatsApp butonu */}
      {whatsapp && (
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        >
          <WhatsappIcon className="h-7 w-7" />
        </a>
      )}

    </div>
  );
}
