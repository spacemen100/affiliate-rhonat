# ✅ Vérification des Variables d'Environnement

## 📊 Résumé de Configuration

### **Frontend (affiliate-rhonat-ujyn.vercel.app)**

| Variable | Statut | Valeur Actuelle | Notes |
|----------|--------|-----------------|-------|
| `VITE_API_URL` | ✅ Configurée | `https://affiliate-rhonat-ujyn.vercel.app` | Backend principal |
| `VITE_SUPABASE_URL` | ✅ Configurée | `https://etkeimmyqfangzyrajqx.supabase.co` | Base de données |
| `VITE_SUPABASE_ANON_KEY` | ✅ Configurée | `eyJhbGc...` | Clé d'authentification |
| `VITE_BASE_GO_URL` | ⚠️ **MANQUANTE** | - | **URL pour les liens affiliés** |

### **Backend ClickBank (affiliate-rhonat-delta.vercel.app)**

| Variable | Statut | Valeur | Notes |
|----------|--------|--------|-------|
| `CLICKBANK_DEV_KEY` | ✅ Configurée | `API-KM27...` | Clé développeur ClickBank |
| `CLICKBANK_API_KEY` | ✅ Configurée | `KM27URM...` | Clé API ClickBank |
| `CLICKBANK_BASE_URL` | ✅ Configurée | `https://api.clickbank.com` | URL de l'API ClickBank |
| `FRONTEND_URL` | ✅ Configurée | `https://affiliate-rhonat-ujyn.vercel.app` | Pour CORS |

---

## ⚠️ Variable Manquante Importante

### `VITE_BASE_GO_URL` (Frontend)

**Utilisée dans:**
- `frontend/src/pages/Links.tsx` (ligne 14)
- `frontend/src/pages/LinkDetails.tsx` (ligne 7)

**Objectif:**
Cette variable définit l'URL de base pour les liens de redirection affiliés (ex: `https://votre-site.com/go/CODE123`)

**Valeur par défaut actuelle:**
```typescript
const BASE_GO_URL = import.meta.env.VITE_BASE_GO_URL?.replace(/\/$/, '') ?? 
  'https://affiliate-rhonat.vercel.app/go';
```

**Recommandation:**
Ajoutez cette variable sur Vercel pour le frontend avec la valeur appropriée :

```
VITE_BASE_GO_URL=https://affiliate-rhonat-ujyn.vercel.app/go
```

Ou si vous avez un domaine personnalisé pour les redirections :
```
VITE_BASE_GO_URL=https://votre-domaine.com/go
```

---

## 🔧 Comment Ajouter la Variable Manquante

### Option 1: Via Vercel Dashboard

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez le projet **frontend** (`affiliate-rhonat-ujyn`)
3. Settings → Environment Variables
4. Cliquez sur "Add New"
5. Ajoutez:
   - **Name**: `VITE_BASE_GO_URL`
   - **Value**: `https://affiliate-rhonat-ujyn.vercel.app/go`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
6. Cliquez sur "Save"
7. Redéployez le frontend

### Option 2: Via Vercel CLI

```powershell
cd frontend
vercel env add VITE_BASE_GO_URL production
# Entrez: https://affiliate-rhonat-ujyn.vercel.app/go

vercel env add VITE_BASE_GO_URL preview
# Entrez: https://affiliate-rhonat-ujyn.vercel.app/go

vercel env add VITE_BASE_GO_URL development
# Entrez: http://localhost:5173/go
![alt text](image-2.png)
![alt text](image-3.png)
vercel --prod
```

### Option 3: Ajouter au fichier .env local

Pour le développement local, ajoutez dans `frontend/.env`:

```env
VITE_BASE_GO_URL=http://localhost:5173/go
```

---

## 📝 Fichiers à Mettre à Jour

### `frontend/.env.example`

Ajoutez cette ligne:

```env
# Backend API URL
VITE_API_URL=https://affiliate-rhonat-ujyn.vercel.app
VITE_SUPABASE_URL=https://etkeimmyqfangzyrajqx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0a2VpbW15cWZhbmd6eXJhanF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDgxNjksImV4cCI6MjA4MDE4NDE2OX0.TF4TBcnrbNVLdZSQEnrOE6xCSE1KGHd4WGX-1rGoBdc

# URL de base pour les liens de redirection affiliés
VITE_BASE_GO_URL=https://affiliate-rhonat-ujyn.vercel.app/go
```

---

## ✅ Checklist Complète

### Frontend
- [x] `VITE_API_URL` - Configurée
- [x] `VITE_SUPABASE_URL` - Configurée
- [x] `VITE_SUPABASE_ANON_KEY` - Configurée
- [ ] **`VITE_BASE_GO_URL` - À AJOUTER**

### Backend ClickBank
- [x] `CLICKBANK_DEV_KEY` - Configurée
- [x] `CLICKBANK_API_KEY` - Configurée
- [x] `CLICKBANK_BASE_URL` - Configurée
- [x] `FRONTEND_URL` - Configurée

---

## 🎯 Impact de la Variable Manquante

**Sans `VITE_BASE_GO_URL`:**
- ✅ L'application fonctionne (valeur par défaut utilisée)
- ⚠️ Les liens générés utilisent `https://affiliate-rhonat.vercel.app/go` au lieu de votre domaine actuel
- ⚠️ Peut causer des problèmes si le domaine par défaut n'existe pas ou est différent

**Avec `VITE_BASE_GO_URL`:**
- ✅ Contrôle total sur l'URL des liens affiliés
- ✅ Cohérence entre environnements (dev/prod)
- ✅ Facilite le changement de domaine futur

---

## 🚀 Prochaines Étapes

1. **Ajoutez `VITE_BASE_GO_URL`** sur Vercel (frontend)
2. **Mettez à jour `.env.example`** pour documenter toutes les variables
3. **Testez** la génération de liens affiliés après redéploiement
4. **Vérifiez** que les redirections `/go/CODE` fonctionnent correctement

---

## 📚 Résumé

**Variables configurées:** 7/8 (87.5%)  
**Variables manquantes:** 1 (`VITE_BASE_GO_URL`)  
**Criticité:** ⚠️ Moyenne (l'app fonctionne mais avec une valeur par défaut)

Toutes les variables essentielles pour ClickBank sont correctement configurées ! ✅  
Il ne manque que `VITE_BASE_GO_URL` pour une configuration 100% complète.
