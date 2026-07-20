// TR/EN çeviri sözlüğü. Public site metinleri buradan gelir.
// (Admin paneli ve Supabase'deki proje verileri çevrilmez.)

const tr = {
  brand: { subtitle: 'Gayrimenkul İnşaat' },
  nav: { about: 'Hakkımızda', expertise: 'Uzmanlık', projects: 'Projeler', contact: 'İletişim', quote: 'Teklif Alın' },
  common: { home: 'Anasayfa', skip: 'İçeriğe geç', loading: 'Yükleniyor…', location: 'Küçükçekmece, İstanbul' },

  home: {
    hero: {
      eyebrow: 'Güvenle Yükselen',
      titlePre: 'Vizyonu gerçeğe, gerçeği',
      titleAccent: 'mükemmelliğe',
      titlePost: ' dönüştürüyoruz.',
      lead: 'Sarsılmaz dayanıklılık ve yenilikçi mühendislik. Köklü saha tecrübemiz ve tavizsiz iş ahlakımızla projelerinizi temelden çatıya eksiksiz yönetiyor, söz verdiğimiz zamanda teslim ediyoruz.',
      btnProjects: 'Projelerimize Göz Atın',
      btnAbout: 'Hakkımızda',
      trust: ['Kurumsal Güvence', 'Zamanında Teslim', 'Tavizsiz Kalite'],
      badgeLabel: 'Yıl Saha\nTecrübesi',
    },
    stats: [
      { value: '21+', label: 'Yıllık Tecrübe' },
      { value: '400+', label: 'Uzman Kadro' },
      { value: '60+', label: 'Tamamlanan Proje' },
      { value: '120+', label: 'İş Ortağı' },
    ],
    activity: {
      eyebrow: 'Faaliyet Alanlarımız',
      heading: 'Uzmanlaştığımız alanlar',
      cta: 'Projeleri Gör',
      items: [
        { title: 'Müteahhitlik', desc: 'Projenin tüm sorumluluğunu üstleniyor; arsadan anahtar teslimine kadar süreci tek elden yürütüyoruz.' },
        { title: 'Taahhüt', desc: 'Planlamadan teslime kadar uçtan uca yönetilen anahtar teslim taahhüt hizmetleri.' },
        { title: 'Kentsel Dönüşüm', desc: 'Riskli yapıların yerine, güncel deprem yönetmeliğine uygun, güvenli ve modern yaşam alanları inşa ediyoruz.' },
        { title: 'Sanayi Yapıları', desc: 'Üretim tesisleri, depo ve endüstriyel yapıların projelendirilmesi ve anahtar teslim inşası.' },
      ],
    },
    about: {
      eyebrow: 'Şirket Profili',
      heading: 'Mimari vizyon ile titiz mühendisliğin kesiştiği nokta',
      paragraph: 'Çobantaş olarak biz sadece yapılar inşa etmiyoruz; müşterilerimizin kurumsal başarısını yönlendiren, nesiller boyu ayakta kalacak fiziksel değerler oluşturuyoruz. Her projede şeffaflık, dayanıklılık ve en yüksek kalite standartlarını esas alıyoruz.',
      values: ['Tavizsiz İş Güvenliği', 'Gelişmiş Yapısal Mühendislik', 'Zaman Çizelgesine Sıkı Uyum', 'Sürdürülebilir ve Çevre Dostu Uygulamalar'],
      cta: 'Hakkımızda Sayfasını İnceleyin',
    },
    services: {
      eyebrow: 'Bölümler & Uzmanlık',
      heading: 'Kapsamlı uzmanlığımız',
      intro: 'Sektördeki derin uzmanlığımızla, farklı ölçeklerde çok disiplinli inşaat programlarını uçtan uca yürütüyoruz.',
      items: [
        { title: 'Mimari Vizyon', desc: 'Sadece binalar inşa etmiyor; modern zarafetin fonksiyonellikle buluştuğu, bulunduğu çevreye değer katan prestijli yaşam alanları yaratıyoruz.' },
        { title: 'Kusursuz Mühendislik', desc: 'Statik güvenlikten en ince dekorasyon detayına kadar, alanında uzman ekiplerle çalışarak vizyonu hatasız bir gerçeğe dönüştürüyoruz.' },
        { title: 'Proje Yönetimi', desc: 'Süreçleri mutlak şeffaflıkla yönetiyor, planlamadan teslime kadar her adımı titizlikle denetleyerek kalite standardımızdan ödün vermiyoruz.' },
        { title: 'Tavizsiz İşçilik', desc: 'Her metrekarede, estetiği ve sarsılmaz dayanıklılığı garanti eden birinci sınıf, endüstri standartlarının üzerindeki malzemeleri tercih ediyoruz.' },
      ],
    },
    projects: {
      eyebrow: 'Tamamlanan Çalışmalar',
      heading: 'Seçkin projelerimiz',
      intro: 'İstanbul ve çevresinde hayata geçirdiğimiz, kaliteyi ve estetiği bir araya getiren yapılarımızdan bir seçki.',
      all: 'Tüm Projeler',
    },
    spotlight: {
      eyebrow: 'Öne Çıkan Proje',
      fallbackDesc: 'Kaliteyi ve estetiği bir araya getiren imza projelerimizden biri.',
      cta: 'Projeyi İncele',
    },
    partners: { eyebrow: 'İş Ortaklarımız', heading: 'Güvenle birlikte yükseldiğimiz kurumlar' },
    contact: {
      eyebrow: 'İletişim',
      heading: 'Bir sonraki projenizi konuşalım',
      paragraph: 'Uzman mühendislik danışmanlığı veya proje yönetimi hizmetlerine mi ihtiyacınız var? Talebinizi kurumsal ekibimize iletin, en kısa sürede yanıt verelim.',
      addressLabel: 'Adresimiz',
      phoneLabel: 'Telefon',
      emailLabel: 'E-Posta',
    },
  },

  about: {
    breadcrumb: 'Hakkımızda',
    eyebrow: 'Kurumsal',
    title: 'Köklü tecrübeyi çağdaş mühendislikle buluşturuyoruz',
    lead: 'Çobantaş Gayrimenkul İnşaat; mimari vizyon, mühendislik disiplini ve kurumsal dürüstlüğü bir araya getirerek nesiller boyu değerini koruyacak yapılar üretmektedir.',
    profileEyebrow: 'Şirket Profili',
    profileHeading: 'Biz kimiz?',
    profileP1: 'Çobantaş Gayrimenkul İnşaat, 2005 yılında Mustafa Çoban tarafından İstanbul’da kurulmuştur. Yirmi yılı aşkın saha tecrübesiyle fabrika ve endüstriyel yapılardan konut projelerine, anahtar teslim taahhüt işlerine kadar geniş bir yelpazede çalışmalar yürütmektedir.',
    profileP2: 'Faaliyetlerimizi yalnızca bina inşa etmek olarak görmüyor; müşterilerimizin yatırımlarına değer katan, çevresine ve şehre olumlu katkı sunan kalıcı eserler ortaya koymayı amaçlıyoruz. Uzman mühendis ve teknik kadromuzla her projeyi temelden çatıya kadar titizlikle yönetiyoruz.',
    profileP3: 'Güçlü iş ortaklıklarımız ve sektördeki köklü itibarımız; kaliteden, güvenlikten ve teslim takviminden ödün vermeden çalışma ilkemizin doğal bir sonucudur.',
    founded: 'Kuruluş', center: 'Merkez', founder: 'Kurucu',
    activityEyebrow: 'Faaliyet Alanlarımız',
    activityHeading: 'Uzmanlaştığımız alanlar',
    activityIntro: 'Farklı ölçek ve niteliklerdeki projeleri, aynı kurumsal disiplin ve kalite anlayışıyla hayata geçiriyoruz.',
    activityItems: [
      { title: 'Müteahhitlik', desc: 'Arsa değerlendirmesinden ruhsat süreçlerine, inşaattan anahtar teslimine kadar projenin tamamını üstleniyor; tek muhatap olarak tüm sorumluluğu taşıyoruz.' },
      { title: 'Taahhüt', desc: 'Anahtar teslim taahhüt hizmetleri; planlamadan teslime kadar tüm süreci tek elden, şeffaf ve takvime sadık biçimde yönetiyoruz.' },
      { title: 'Kentsel Dönüşüm', desc: 'Riskli yapıların dönüşümünde hak sahipleriyle şeffaf bir süreç yürütüyor; güncel deprem yönetmeliğine uygun, güvenli ve değerini koruyan yapılar inşa ediyoruz.' },
      { title: 'Sanayi Yapıları', desc: 'Üretim tesisleri, depo ve endüstriyel yapıların projelendirilmesi ve inşası; fonksiyonelliği, geniş açıklıkları ve dayanıklılığı bir arada sunuyoruz.' },
    ],
    missionTitle: 'Misyonumuz',
    mission: 'Çağdaş mühendislik ve mimari anlayışı, tavizsiz kalite ve güvenlik standartlarıyla buluşturarak; müşterilerimizin beklentilerini aşan, dayanıklı ve sürdürülebilir yapılar inşa etmek. Her projede şeffaflığı, dürüstlüğü ve zamanında teslimi esas almak.',
    visionTitle: 'Vizyonumuz',
    vision: 'İnşaat ve gayrimenkul sektöründe; kalitesi, kurumsal güvenilirliği ve yenilikçi yaklaşımıyla referans gösterilen, ulusal ölçekte saygın bir marka olmak. Hayata geçirdiğimiz her projeyle yaşam kalitesini yükseltmek ve şehrin geleceğine kalıcı değer katmak.',
    valuesEyebrow: 'Değerlerimiz',
    valuesHeading: 'Bizi biz yapan ilkeler',
    valuesIntro: 'Kurumsal kültürümüzün temelini oluşturan ve her kararımıza yön veren değerlerimiz, çalışmalarımızın niteliğini belirler.',
    values: [
      { title: 'Güvenilirlik', desc: 'Verdiğimiz her taahhüdü, sözleşmedeki koşullara ve etik ilkelere tam bağlılıkla yerine getiririz.' },
      { title: 'Kalite', desc: 'Malzeme seçiminden işçiliğe kadar her aşamada, sektör standartlarının üzerinde bir kalite anlayışını esas alırız.' },
      { title: 'Şeffaflık', desc: 'Planlamadan teslimata kadar tüm süreçleri, paydaşlarımızla açık ve hesap verebilir biçimde yürütürüz.' },
      { title: 'Müşteri Memnuniyeti', desc: 'Projelerimizi, müşterilerimizin beklentilerini aşmayı hedefleyen bir hizmet anlayışıyla şekillendiririz.' },
      { title: 'Sürdürülebilirlik', desc: 'Çevreye duyarlı, enerji verimli ve gelecek nesillere değer katan yapılar inşa etmeyi önemseriz.' },
      { title: 'Yenilikçilik', desc: 'Çağdaş mühendislik çözümlerini ve modern mimari yaklaşımları projelerimize titizlikle entegre ederiz.' },
    ],
    statsLabels: ['Yıllık Tecrübe', 'Uzman Kadro', 'Tamamlanan Proje', 'İş Ortağı'],
    commitEyebrow: 'Kalite Taahhüdümüz',
    commitHeading: 'Neden Çobantaş?',
    commitIntro: 'Bir projeyi üstlendiğimizde, yalnızca bir yapı değil; uzun yıllar sürecek bir güven ilişkisi inşa ederiz. Çalışma anlayışımızı belirleyen başlıca taahhütlerimiz şunlardır:',
    commitCta: 'Bizimle İletişime Geçin',
    commitItems: [
      'Tavizsiz iş sağlığı ve güvenliği uygulamaları',
      'Gelişmiş yapısal mühendislik ve statik güvence',
      'Zaman çizelgesine sıkı uyum ve zamanında teslim',
      'Birinci sınıf malzeme ve nitelikli işçilik',
      'Sürdürülebilir ve çevre dostu inşaat yöntemleri',
      'Proje boyunca açık iletişim ve şeffaf raporlama',
    ],
  },

  projectsPage: {
    breadcrumb: 'Projeler', eyebrow: 'Portföy', title: 'Projelerimiz',
    intro: 'İstanbul ve çevresinde hayata geçirdiğimiz, kaliteyi ve estetiği bir araya getiren çalışmalarımızdan bir seçki.',
    all: 'Tümü', empty: 'Bu kategoride henüz proje bulunmuyor.',
    ctaHeading: 'Aklınızdaki projeyi birlikte hayata geçirelim', ctaBtn: 'İletişime Geçin',
  },

  detail: {
    gallery: 'Galeri', all: 'Tüm Projeler', contactBtn: 'İletişime Geçin', notFound: 'Proje bulunamadı',
    prev: 'Önceki', next: 'Sonraki', image: 'Görsel',
    specs: 'Proje Bilgileri', type: 'Tür', area: 'Alan', status: 'Durum', contractor: 'Yüklenici', reference: 'Referans',
  },

  // Veritabanındaki durum değerlerinin görünen karşılığı
  statusMap: { 'Bitirilen Proje': 'Bitirilen Proje', 'Devam Eden': 'Devam Eden' },

  notFound: {
    title: 'Sayfa bulunamadı',
    lead: 'Aradığınız sayfa taşınmış, adı değişmiş veya hiç var olmamış olabilir.',
    home: 'Anasayfaya Dön',
    projects: 'Projeleri İncele',
  },

  contactPage: {
    breadcrumb: 'İletişim', eyebrow: 'İletişim', title: 'Bizimle iletişime geçin',
    lead: 'Proje danışmanlığı, teklif veya her türlü sorunuz için bize ulaşın. Aşağıdaki bilgilerden, sosyal medya hesaplarımızdan veya formu doldurarak en kısa sürede yanıt alın.',
    addressLabel: 'Adresimiz', phoneLabel: 'Telefon', emailLabel: 'E-Posta',
    social: 'Sosyal Medya', locationEyebrow: 'Konum', visit: 'Bizi ziyaret edin', openMaps: "Google Haritalar'da Aç",
  },

  form: {
    title: 'Talep gönderin', subtitle: 'Formu doldurun, ekibimiz sizinle iletişime geçsin.',
    ad: 'Ad', soyad: 'Soyad', email: 'E-Posta', telefon: 'Telefon', aciklama: 'Açıklama',
    submit: 'Talep Gönder', submitting: 'Gönderiliyor…',
    successTitle: 'Talebiniz alındı', successBody: 'En kısa sürede sizinle iletişime geçeceğiz. Bize ulaştığınız için teşekkür ederiz.',
    error: 'Gönderilirken bir sorun oluştu. Lütfen tekrar deneyin veya doğrudan info@cobantas.com adresine yazın.',
  },

  footer: {
    tagline: 'Tavizsiz yapısal bütünlük ve kurumsal yenilikçilikle yarının temellerini bugünden inşa ediyoruz.',
    corporate: 'Kurumsal', contact: 'İletişim', vizyonMisyon: 'Vizyon & Misyon',
    rights: 'Tüm hakları saklıdır.',
  },
};

const en = {
  brand: { subtitle: 'Real Estate & Construction' },
  nav: { about: 'About', expertise: 'Expertise', projects: 'Projects', contact: 'Contact', quote: 'Get a Quote' },
  common: { home: 'Home', skip: 'Skip to content', loading: 'Loading…', location: 'Küçükçekmece, Istanbul' },

  home: {
    hero: {
      eyebrow: 'Rising with Confidence',
      titlePre: 'We turn vision into reality, and reality into',
      titleAccent: 'perfection',
      titlePost: '.',
      lead: 'Unwavering durability and innovative engineering. With our deep-rooted field experience and uncompromising work ethic, we manage your projects end to end — from foundation to roof — and deliver on time, every time.',
      btnProjects: 'Explore Our Projects',
      btnAbout: 'About Us',
      trust: ['Corporate Assurance', 'On-Time Delivery', 'Uncompromising Quality'],
      badgeLabel: 'Years of Field\nExperience',
    },
    stats: [
      { value: '21+', label: 'Years of Experience' },
      { value: '400+', label: 'Expert Team' },
      { value: '60+', label: 'Completed Projects' },
      { value: '120+', label: 'Business Partners' },
    ],
    activity: {
      eyebrow: 'What We Do',
      heading: 'Our areas of expertise',
      cta: 'View Projects',
      items: [
        { title: 'General Contracting', desc: 'We take on full responsibility for the project, managing everything from land to turnkey delivery from a single hand.' },
        { title: 'Contracting', desc: 'Turnkey contracting services managed end to end, from planning to delivery.' },
        { title: 'Urban Transformation', desc: 'We replace at-risk buildings with safe, modern living spaces that comply with current earthquake regulations.' },
        { title: 'Industrial Buildings', desc: 'Design and turnkey construction of production facilities, warehouses and industrial structures.' },
      ],
    },
    about: {
      eyebrow: 'Company Profile',
      heading: 'Where architectural vision meets meticulous engineering',
      paragraph: 'At Çobantaş, we do not merely construct buildings; we create lasting physical assets that drive our clients’ success and endure for generations. Every project is grounded in transparency, durability and the highest quality standards.',
      values: ['Uncompromising Site Safety', 'Advanced Structural Engineering', 'Strict Adherence to Schedules', 'Sustainable, Eco-Friendly Practices'],
      cta: 'Visit the About Page',
    },
    services: {
      eyebrow: 'Divisions & Expertise',
      heading: 'Our comprehensive expertise',
      intro: 'Drawing on our deep industry expertise, we deliver multidisciplinary construction programs of every scale, from start to finish.',
      items: [
        { title: 'Architectural Vision', desc: 'We do more than build; we create prestigious living spaces where modern elegance meets functionality and adds value to their surroundings.' },
        { title: 'Flawless Engineering', desc: 'From structural safety to the finest details of finishing, we work with expert teams to turn vision into flawless reality.' },
        { title: 'Project Management', desc: 'We manage every process with full transparency, overseeing each step from planning to delivery without compromising on quality.' },
        { title: 'Uncompromising Craftsmanship', desc: 'On every square meter we choose first-class, above-industry-standard materials that guarantee both aesthetics and lasting durability.' },
      ],
    },
    projects: {
      eyebrow: 'Completed Works',
      heading: 'Selected projects',
      intro: 'A selection of the structures we have delivered in and around Istanbul, bringing together quality and aesthetics.',
      all: 'All Projects',
    },
    spotlight: {
      eyebrow: 'Featured Project',
      fallbackDesc: 'One of our signature projects, uniting quality and aesthetics.',
      cta: 'Explore the Project',
    },
    partners: { eyebrow: 'Our Partners', heading: 'The institutions we rise alongside with confidence' },
    contact: {
      eyebrow: 'Contact',
      heading: 'Let’s talk about your next project',
      paragraph: 'Need expert engineering consultancy or project management services? Send your request to our corporate team and we’ll respond as soon as possible.',
      addressLabel: 'Our Address',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
    },
  },

  about: {
    breadcrumb: 'About', eyebrow: 'Corporate',
    title: 'Bringing deep-rooted experience together with modern engineering',
    lead: 'Çobantaş Real Estate & Construction combines architectural vision, engineering discipline and corporate integrity to create structures that retain their value for generations.',
    profileEyebrow: 'Company Profile', profileHeading: 'Who we are',
    profileP1: 'Çobantaş Real Estate & Construction was founded in 2005 by Mustafa Çoban in Istanbul. With over twenty years of field experience, it carries out a wide range of works, from factories and industrial structures to residential projects and turnkey contracting.',
    profileP2: 'We see our work as more than putting up buildings; we aim to create lasting works that add value to our clients’ investments and contribute positively to their surroundings and the city. With our expert engineers and technical staff, we manage every project meticulously from foundation to roof.',
    profileP3: 'Our strong partnerships and deep-rooted reputation in the sector are the natural result of our principle of never compromising on quality, safety or delivery schedules.',
    founded: 'Founded', center: 'Headquarters', founder: 'Founder',
    activityEyebrow: 'What We Do', activityHeading: 'Our areas of expertise',
    activityIntro: 'We deliver projects of varying scale and character with the same corporate discipline and understanding of quality.',
    activityItems: [
      { title: 'General Contracting', desc: 'From land assessment and permit processes to construction and turnkey delivery, we take on the entire project and carry full responsibility as your single point of contact.' },
      { title: 'Contracting', desc: 'Turnkey contracting services; managing the entire process from planning to delivery from a single hand, transparently and on schedule.' },
      { title: 'Urban Transformation', desc: 'In the transformation of at-risk buildings we run a transparent process with rightful owners, constructing safe structures that comply with current earthquake regulations and retain their value.' },
      { title: 'Industrial Buildings', desc: 'Design and construction of production facilities, warehouses and industrial structures; combining functionality, wide spans and durability.' },
    ],
    missionTitle: 'Our Mission',
    mission: 'To build durable, sustainable structures that exceed our clients’ expectations by bringing modern engineering and architecture together with uncompromising quality and safety standards — always prioritizing transparency, integrity and on-time delivery.',
    visionTitle: 'Our Vision',
    vision: 'To become a nationally respected brand, cited as a reference in the construction and real estate sector for its quality, corporate reliability and innovative approach. To raise the quality of life and add lasting value to the future of the city with every project we deliver.',
    valuesEyebrow: 'Our Values', valuesHeading: 'The principles that make us who we are',
    valuesIntro: 'Forming the foundation of our corporate culture and guiding every decision we make, our values define the quality of our work.',
    values: [
      { title: 'Reliability', desc: 'We fulfill every commitment we make with full adherence to contractual terms and ethical principles.' },
      { title: 'Quality', desc: 'At every stage, from material selection to workmanship, we uphold a standard of quality above industry norms.' },
      { title: 'Transparency', desc: 'We carry out every process from planning to delivery openly and accountably with our stakeholders.' },
      { title: 'Customer Satisfaction', desc: 'We shape our projects with a service approach that aims to exceed our clients’ expectations.' },
      { title: 'Sustainability', desc: 'We care about building eco-conscious, energy-efficient structures that add value for future generations.' },
      { title: 'Innovation', desc: 'We meticulously integrate modern engineering solutions and architectural approaches into our projects.' },
    ],
    statsLabels: ['Years of Experience', 'Expert Team', 'Completed Projects', 'Business Partners'],
    commitEyebrow: 'Our Quality Commitment', commitHeading: 'Why Çobantaş?',
    commitIntro: 'When we take on a project, we build not just a structure but a relationship of trust that lasts for years. The principal commitments that define our way of working are:',
    commitCta: 'Get in Touch',
    commitItems: [
      'Uncompromising occupational health and safety practices',
      'Advanced structural engineering and structural assurance',
      'Strict adherence to schedules and on-time delivery',
      'First-class materials and skilled craftsmanship',
      'Sustainable and eco-friendly construction methods',
      'Open communication and transparent reporting throughout the project',
    ],
  },

  projectsPage: {
    breadcrumb: 'Projects', eyebrow: 'Portfolio', title: 'Our Projects',
    intro: 'A selection of our works in and around Istanbul, bringing together quality and aesthetics.',
    all: 'All', empty: 'There are no projects in this category yet.',
    ctaHeading: 'Let’s bring your project to life together', ctaBtn: 'Get in Touch',
  },

  detail: {
    gallery: 'Gallery', all: 'All Projects', contactBtn: 'Get in Touch', notFound: 'Project not found',
    prev: 'Previous', next: 'Next', image: 'Image',
    specs: 'Project Details', type: 'Type', area: 'Area', status: 'Status', contractor: 'Contractor', reference: 'Reference',
  },

  statusMap: { 'Bitirilen Proje': 'Completed', 'Devam Eden': 'Ongoing' },

  notFound: {
    title: 'Page not found',
    lead: 'The page you are looking for may have been moved, renamed, or never existed.',
    home: 'Back to Home',
    projects: 'View Projects',
  },

  contactPage: {
    breadcrumb: 'Contact', eyebrow: 'Contact', title: 'Get in touch with us',
    lead: 'Reach out for project consultancy, a quote or any question you may have. Get a quick response via the details below, our social media, or by filling out the form.',
    addressLabel: 'Our Address', phoneLabel: 'Phone', emailLabel: 'Email',
    social: 'Social Media', locationEyebrow: 'Location', visit: 'Visit us', openMaps: 'Open in Google Maps',
  },

  form: {
    title: 'Send a request', subtitle: 'Fill out the form and our team will get in touch with you.',
    ad: 'First Name', soyad: 'Last Name', email: 'Email', telefon: 'Phone', aciklama: 'Message',
    submit: 'Send Request', submitting: 'Sending…',
    successTitle: 'Your request has been received', successBody: 'We will get in touch with you as soon as possible. Thank you for reaching out.',
    error: 'Something went wrong while sending. Please try again or email us directly at info@cobantas.com.',
  },

  footer: {
    tagline: 'Building the foundations of tomorrow today, with uncompromising structural integrity and corporate innovation.',
    corporate: 'Corporate', contact: 'Contact', vizyonMisyon: 'Vision & Mission',
    rights: 'All rights reserved.',
  },
};

const translations = { tr, en };
export default translations;
