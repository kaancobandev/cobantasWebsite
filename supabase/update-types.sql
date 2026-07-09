-- ============================================================
-- Çobantaş — proje türlerini güncelleme betiği
-- Supabase > SQL Editor > New query > yapıştır > Run
--
-- Eski türler : Konut, Fabrika, Taahhüt
-- Yeni türler : Müteahhitlik, Taahhüt, Kentsel Dönüşüm, Sanayi Yapıları
-- Mevcut tüm projeler "Taahhüt" olarak işaretlenir.
--
-- DİKKAT: Adımların sırası önemli. Önce satırlar güncellenmeli; yeni CHECK kısıtı
-- eklenirken Postgres mevcut satırları doğrular, eski "Konut" satırları kalırsa hata verir.
-- ============================================================

-- 1) Mevcut tüm projeleri "Taahhüt" yap
update public.projects
set type = 'Taahhüt'
where type is distinct from 'Taahhüt';

-- 2) Sütun varsayılanını geçerli bir değere çek (eski varsayılan 'Konut' idi)
alter table public.projects alter column type set default 'Taahhüt';

-- 3) Eski tür kısıtını kaldır, yeni tür listesini ekle
alter table public.projects drop constraint if exists projects_type_check;

alter table public.projects
  add constraint projects_type_check
  check (type in ('Müteahhitlik','Taahhüt','Kentsel Dönüşüm','Sanayi Yapıları'));

-- Kontrol: türlere göre proje sayısı (hepsi Taahhüt olmalı)
select type, count(*) as adet
from public.projects
group by type
order by type;
