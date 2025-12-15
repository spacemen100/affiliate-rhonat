# Configuration Supabase

## Problème actuel

L'URL Supabase actuelle (`https://ionoburxknruxedgivno.supabase.co`) ne fonctionne pas.
Erreur : "Failed to fetch" - Le serveur DNS ne peut pas résoudre cette URL.

## Solution : Créer/Configurer un projet Supabase

### Étape 1 : Créer un projet Supabase

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Connectez-vous ou créez un compte
3. Cliquez sur "New Project"
4. Remplissez les informations :
   - **Name** : affiliate-rhonat (ou autre nom)
   - **Database Password** : Choisissez un mot de passe fort
   - **Region** : Choisissez la région la plus proche (Europe West par exemple)
5. Cliquez sur "Create new project"
6. Attendez quelques minutes que le projet soit créé

### Étape 2 : Récupérer les credentials

1. Une fois le projet créé, allez dans **Settings** → **API**
2. Copiez les informations suivantes :
   - **Project URL** (commence par `https://xxxxx.supabase.co`)
   - **anon public** key (dans la section "Project API keys")

### Étape 3 : Mettre à jour le frontend

Créez un fichier `.env.local` dans le dossier `frontend` :

```bash
VITE_SUPABASE_URL=https://votre-projet-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key-ici
```

### Étape 4 : Configurer l'authentification

1. Dans le dashboard Supabase, allez dans **Authentication** → **Providers**
2. Activez **Email** provider
3. Dans **Authentication** → **URL Configuration**, configurez :
   - **Site URL** : `http://localhost:5173` (pour le dev)
   - **Redirect URLs** : Ajoutez `http://localhost:5173/**`

### Étape 5 : Créer les tables nécessaires

Dans **SQL Editor**, exécutez ce script pour créer les tables de base :

```sql
-- Table pour les affiliés
CREATE TABLE affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;

-- Policy pour que les utilisateurs ne voient que leurs propres données
CREATE POLICY "Users can view their own affiliate data"
  ON affiliates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own affiliate data"
  ON affiliates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own affiliate data"
  ON affiliates FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Étape 6 : Redémarrer le serveur de développement

```bash
cd frontend
npm run dev
```

## Vérification

Pour vérifier que tout fonctionne :

1. Ouvrez http://localhost:5173
2. Essayez de créer un compte
3. Vérifiez votre email pour confirmer
4. Connectez-vous

## En production

Pour la production (Vercel), ajoutez les variables d'environnement dans :
**Vercel Dashboard** → **Settings** → **Environment Variables**

```
VITE_SUPABASE_URL=https://votre-projet-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key-ici
```

N'oubliez pas de mettre à jour les Redirect URLs dans Supabase pour inclure votre URL de production.
