import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, ADMIN_EMAIL } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const email = session?.user?.email?.toLowerCase() ?? null;
  // İzinli e-posta belirtilmişse yalnızca o kabul edilir; belirtilmemişse herhangi bir
  // giriş yapan kullanıcı (zaten yalnızca senin oluşturduğun hesap olacak) yetkilidir.
  const isAdmin = Boolean(session) && (!ADMIN_EMAIL || email === ADMIN_EMAIL);

  async function signIn(emailInput, password) {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase yapılandırılmadı (.env eksik).' } };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: emailInput.trim(),
      password,
    });
    return { error };
  }

  async function signOut() {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, email, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
