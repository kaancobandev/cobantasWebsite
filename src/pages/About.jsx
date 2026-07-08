import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target, Eye, ShieldCheck, Gem, Scale, Leaf, Handshake, Lightbulb,
  CheckCircle2, ArrowRight, ChevronRight,
  Factory, Building2, ClipboardCheck,
} from 'lucide-react';
import { Eyebrow } from '../components/ui';
import CountUp from '../components/CountUp';
import useScrollReveal from '../hooks/useScrollReveal';

const stats = [
  { label: 'Yıllık Tecrübe', value: '30+' },
  { label: 'Uzman Kadro', value: '150+' },
  { label: 'Tamamlanan Proje', value: '30+' },
  { label: 'İş Ortağı', value: '20+' },
];

const coreValues = [
  { icon: ShieldCheck, title: 'Güvenilirlik', desc: 'Verdiğimiz her taahhüdü, sözleşmedeki koşullara ve etik ilkelere tam bağlılıkla yerine getiririz.' },
  { icon: Gem, title: 'Kalite', desc: 'Malzeme seçiminden işçiliğe kadar her aşamada, sektör standartlarının üzerinde bir kalite anlayışını esas alırız.' },
  { icon: Scale, title: 'Şeffaflık', desc: 'Planlamadan teslimata kadar tüm süreçleri, paydaşlarımızla açık ve hesap verebilir biçimde yürütürüz.' },
  { icon: Handshake, title: 'Müşteri Memnuniyeti', desc: 'Projelerimizi, müşterilerimizin beklentilerini aşmayı hedefleyen bir hizmet anlayışıyla şekillendiririz.' },
  { icon: Leaf, title: 'Sürdürülebilirlik', desc: 'Çevreye duyarlı, enerji verimli ve gelecek nesillere değer katan yapılar inşa etmeyi önemseriz.' },
  { icon: Lightbulb, title: 'Yenilikçilik', desc: 'Çağdaş mühendislik çözümlerini ve modern mimari yaklaşımları projelerimize titizlikle entegre ederiz.' },
];

const activityAreas = [
  { icon: Factory, title: 'Fabrika & Endüstriyel Yapılar', desc: 'Üretim tesisleri, depo ve endüstriyel yapıların projelendirilmesi ve inşası; fonksiyonelliği, geniş açıklıkları ve dayanıklılığı bir arada sunuyoruz.' },
  { icon: Building2, title: 'Konut Projeleri', desc: 'Modern mimari ile yüksek yaşam kalitesini esas alan konut projeleri; estetiği ve konforu prestijli yaşam alanlarında buluşturuyoruz.' },
  { icon: ClipboardCheck, title: 'Taahhüt İşleri', desc: 'Anahtar teslim taahhüt hizmetleri; planlamadan teslime kadar tüm süreci tek elden, şeffaf ve takvime sadık biçimde yönetiyoruz.' },
];

const commitments = [
  'Tavizsiz iş sağlığı ve güvenliği uygulamaları',
  'Gelişmiş yapısal mühendislik ve statik güvence',
  'Zaman çizelgesine sıkı uyum ve zamanında teslim',
  'Birinci sınıf malzeme ve nitelikli işçilik',
  'Sürdürülebilir ve çevre dostu inşaat yöntemleri',
  'Proje boyunca açık iletişim ve şeffaf raporlama',
];

export default function About() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Hakkımızda | Çobantaş Gayrimenkul İnşaat';
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
            <span className="text-bronze-700">Hakkımızda</span>
          </nav>
          <Eyebrow>Kurumsal</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Köklü tecrübeyi çağdaş mühendislikle buluşturuyoruz
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
            Çobantaş Gayrimenkul İnşaat; mimari vizyon, mühendislik disiplini ve kurumsal dürüstlüğü bir araya getirerek nesiller boyu değerini koruyacak yapılar üretmektedir.
          </p>
        </div>
      </section>

      {/* Kurumsal profil */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="reveal relative">
              <div className="absolute -inset-3 hidden border border-bronze-300/60 lg:block" />
              <img
                src="/pinnacle.jpg"
                alt="Çobantaş projesi"
                className="relative h-[60vh] w-full object-cover"
              />
            </div>
            <div className="reveal">
              <Eyebrow>Şirket Profili</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.6rem]">
                Biz kimiz?
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink-600">
                <p>
                  Çobantaş Gayrimenkul İnşaat, <strong className="font-semibold text-ink-900">1995 yılında Mustafa Çoban tarafından İstanbul'da</strong> kurulmuştur. Otuz yılı aşkın saha tecrübesiyle fabrika ve endüstriyel yapılardan konut projelerine, anahtar teslim taahhüt işlerine kadar geniş bir yelpazede çalışmalar yürütmektedir.
                </p>
                <p>
                  Faaliyetlerimizi yalnızca bina inşa etmek olarak görmüyor; müşterilerimizin yatırımlarına değer katan, çevresine ve şehre olumlu katkı sunan kalıcı eserler ortaya koymayı amaçlıyoruz. Uzman mühendis ve teknik kadromuzla her projeyi temelden çatıya kadar titizlikle yönetiyoruz.
                </p>
                <p>
                  Güçlü iş ortaklıklarımız ve sektördeki köklü itibarımız; kaliteden, güvenlikten ve teslim takviminden ödün vermeden çalışma ilkemizin doğal bir sonucudur.
                </p>
              </div>

              <div className="mt-9 grid grid-cols-3 gap-6 border-t border-stone-200 pt-7">
                <div>
                  <div className="font-serif text-3xl text-ink-900">1995</div>
                  <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-700">Kuruluş</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-ink-900">İstanbul</div>
                  <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-700">Merkez</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-ink-900">M. Çoban</div>
                  <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widestx text-bronze-700">Kurucu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faaliyet Alanlarımız */}
      <section className="border-t border-stone-200 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Faaliyet Alanlarımız</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.6rem]">
              Uzmanlaştığımız alanlar
            </h2>
            <p className="mt-6 leading-relaxed text-ink-500">
              Farklı ölçek ve niteliklerdeki projeleri, aynı kurumsal disiplin ve kalite anlayışıyla hayata geçiriyoruz.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {activityAreas.map((a, idx) => (
              <div
                key={idx}
                className="reveal group border border-stone-200 bg-white p-9 transition-all duration-300 hover:-translate-y-1 hover:border-bronze-300 hover:shadow-card"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="grid h-14 w-14 place-items-center bg-stone-100 text-bronze-600 transition-colors group-hover:bg-bronze-600 group-hover:text-white">
                  <a.icon className="h-7 w-7" strokeWidth={1.25} />
                </div>
                <h3 className="mt-7 font-serif text-xl text-ink-900">{a.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-500">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="border-y border-stone-200 bg-stone-100 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <div className="reveal border border-stone-200 bg-white p-9 md:p-11">
              <div className="grid h-14 w-14 place-items-center bg-bronze-600 text-white">
                <Target className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mt-7 font-serif text-2xl text-ink-900 md:text-3xl">Misyonumuz</h3>
              <p className="mt-5 leading-relaxed text-ink-600">
                Çağdaş mühendislik ve mimari anlayışı, tavizsiz kalite ve güvenlik standartlarıyla buluşturarak; müşterilerimizin beklentilerini aşan, dayanıklı ve sürdürülebilir yapılar inşa etmek. Her projede şeffaflığı, dürüstlüğü ve zamanında teslimi esas almak.
              </p>
            </div>
            <div className="reveal border border-stone-200 bg-white p-9 md:p-11">
              <div className="grid h-14 w-14 place-items-center bg-ink-900 text-white">
                <Eye className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mt-7 font-serif text-2xl text-ink-900 md:text-3xl">Vizyonumuz</h3>
              <p className="mt-5 leading-relaxed text-ink-600">
                İnşaat ve gayrimenkul sektöründe; kalitesi, kurumsal güvenilirliği ve yenilikçi yaklaşımıyla referans gösterilen, ulusal ölçekte saygın bir marka olmak. Hayata geçirdiğimiz her projeyle yaşam kalitesini yükseltmek ve şehrin geleceğine kalıcı değer katmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Değerlerimiz</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.6rem]">
              Bizi biz yapan ilkeler
            </h2>
            <p className="mt-6 leading-relaxed text-ink-500">
              Kurumsal kültürümüzün temelini oluşturan ve her kararımıza yön veren değerlerimiz, çalışmalarımızın niteliğini belirler.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, idx) => (
              <div
                key={idx}
                className="reveal group border border-stone-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-bronze-300 hover:shadow-card"
                style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
              >
                <v.icon className="h-9 w-9 text-bronze-600" strokeWidth={1.25} />
                <h4 className="mt-6 font-serif text-xl text-ink-900">{v.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rakamlarla Çobantaş */}
      <section className="border-y border-stone-200 bg-ink-950 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`reveal px-4 py-14 text-center ${idx > 0 ? 'lg:border-l lg:border-white/10' : ''} ${idx % 2 === 1 ? 'border-l border-white/10' : ''} ${idx > 1 ? 'border-t border-white/10 lg:border-t-0' : ''}`}
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <CountUp value={stat.value} className="block font-serif text-5xl text-white lg:text-6xl" />
                <div className="mt-3 text-[0.7rem] font-semibold uppercase tracking-widestx text-bronze-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taahhütlerimiz */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <Eyebrow>Kalite Taahhüdümüz</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl leading-tight text-ink-900 md:text-[2.6rem]">
                Neden Çobantaş?
              </h2>
              <p className="mt-7 max-w-lg leading-relaxed text-ink-500">
                Bir projeyi üstlendiğimizde, yalnızca bir yapı değil; uzun yıllar sürecek bir güven ilişkisi inşa ederiz. Çalışma anlayışımızı belirleyen başlıca taahhütlerimiz şunlardır:
              </p>
              <Link to="/iletisim" className="group mt-10 inline-flex items-center gap-2.5 bg-bronze-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700">
                Bizimle İletişime Geçin
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="reveal grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:content-center">
              {commitments.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-bronze-600" strokeWidth={1.75} />
                  <span className="text-sm font-medium leading-relaxed text-ink-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
