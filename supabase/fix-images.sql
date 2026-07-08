-- ============================================================
-- Çobantaş — mevcut veritabanını düzeltme betiği
-- Supabase > SQL Editor > New query > yapıştır > Run
--
-- Neden: setup.sql iki kez çalıştırıldığı için projeler mükerrer eklenmiş,
-- ayrıca bazı görsel yolları boşluk/Türkçe karakter içerdiğinden canlıda açılmıyordu.
-- Bu betik mükerrerleri temizler ve yolları yeni ASCII dosya adlarıyla eşler.
-- ============================================================

-- 1) Mükerrer kayıtları sil (her başlıktan yalnızca bir tanesini tut)
delete from public.projects a
using public.projects b
where a.title = b.title
  and a.ctid > b.ctid;

-- 2) Görsel yollarını yeni (ASCII) dosya adlarına güncelle
update public.projects set cover_url = '/alemara.jpg'          where cover_url = '/alemara şantiyesi.jpg';
update public.projects set cover_url = '/lotus-istanbul.jpg'   where cover_url = '/lotus istanbul son hal.jpg';
update public.projects set cover_url = '/panorama-silivri.png' where cover_url = '/panorama silivri.png';

-- Kontrol: kalan projeler ve kapak yolları
select title, type, cover_url, created_at
from public.projects
order by created_at desc;
