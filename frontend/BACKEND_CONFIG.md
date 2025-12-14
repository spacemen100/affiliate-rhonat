# Configuration Frontend - Backend Production

## ⚙️ Configuration Rapide

Pour utiliser le backend de production déjà déployé :

### 1. Créer le fichier `.env.local`

Dans le dossier `frontend/`, créer un fichier `.env.local` :

```bash
cd frontend
echo "VITE_API_URL=https://affiliate-rhonat-ujyn.vercel.app" > .env.local
```

Ou créer manuellement le fichier `frontend/.env.local` avec :

```env
VITE_API_URL=https://affiliate-rhonat-ujyn.vercel.app
```

### 2. Démarrer le Frontend

```bash
npm run dev
```

### 3. Tester

Ouvrir `http://localhost:5173` et vérifier que les données ClickBank se chargent.

## ✅ Vérification

Le frontend devrait maintenant communiquer avec le backend de production :

- **Backend** : `https://affiliate-rhonat-ujyn.vercel.app`
- **Frontend Local** : `http://localhost:5173`

## 🚀 Déployer le Frontend

Une fois que tout fonctionne localement :

```bash
cd frontend
vercel --prod
```

## 📝 Note

Le fichier `.env.local` est ignoré par Git (dans `.gitignore`), donc tu dois le créer manuellement sur chaque machine de développement.
