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
  ArrowRight
} from 'lucide-react';

// lucide-react marka ikonlarını kaldırdığı için kendi ikonlarımızı (SVG) tanımlıyoruz
const FacebookIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const TwitterIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const InstagramIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const LinkedinIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hakkımızda', href: '#about' },
    { name: 'Galeri', href: '#services' },
    { name: 'Projeler', href: '#projects' },
    { name: 'İletişim', href: '#contact' },
  ];

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen selection:bg-blue-900 selection:text-white">
      
      {/* Top Bar - Professional addition */}
      <div className="bg-blue-950 text-gray-300 py-2 text-xs hidden lg:block border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex gap-6 font-medium tracking-wide">
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-blue-400"/> +90 (532) 524 41 93</span>
            <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-blue-400"/> info@cobantas.com.tr</span>
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-blue-400"/> Küçükçekmece, Istanbul</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors"><LinkedinIcon className="h-4 w-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><TwitterIcon className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav 
        className={`sticky top-0 w-full z-50 transition-all duration-300 bg-white border-b border-gray-200 ${
          isScrolled ? 'py-3 shadow-md' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              {/* Kendi logonuz public klasöründeki logo.png dosyasından buraya gelecektir */}
              <img src="/çobantaşLogo.jpeg" alt="Cobantaş Logo" className="h-10 w-auto object-contain" />
              
              {/* NOT: Eğer logonuzun içinde ÇOBANTAŞ yazısı zaten varsa, aşağıdaki <div className="flex flex-col">...</div> bloğunu silebilirsiniz */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter text-blue-950 leading-none">
                  ÇOBANTAŞ
                </span>
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-gray-500 uppercase mt-1">
                  Gayrimenkul İnşaat
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-blue-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-blue-950 p-2 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-blue-950 shadow-2xl border-t border-blue-900">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-4 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white border-b border-blue-900/50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gray-50 flex items-center min-h-[85vh] lg:min-h-[90vh] border-b border-gray-200 overflow-hidden">
        {/* Right-aligned Background Image */}
        <div className="absolute inset-0 w-full lg:w-[60%] lg:right-0 lg:left-auto h-[50vh] lg:h-full">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Corporate Architecture" 
            className="w-full h-full object-cover grayscale-[40%]"
          />
          <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply"></div>
          {/* Gradient fade for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent lg:hidden"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-48 lg:pt-0">
          <div className="bg-white/95 backdrop-blur-sm lg:bg-white p-8 md:p-12 lg:p-16 max-w-2xl border-t-4 border-blue-900 shadow-2xl lg:shadow-none lg:border-t-0 lg:border-l-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-blue-900"></div>
              <span className="text-blue-900 text-sm font-bold tracking-widest uppercase">Güvenle Yükselen</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 leading-[1.1] mb-8 tracking-tight">
              Vizyonu Gerçeğe,<br />
              Gerçeği Mükemmelliğe Dönüştürüyoruz.<br />
              <span className="text-gray-400">Sarsılmaz dayanıklılık ve yenilikçi mühendislik.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
              Yılların getirdiği köklü saha tecrübesi ve sarsılmaz iş ahlakımızla, projelerinizi temelden çatıya eksiksiz yönetiyoruz. Her aşamasında şeffaflık, her detayında en yüksek kalite standartlarını barındıran yapılarımızla yatırımlarınızı güvence altına alıyor, söz verdiğimiz zamanda teslim ediyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-4 font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-3 group">
                Projelerimize Göz Atın
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="bg-gray-100 hover:bg-gray-200 text-blue-950 px-8 py-4 font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center">
                Hakkımızda
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-950 py-12 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-blue-800">
            {[
              { label: 'Hizmet Süremiz', value: '30+' },
              { label: 'Çalışan Sayımız', value: '150+' },
              { label: 'Bitirilen Proje', value: '30+' },
              { label: 'İş Ortaklarımız', value: '20+' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-light text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-blue-400 font-bold uppercase tracking-widest text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-blue-900"></div>
                <h3 className="text-blue-900 font-bold uppercase tracking-widest text-sm">Şirket Profili</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-6 leading-tight tracking-tight">
                Şirketimizin Yapısal Standartları
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Çobantaş, mimari vizyon ve titiz mühendisliğin kesiştiği noktada faaliyet göstermektedir. Biz sadece yapılar inşa etmiyoruz; müşterilerimizin kurumsal başarısını yönlendiren fiziksel varlıkları oluşturuyoruz.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[
                  'Tavizsiz İş Güvenliği',
                  'Gelişmiş Yapısal Mühendislik',
                  'Zaman Çizelgesine Sıkı Uyum',
                  'Sürdülebilir ve Çevre Dostu Uygulamalar'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-800 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-blue-900"></div>
                <h3 className="text-blue-900 font-bold uppercase tracking-widest text-sm">Bölümler & Uzmanlık</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">Kapsamlı Uzmanlığımız</h2>
            </div>
            <p className="text-gray-600 max-w-md font-medium border-l-2 border-blue-900 pl-4">
              Sektördeki derin uzmanlığımızdan yararlanarak, çeşitli endüstriyel sektörlerde çok disiplinli inşaat programları yürütüyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: 'Modern ve Fonksiyonel Mimari Vizyon', desc: 'Sadece binalar inşa etmiyor; modern zarafetin fonksiyonellikle buluştuğu, bulunduğu çevreye değer katan prestijli yaşam alanları yaratıyoruz.' },
              { icon: Ruler, title: 'Kusursuz Mühendislik ve İnce İşçilik', desc: 'Statik güvenlikten en ince dekorasyon detaylarına kadar, alanında uzman ekiplerle çalışarak vizyonu hatasız bir gerçeğe dönüştürüyoruz. Detaylara verdiğimiz önem, kalitemizin imzasıdır.' },
              { icon: HardHat, title: 'Sıfır Hata Odaklı Proje Yönetimi', desc: 'Süreçleri mutlak şeffaflıkla yönetiyor, planlama aşamasından proje teslimine kadar her adımı titizlikle denetleyerek kalite standardımızdan asla ödün vermiyoruz.' },
              { icon: Hammer, title: 'Tavizsiz İşçilik', desc: 'Projelerimizin her metrekaresinde, estetiği ve sarsılmaz dayanıklılığı garanti eden birinci sınıf, endüstri standartlarının üzerindeki malzemeleri tercih ediyoruz.' }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 border border-gray-200 hover:border-blue-900 transition-colors group">
                <service.icon className="h-10 w-10 text-blue-900 mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <h4 className="text-lg font-bold mb-4 text-blue-950">{service.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">{service.desc}</p>
                <div className="w-8 h-px bg-blue-900 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-500"></div>
              <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm">Projeler Kısmı</h3>
              <div className="h-px w-8 bg-blue-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Galerimiz</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-1">
            {[
              { img: './alemara şantiyesi.jpg', title: 'Alemara', category: 'Konut' },
              { img: './flamingo.jpg', title: 'Flamingo Alkent', category: 'Konut' },
              { img: './lotus istanbul son hal.jpg', title: 'Lotus İstanbul', category: 'Konut' },
              { img: './bahce-bahcesehir.jpg', title: 'Bahçe Bahçeşehir', category: 'Konut' },
              { img: './panorama silivri.png', title: 'Panorama Bulvar Silivri', category: 'Konut' },
              { img: './pinnacle.jpg', title: 'Pinnacle', category: 'Konut' }
            ].map((project, idx) => (
              <div key={idx} className="group relative aspect-square overflow-hidden bg-blue-900 cursor-pointer">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-[0.65rem]">{project.category}</div>
                  <h4 className="text-xl font-bold text-white tracking-wide">{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-blue-900"></div>
                <h3 className="text-blue-900 font-bold uppercase tracking-widest text-sm">İletişim</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-8 tracking-tight">Bizimle İletişime Geçin</h2>
              <p className="text-gray-600 text-lg mb-12">
                Uzmanlaşmış mühendislik danışmanlığı veya proje yönetimi hizmetlerine mi ihtiyacınız var? Anında yanıt almak için lütfen talebinizi kurumsal ekibimize iletin.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-900 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-blue-950 mb-1">Adresimiz</h4>
                    <p className="text-gray-600">Atatürk Mah. Komsan Üstü Yolu Cad.<br/>Residance Quality No:4 İç Kapı No:211 Küçükçekmece / İSTANBUL</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-blue-900 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-blue-950 mb-1">Telefon No</h4>
                    <p className="text-gray-600">+90 (532) 524 41 93</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-blue-900 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-blue-950 mb-1">E-Mail</h4>
                    <p className="text-gray-600">info@cobantas.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 border border-gray-200">
              <h3 className="text-xl font-extrabold text-blue-950 mb-6 tracking-tight">Bir talep gönderin</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Ad</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-900 transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Soyad</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-900 transition-colors bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Kurumsal Email</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-900 transition-colors bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">Açıklama</label>
                  <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-900 transition-colors bg-white"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm uppercase tracking-widest py-4 transition-colors">
                    Talep Gönder
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 pt-20 pb-10 border-t-2 border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6 opacity-90">
                {/* Alt bilgi için açık renkli logo versiyonu logo-beyaz.png */}
                <img src="/çobantaşLogo.jpeg" alt="Çobantaş Logo" className="h-8 w-auto object-contain" />
                <span className="text-2xl font-bold tracking-tighter text-white">
                  ÇOBANTAŞ
                </span>
              </div>
              <p className="text-sm mb-6 leading-relaxed">
                Tavizsiz yapısal bütünlük ve kurumsal yenilikçilikle yarının temellerini inşa ediyoruz.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><FacebookIcon className="h-5 w-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><TwitterIcon className="h-5 w-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><InstagramIcon className="h-5 w-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><LinkedinIcon className="h-5 w-5" /></a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Şirket Profili</h4>
              <ul className="space-y-3 text-sm">
                {['Hakkımızda', 'Vizyon & Misyon','Devam Eden Projeler', 'Biten Projeler'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-blue-600" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divisions */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Hizmetlerimiz</h4>
              <ul className="space-y-3 text-sm">
                {['Gizlilik Politikası','Kişisel Verilerin Korunması', 'Kullanım Koşulları'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-blue-600" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs tracking-wide">
            <p>&copy; {new Date().getFullYear()} Çobantaş Construction Group. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}