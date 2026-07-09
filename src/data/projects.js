// Projeler tek yerden yönetilir; hem ana sayfa hem /projeler sayfası bunu kullanır.
// Görseller public/ klasöründedir (mutlak yol, tüm sayfalarda güvenli çalışır).
// Yeni proje eklemek için listeye bir nesne ekleyin.
const projects = [
  { img: '/alemara.jpg', title: 'Alemara', category: 'Taahhüt' },
  { img: '/flamingo.jpg', title: 'Flamingo Alkent', category: 'Taahhüt' },
  { img: '/lotus-istanbul.jpg', title: 'Lotus İstanbul', category: 'Taahhüt' },
  { img: '/bahce-bahcesehir.jpg', title: 'Bahçe Bahçeşehir', category: 'Taahhüt' },
  { img: '/panorama-silivri.jpg', title: 'Panorama Bulvar Silivri', category: 'Taahhüt' },
  { img: '/pinnacle.jpg', title: 'Pinnacle', category: 'Taahhüt' },
];

export default projects;
