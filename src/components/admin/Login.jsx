import { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) setError(error.message || 'Giriş başarısız. Bilgileri kontrol edin.');
  }

  const field = 'w-full border border-stone-300 bg-stone-50 px-4 py-3 text-ink-900 outline-none transition-colors focus:border-bronze-600 focus:bg-white focus:ring-2 focus:ring-bronze-600/15';

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-6">
      <div className="w-full max-w-md border border-stone-200 bg-white p-8 shadow-soft md:p-10">
        <div className="grid h-12 w-12 place-items-center bg-bronze-600 text-white">
          <Lock className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-ink-900">Yönetim Paneli</h1>
        <p className="mt-2 text-sm text-ink-500">Devam etmek için yetkili e-posta ile giriş yapın.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-500">E-Posta</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className={field} />
          </div>
          <div>
            <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-500">Şifre</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className={field} />
          </div>
          {error && <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={busy} className="w-full bg-bronze-600 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700 disabled:opacity-60">
            {busy ? 'Giriş yapılıyor…' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
