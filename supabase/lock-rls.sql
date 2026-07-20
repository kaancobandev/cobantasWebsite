-- ============================================================
-- Çobantaş — yazma yetkisini TEK e-postaya kilitleme
-- Supabase > SQL Editor > New query > yapıştır > Run
--
-- NEDEN: Mevcut kurallar "giriş yapmış HERHANGİ bir kullanıcı" yazabilir diyordu.
-- Şu an kayıt (signup) kapalı olduğu için risk düşük; ama ileride yanlışlıkla
-- açılırsa ya da başka bir kullanıcı oluşturulursa o kişi projeleri
-- değiştirebilir/silebilirdi. Bu betik yetkiyi yalnızca aşağıdaki e-postaya verir.
--
-- E-POSTANI DEĞİŞTİRECEKSEN: Aşağıdaki 4 yerdeki adresi güncelle.
-- Okuma (herkese açık site) kuralları DEĞİŞMEZ — ziyaretçiler projeleri görmeye devam eder.
-- ============================================================

-- 1) projects tablosu: yalnızca admin e-postası yazabilir/silebilir
drop policy if exists "projects_admin_write" on public.projects;
create policy "projects_admin_write"
  on public.projects for all
  to authenticated
  using      ((auth.jwt() ->> 'email') = 'kaaan3452@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'kaaan3452@gmail.com');

-- 2) Depolama (foto yüklemeleri): yalnızca admin e-postası
drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-media' and (auth.jwt() ->> 'email') = 'kaaan3452@gmail.com');

drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-media' and (auth.jwt() ->> 'email') = 'kaaan3452@gmail.com');

drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-media' and (auth.jwt() ->> 'email') = 'kaaan3452@gmail.com');

-- Kontrol: aktif kurallar
select tablename, policyname, cmd
from pg_policies
where (schemaname = 'public' and tablename = 'projects')
   or (schemaname = 'storage' and tablename = 'objects')
order by tablename, policyname;
