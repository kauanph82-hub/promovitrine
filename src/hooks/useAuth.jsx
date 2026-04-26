import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica sessão atual do Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAdmin({ username: session.user.email });
      }
      setLoading(false);
    });

    // Escuta mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAdmin({ username: session.user.email });
      } else {
        setAdmin(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(username, password) {
    console.log('🔐 Tentando login com Supabase:', username);
    
    // Login direto no Supabase usando email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    
    if (error) {
      console.error('❌ Erro no login:', error.message);
      throw new Error(error.message);
    }
    
    console.log('✅ Login bem-sucedido:', data.user.email);
    setAdmin({ username: data.user.email });
  }

  async function logout() {
    console.log('🔐 Logout');
    await supabase.auth.signOut();
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
