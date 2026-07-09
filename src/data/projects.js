// Projeler tek yerden yönetilir; hem ana sayfa hem /projeler sayfası bunu kullanır.
// Görseller public/ klasöründedir (mutlak yol, tüm sayfalarda güvenli çalışır).
// Yeni proje eklemek için listeye bir nesne ekleyin.
const projects = [
  { img: '/alemara.jpg', title: 'Alemara', category: 'Konut' },
  { img: '/flamingo.jpg', title: 'Flamingo Alkent', category: 'Konut' },
  { img: '/lotus-istanbul.jpg', title: 'Lotus İstanbul', category: 'Konut' },
  { img: '/bahce-bahcesehir.jpg', title: 'Bahçe Bahçeşehir', category: 'Konut' },
  { img: '/panorama-silivri.jpg', title: 'Panorama Bulvar Silivri', category: 'Konut' },
  { img: '/pinnacle.jpg', title: 'Pinnacle', category: 'Konut' },
];

export default projects;
