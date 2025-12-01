
import { useState } from 'react';
import { supabase } from '../api/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else nav('/dashboard');
  }

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Compte créé, vérifie tes emails.');
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 shadow rounded w-80 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Connexion affilié</h2>
        <input
          className="border p-2 text-sm"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border p-2 text-sm"
          type="password"
          placeholder="Mot de passe"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white p-2 text-sm" onClick={login}>
          Se connecter
        </button>
        <button className="text-xs underline" onClick={signUp}>
          Créer un compte
        </button>
      </div>
    </div>
  );
}
