-- ============================================================
-- Çobantaş — projelere ek alanlar
--   Yüklenici · Referans · Referans Telefon · Durum · Teslim Tarihi
-- Supabase > SQL Editor > New query > yapıştır > Run
--
-- GÜVENLİ ve TEKRAR ÇALIŞTIRILABİLİR:
--   • Hiç çalıştırmadıysan  -> tüm alanları doğru tipte oluşturur
--   • Önceki sürümü çalıştırdıysan -> eski alanları yeni hâline TAŞIR (veri korunur):
--       reference_no  ->  reference_phone   (ad değişikliği)
--       delivery_date : date -> text        (artık "2024-2026" gibi serbest metin)
-- Hiçbir adımda veri silinmez.
-- ============================================================

-- 0) ESKİ ADI YENİYE TAŞI (yalnızca eski ad varsa ve yenisi yoksa)
--    Bu adım, aşağıdaki "add column" satırlarından ÖNCE gelmelidir; aksi hâlde
--    boş bir reference_phone oluşur ve eski veri reference_no'da öksüz kalırdı.
do $$
begin
  if exists (
        select 1 from information_schema.columns
        where table_schema = 'public' and table_name = 'projects' and column_name = 'reference_no'
     )
     and not exists (
        select 1 from information_schema.columns
        where table_schema = 'public' and table_name = 'projects' and column_name = 'reference_phone'
     )
  then
    alter table public.projects rename column reference_no to reference_phone;
  end if;
end $$;

-- 1) Alanlar (hepsi boş bırakılabilir)
alter table public.projects add column if not exists contractor      text;  -- Yüklenici
alter table public.projects add column if not exists reference       text;  -- Referans (kişi/kurum)
alter table public.projects add column if not exists reference_phone text;  -- Referans telefonu
alter table public.projects add column if not exists status          text;  -- Bitirilen / Devam Eden
alter table public.projects add column if not exists delivery_date   text;  -- Serbest metin: "2024-2026"

-- 2) delivery_date önceki sürümde "date" tipindeyse serbest metne çevir.
--    (Zaten text ise bu satır zararsızdır; mevcut tarihler '2024-03-15' metnine dönüşür.)
alter table public.projects
  alter column delivery_date type text using delivery_date::text;

-- 3) Durum için geçerli değerler (boş da olabilir)
alter table public.projects drop constraint if exists projects_status_check;
alter table public.projects
  add constraint projects_status_check
  check (status is null or status in ('Bitirilen Proje', 'Devam Eden'));

-- 4) Durumu boş olan projeleri "Bitirilen Proje" yap + yeni kayıtlara varsayılan.
--    Devam eden projelerini sonradan panelden "Devam Eden" yapabilirsin.
update public.projects set status = 'Bitirilen Proje' where status is null;
alter table public.projects alter column status set default 'Bitirilen Proje';

-- Kontrol: alanlar ve tipleri
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'projects'
  and column_name in ('contractor','reference','reference_phone','status','delivery_date')
order by column_name;
