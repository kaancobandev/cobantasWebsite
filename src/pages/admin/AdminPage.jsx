import { Link } from 'react-router-dom';
import { isSupabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import Login from '../../components/admin/Login';
import Dashboard from '../../components/admin/Dashboard';

export default function AdminPage() {
  const { loading, session, isAdmin, email, signOut } = useAuth();

  // Supabase henüz ayarlanmadıysa
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 px-6">
        <div className="max-w-md border border-stone-200 bg-white p-8 text-center shadow-soft">
          <h1 className="font-serif text-2xl text-ink-900">Panel henüz yapılandırılmadı</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">
            Yönetim panelini kullanmak için Supabase bağlantı bilgileri gerekir.
            Proje kökündeki <code className="bg-stone-100 px-1">.env</code> dosyasına
            <code className="bg-stone-100 px-1">VITE_SUPABASE_URL</code> ve
            <code className="bg-stone-100 px-1">VITE_SUPABASE_ANON_KEY</code> değerlerini girin.
          </p>
          <Link to="/" className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-bronze-700">← Ana sayfaya dön</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-stone-100 text-ink-500">Yükleniyor…</div>
    );
  }

  // Giriş yapılmadıysa
  if (!session) return <Login />;

  // Giriş yapıldı ama izinli e-posta değilse
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 px-6">
        <div className="max-w-md border border-stone-200 bg-white p-8 text-center shadow-soft">
          <h1 className="font-serif text-2xl text-ink-900">Yetkisiz erişim</h1>
          <p className="mt-3 text-sm text-ink-500">
            <strong>{email}</strong> bu paneli görüntüleme yetkisine sahip değil.
          </p>
          <button onClick={signOut} className="mt-6 border border-ink-900/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-800 transition-colors hover:border-bronze-600 hover:text-bronze-700">
            Çıkış Yap
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}
