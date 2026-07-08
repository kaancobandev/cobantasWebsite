import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import staticProjects from '../data/projects';

// Statik liste (Supabase yokken/boşken) ortak şekle dönüştürülür.
const fallback = staticProjects.map((p, i) => ({
  id: `static-${i}`,
  title: p.title,
  type: p.category,
  area_m2: null,
  cover_url: p.img,
  body: '',
  images: [],
  created_at: null,
}));

export function getFallbackProject(id) {
  return fallback.find((p) => p.id === id) || null;
}

// Tüm projeler — en son eklenen en başta.
export function useProjects() {
  const [projects, setProjects] = useState(isSupabaseConfigured ? [] : fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (!active) return;
      if (error || !data || data.length === 0) {
        setProjects(fallback); // hata ya da boşsa statik listeyi göster
      } else {
        setProjects(data);
      }
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  return { projects, loading };
}

// Tek proje (detay sayfası).
export function useProject(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!isSupabaseConfigured || String(id).startsWith('static-')) {
        if (active) { setProject(getFallbackProject(id)); setLoading(false); }
        return;
      }
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (!active) return;
      setProject(error ? null : data);
      setLoading(false);
    })();
    return () => { active = false; };
  }, [id]);

  return { project, loading };
}
