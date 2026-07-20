-- ============================================================
-- Çobantaş — projelere Yüklenici / Referans / Durum alanları
-- Supabase > SQL Editor > New query > yapıştır > Run
--
-- Bu betik GÜVENLİDİR: yalnızca yeni sütun ekler, mevcut veriyi silmez.
-- Tekrar çalıştırılabilir (if not exists / if exists kullanıldı).
-- ============================================================

-- 1) Yeni sütunlar (boş bırakılabilir)
alter table public.projects add column if not exists contractor text;  -- Yüklenici
alter table public.projects add column if not exists reference  text;  -- Referans
alter table public.projects add column if not exists status     text;  -- Bitirilen / Devam Eden

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

-- Kontrol
select status, count(*) as adet
from public.projects
group by status
order by status;
