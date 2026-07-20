-- ============================================================
-- Çobantaş — projelere ek alanlar
--   Yüklenici · Referans · Durum · Teslim Tarihi · Referans No
-- Supabase > SQL Editor > New query > yapıştır > Run
--
-- Bu betik GÜVENLİDİR: yalnızca yeni sütun ekler, mevcut veriyi silmez.
-- Tekrar çalıştırılabilir (if not exists / if exists kullanıldı) — daha önce
-- çalıştırdıysan tekrar çalıştırman sorun çıkarmaz, eksik sütunları tamamlar.
-- ============================================================

-- 1) Yeni sütunlar (boş bırakılabilir)
alter table public.projects add column if not exists contractor    text;  -- Yüklenici
alter table public.projects add column if not exists reference     text;  -- Referans (kurum/kişi)
alter table public.projects add column if not exists status        text;  -- Bitirilen / Devam Eden
alter table public.projects add column if not exists delivery_date date;  -- Proje teslim tarihi
alter table public.projects add column if not exists reference_no  text;  -- Referans numarası

-- 2) Durum için geçerli değerler (boş da olabilir)
alter table public.projects drop constraint if exists projects_status_check;
alter table public.projects
  add constraint projects_status_check
  check (status is null or status in ('Bitirilen Proje', 'Devam Eden'));

-- 3) Mevcut projelerin hepsini "Bitirilen Proje" olarak işaretle.
--    NOT: Devam eden projelerin varsa, bu betikten SONRA admin panelinden
--    tek tek "Devam Eden" yapman yeterli. Bu satırı istemezsen çalıştırma.
update public.projects set status = 'Bitirilen Proje' where status is null;

-- 4) Yeni eklenen projeler için varsayılan
alter table public.projects alter column status set default 'Bitirilen Proje';

-- Kontrol: sütunlar eklendi mi?
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'projects'
  and column_name in ('contractor','reference','status','delivery_date','reference_no')
order by column_name;

-- Kontrol: durum dağılımı
select status, count(*) as adet
from public.projects
group by status
order by status;
