-- ============================================================
-- Çobantaş — Supabase kurulum betiği
-- Supabase panelinde: SQL Editor > New query > bu içeriği yapıştır > Run
-- ============================================================

-- 1) Projeler tablosu
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  title       text not null,
  type        text not null default 'Taahhüt' check (type in ('Müteahhitlik','Taahhüt','Kentsel Dönüşüm','Sanayi Yapıları')),
  area_m2     integer,
  cover_url   text,
  body        text,
  images      text[] not null default '{}'
);

-- 2) RLS (satır bazlı güvenlik)
alter table public.projects enable row level security;

-- Herkes okuyabilir (public site)
drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read"
  on public.projects for select
  using (true);

-- Yalnızca giriş yapmış (admin) kullanıcı ekleyebilir/güncelleyebilir/silebilir
drop policy if exists "projects_admin_write" on public.projects;
create policy "projects_admin_write"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- 3) Depolama kovası (kapak + carousel foto) — public okuma
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'project-media');

drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-media');

drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-media');

drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-media');

-- 4) (İsteğe bağlı) Mevcut projeleri başlangıç verisi olarak ekle.
--    Yalnızca tablo boşken ekler; betik tekrar çalıştırılsa bile mükerrer kayıt oluşmaz.
insert into public.projects (title, type, cover_url)
select v.title, v.type, v.cover_url
from (values
  ('Pinnacle',                'Taahhüt', '/pinnacle.jpg'),
  ('Panorama Bulvar Silivri', 'Taahhüt', '/panorama-silivri.jpg'),
  ('Bahçe Bahçeşehir',        'Taahhüt', '/bahce-bahcesehir.jpg'),
  ('Lotus İstanbul',          'Taahhüt', '/lotus-istanbul.jpg'),
  ('Flamingo Alkent',         'Taahhüt', '/flamingo.jpg'),
  ('Alemara',                 'Taahhüt', '/alemara.jpg')
) as v(title, type, cover_url)
where not exists (select 1 from public.projects);
