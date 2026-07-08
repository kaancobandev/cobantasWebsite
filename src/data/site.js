// Tüm iletişim bilgileri ve sosyal medya linkleri tek yerden yönetilir.
// Yeni link/numara değiştirmek için yalnızca burayı düzenleyin.

export const contactInfo = {
  address: 'Atatürk Mah. Komsan Üstü Yolu Cad. Residance Quality No:4 İç Kapı No:211 Küçükçekmece / İstanbul',
  phoneDisplay: '+90 (532) 524 41 93',
  phoneHref: 'tel:+905325244193',
  email: 'info@cobantas.com',
  emailHref: 'mailto:info@cobantas.com',
};

// href '#' olanlar henüz verilmedi — gerçek adresleri gelince buraya yazın.
// "icon" değeri src/components/ui.jsx içindeki socialIcons anahtarlarıyla eşleşir.
export const socials = [
  { name: 'Instagram', icon: 'instagram', href: 'https://instagram.com/cobantas_fksy' },
  { name: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/905325244193' },
  { name: 'LinkedIn', icon: 'linkedin', href: '#' },
  { name: 'Facebook', icon: 'facebook', href: '#' },
  { name: 'X (Twitter)', icon: 'twitter', href: '#' },
];

// Google Haritalar gömme adresi (Google Maps > Paylaş > "Harita yerleştir" > iframe src'si).
// Değiştirmek için yeni embed src adresini buraya yapıştırman yeterli.
export const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3577.646900173052!2d28.78740629484981!3d41.05958257751819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDAzJzM2LjQiTiAyOMKwNDcnMTkuMCJF!5e0!3m2!1str!2str!4v1781730958631!5m2!1str!2str';
// "Büyük haritada aç" linki — gömülü haritadaki konumla aynı koordinatlar:
export const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=41.05958257751819,28.78740629484981';
