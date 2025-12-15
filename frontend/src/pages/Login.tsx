
import { useState } from 'react';
import { supabase } from '../api/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  async function login() {
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        // Afficher un message d'erreur plus détaillé
        if (authError.message.includes('fetch')) {
          setError('❌ Erreur de connexion : Impossible de contacter le serveur Supabase. Vérifiez votre configuration dans .env.local');
        } else {
          setError(`❌ ${authError.message}`);
        }
      } else {
        nav('/dashboard');
      }
    } catch (err: any) {
      // Gérer les erreurs réseau
      if (err.message?.includes('Failed to fetch') || err.name === 'TypeError') {
        setError('❌ Erreur réseau : Le serveur Supabase est inaccessible. Vérifiez que l\'URL Supabase est correcte dans votre fichier .env.local');
      } else {
        setError(`❌ Erreur inattendue : ${err.message || 'Une erreur est survenue'}`);
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function signUp() {
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signUp({ email, password });

      if (authError) {
        if (authError.message.includes('fetch')) {
          setError('❌ Erreur de connexion : Impossible de contacter le serveur Supabase. Vérifiez votre configuration dans .env.local');
        } else {
          setError(`❌ ${authError.message}`);
        }
      } else {
        setError(null);
        alert('✅ Compte créé avec succès ! Vérifie tes emails pour confirmer ton compte.');
      }
    } catch (err: any) {
      if (err.message?.includes('Failed to fetch') || err.name === 'TypeError') {
        setError('❌ Erreur réseau : Le serveur Supabase est inaccessible. Vérifiez que l\'URL Supabase est correcte dans votre fichier .env.local');
      } else {
        setError(`❌ Erreur inattendue : ${err.message || 'Une erreur est survenue'}`);
      }
      console.error('SignUp error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 shadow-lg rounded-lg w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Connexion affilié</h2>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* Informations de configuration */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded text-xs">
          <strong>ℹ️ Configuration :</strong>
          <br />
          URL: {import.meta.env.VITE_SUPABASE_URL || 'Non configurée'}
        </div>

        <input
          className="border border-gray-300 p-3 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          className="border border-gray-300 p-3 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 text-sm rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={login}
          disabled={loading || !email || !password}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
        <button
          className="text-sm text-blue-600 hover:text-blue-800 underline disabled:opacity-50"
          onClick={signUp}
          disabled={loading || !email || !password}
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
}
