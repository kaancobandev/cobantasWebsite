import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, ChevronRight } from 'lucide-react';
import { socialIcons } from './ui';
import { socials, contactInfo } from '../data/site';

// "to" olanlar ayrı sayfaya (router), "href" olanlar ana sayfadaki bölüme (/#id) gider
const navItems = [
  { name: 'Hakkımızda', to: '/hakkimizda' },
  { name: 'Uzmanlık', href: '/#services' },
  { name: 'Projeler', to: '/projeler' },
  { name: 'İletişim', to: '/iletisim' },
];

export default function Layout() {
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

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-ink-800">

      {/* Üst bilgi çubuğu */}
      <div className="hidden border-b border-stone-200 bg-stone-100 py-2.5 text-xs lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex gap-7 text-ink-500">
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-bronze-600" strokeWidth={1.75} /> {contactInfo.phoneDisplay}</span>
            <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-bronze-600" strokeWidth={1.75} /> {contactInfo.email}</span>
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-bronze-600" strokeWidth={1.75} /> Küçükçekmece, İstanbul</span>
          </div>
          <div className="flex items-center gap-4 text-ink-400">
            <a href="https://instagram.com/cobantas_fksy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-bronze-600"><InstagramIcon className="h-4 w-4" /></a>
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
                  Gayrimenkul İnşaat
                </span>
              </div>
            </Link>

            {/* Masaüstü menü */}
            <div className="hidden items-center gap-9 md:flex">
              {navItems.map((item) =>
                item.to ? (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `group relative text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-ink-900 ${
                        isActive ? 'text-bronze-700' : 'text-ink-600'
                      }`
                    }
                  >
                    {item.name}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-bronze-600 transition-all duration-300 group-hover:w-full" />
                  </NavLink>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group relative text-xs font-semibold uppercase tracking-[0.18em] text-ink-600 transition-colors hover:text-ink-900"
                  >
                    {item.name}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-bronze-600 transition-all duration-300 group-hover:w-full" />
                  </a>
                )
              )}
              <Link
                to="/iletisim"
                className="border border-ink-900/15 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-800 transition-colors hover:border-bronze-600 hover:bg-bronze-600 hover:text-white"
              >
                Teklif Alın
              </Link>
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
              {navItems.map((item) =>
                item.to ? (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={closeMenu}
                    className="block border-b border-white/10 px-1 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-bronze-300"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="block border-b border-white/10 px-1 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-bronze-300"
                  >
                    {item.name}
                  </a>
                )
              )}
              <Link
                to="/iletisim"
                onClick={closeMenu}
                className="mt-4 block bg-bronze-600 px-4 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white"
              >
                Teklif Alın
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Sayfa içeriği */}
      <main>
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
                  <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-widestx text-bronze-500">Gayrimenkul İnşaat</span>
                </div>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-stone-400">
                Tavizsiz yapısal bütünlük ve kurumsal yenilikçilikle yarının temellerini bugünden inşa ediyoruz.
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
              <h4 className="mb-6 text-[0.7rem] font-semibold uppercase tracking-widestx text-white">Kurumsal</h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <Link to="/hakkimizda" className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                    <ChevronRight className="h-3 w-3 text-bronze-600" />
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link to="/projeler" className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                    <ChevronRight className="h-3 w-3 text-bronze-600" />
                    Projeler
                  </Link>
                </li>
                {['Vizyon & Misyon', 'Biten Projeler'].map((link) => (
                  <li key={link}>
                    <a href="#" className="flex items-center gap-2 transition-colors hover:text-bronze-400">
                      <ChevronRight className="h-3 w-3 text-bronze-600" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

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
