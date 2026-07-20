import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, LogOut, ExternalLink, Building2 } from 'lucide-react';
import { supabase, MEDIA_BUCKET } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import ProjectForm from './ProjectForm';

// Supabase public URL -> storage içindeki dosya yolu.
// public/ klasöründen gelen sabit görseller (ör. "/pinnacle.jpg") null döner;
// onlar depoya ait değildir, silinmemelidir.
function storagePathFromUrl(url) {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return null;
  return decodeURIComponent(url.slice(i + marker.length));
}

export default function Dashboard() {
  const { email, signOut } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('list'); // 'list' | 'create' | 'edit'
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setProjects(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  async function handleDelete(p) {
    if (!window.confirm(`"${p.title}" projesini silmek istediğinize emin misiniz?`)) return;

    // Önce kayıt silinir (kullanıcının gördüğü asıl işlem)
    const { error } = await supabase.from('projects').delete().eq('id', p.id);
    if (error) { setError(error.message); return; }

    // Ardından yüklenmiş görseller storage'dan temizlenir (en iyi çaba —
    // başarısız olursa yalnızca artık dosya kalır, işlem yine de tamamlanmıştır)
    const paths = [p.cover_url, ...(p.images || [])].map(storagePathFromUrl).filter(Boolean);
    if (paths.length) {
      const { error: rmErr } = await supabase.storage.from(MEDIA_BUCKET).remove(paths);
      if (rmErr) console.warn('Görseller silinemedi:', rmErr.message);
    }

    fetchProjects();
  }

  function handleSaved() {
    setMode('list');
    setEditing(null);
    fetchProjects();
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Üst bar */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-bronze-600 text-white"><Building2 className="h-5 w-5" /></span>
            <div className="leading-tight">
              <div className="font-serif text-lg text-ink-900">Çobantaş Yönetim</div>
              <div className="text-[0.7rem] text-ink-400">{email}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/projeler" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-600 transition-colors hover:text-bronze-700 sm:flex">
              <ExternalLink className="h-4 w-4" /> Siteyi Gör
            </Link>
            <button onClick={signOut} className="flex items-center gap-2 border border-ink-900/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-800 transition-colors hover:border-bronze-600 hover:text-bronze-700">
              <LogOut className="h-4 w-4" /> Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {mode === 'list' && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl text-ink-900">Projeler</h1>
                <p className="mt-1 text-sm text-ink-500">{projects.length} proje · en son eklenen en üstte</p>
              </div>
              <button onClick={() => { setEditing(null); setMode('create'); }}
                className="flex items-center gap-2 bg-bronze-600 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-bronze-700">
                <Plus className="h-4 w-4" /> Yeni Proje
              </button>
            </div>

            {error && <p className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            {loading ? (
              <p className="text-ink-500">Yükleniyor…</p>
            ) : projects.length === 0 ? (
              <div className="border border-dashed border-stone-300 bg-white p-12 text-center">
                <p className="text-ink-500">Henüz proje eklenmedi. "Yeni Proje" ile başlayın.</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-200 border border-stone-200 bg-white">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 p-4">
                    <div className="h-16 w-24 flex-shrink-0 overflow-hidden bg-stone-100">
                      {p.cover_url && <img src={p.cover_url} alt={p.title} className="h-full w-full object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-serif text-lg text-ink-900">{p.title}</div>
                      <div className="mt-0.5 text-xs text-ink-500">
                        {p.type}{p.area_m2 ? ` · ${p.area_m2.toLocaleString('tr-TR')} m²` : ''}{p.images?.length ? ` · ${p.images.length} galeri foto` : ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditing(p); setMode('edit'); }}
                        className="grid h-9 w-9 place-items-center border border-stone-200 text-ink-600 transition-colors hover:border-bronze-600 hover:text-bronze-700" aria-label="Düzenle">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(p)}
                        className="grid h-9 w-9 place-items-center border border-stone-200 text-ink-600 transition-colors hover:border-red-400 hover:text-red-600" aria-label="Sil">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {(mode === 'create' || mode === 'edit') && (
          <ProjectForm
            project={mode === 'edit' ? editing : null}
            onSaved={handleSaved}
            onCancel={() => { setMode('list'); setEditing(null); }}
          />
        )}
      </main>
    </div>
  );
}
