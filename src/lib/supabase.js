import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase ayarlanmadıysa site yine çalışsın diye client'i koşullu oluşturuyoruz.
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;

// Foto yüklemeleri bu bucket'a gider (public okuma).
export const MEDIA_BUCKET = 'project-media';

// Panele girebilecek tek e-posta
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').toLowerCase().trim();
