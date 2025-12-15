# 🔄 URLs Mises à Jour - Configuration Finale

## 📊 Résumé des URLs

### **Frontend (Application Principale)**
- **URL de Production:** `https://affiliate-rhonat-3c2b.vercel.app`
- **Projet Vercel:** `affiliate-rhonat-3c2b`
- **Rôle:** Interface utilisateur, dashboard, gestion des liens affiliés

### **Backend ClickBank (API)**
- **URL de Production:** `https://affiliate-rhonat-delta.vercel.app`
- **Projet Vercel:** `affiliate-rhonat-delta`
- **Rôle:** Proxy pour l'API ClickBank, récupération des commandes et analytics

---

## ✅ Fichiers Mis à Jour

### **1. Configuration Frontend**

#### `frontend/.env.example`
```env
# Backend API URL (ClickBank)
VITE_API_URL=https://affiliate-rhonat-delta.vercel.app

# Supabase
VITE_SUPABASE_URL=https://etkeimmyqfangzyrajqx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# URL de base pour les liens de redirection affiliés
VITE_BASE_GO_URL=https://affiliate-rhonat-3c2b.vercel.app/go
```

#### `frontend/src/pages/Links.tsx`
```typescript
const BASE_GO_URL =
  import.meta.env.VITE_BASE_GO_URL?.replace(/\/$/, '') ??
  'https://affiliate-rhonat-3c2b.vercel.app/go';
```

#### `frontend/src/pages/LinkDetails.tsx`
```typescript
const BASE_GO_URL =
  import.meta.env.VITE_BASE_GO_URL?.replace(/\/$/, '') ?? 
  'https://affiliate-rhonat-3c2b.vercel.app/go';
```

#### `frontend/vite.config.ts`
```typescript
proxy: {
  '/api': {
    target: 'https://affiliate-rhonat-delta.vercel.app',
    changeOrigin: true,
    secure: true,
  }
}
```

---

## 🔧 Variables d'Environnement Vercel

### **Frontend (`affiliate-rhonat-3c2b`)**

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `VITE_API_URL` | `https://affiliate-rhonat-delta.vercel.app` | Production, Preview, Development |
| `VITE_SUPABASE_URL` | `https://etkeimmyqfangzyrajqx.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` | Production, Preview, Development |
| `VITE_BASE_GO_URL` | `https://affiliate-rhonat-3c2b.vercel.app/go` | Production, Preview, Development |

### **Backend ClickBank (`affiliate-rhonat-delta`)**

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `CLICKBANK_DEV_KEY` | `API-KM27...` | Production, Preview, Development |
| `CLICKBANK_API_KEY` | `KM27URM...` | Production, Preview, Development |
| `CLICKBANK_BASE_URL` | `https://api.clickbank.com` | Production, Preview, Development |
| `FRONTEND_URL` | `https://affiliate-rhonat-3c2b.vercel.app` | Production, Preview, Development |

---

## 🌐 Architecture des Requêtes

### **En Développement (localhost:5173)**
```
Frontend (localhost:5173)
    ↓ /api/clickbank/*
Vite Proxy
    ↓
Backend ClickBank (affiliate-rhonat-delta.vercel.app)
    ↓
ClickBank API (api.clickbank.com)
```

### **En Production**
```
Frontend (affiliate-rhonat-3c2b.vercel.app)
    ↓ /api/clickbank/*
Backend ClickBank (affiliate-rhonat-delta.vercel.app)
    ↓
ClickBank API (api.clickbank.com)
```

---

## 🔗 Endpoints Disponibles

### **Backend ClickBank**

| Endpoint | URL Complète | Description |
|----------|-------------|-------------|
| Health Check | `https://affiliate-rhonat-delta.vercel.app/api/clickbank/health` | Vérifier l'état du backend |
| Orders | `https://affiliate-rhonat-delta.vercel.app/api/clickbank/orders` | Récupérer les commandes |
| Analytics | `https://affiliate-rhonat-delta.vercel.app/api/clickbank/analytics` | Récupérer les analytics |
| Products | `https://affiliate-rhonat-delta.vercel.app/api/clickbank/products` | Liste des produits |

### **Frontend**

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `https://affiliate-rhonat-3c2b.vercel.app/` | Page d'accueil |
| ClickBank | `https://affiliate-rhonat-3c2b.vercel.app/clickbank` | Dashboard ClickBank |
| Liens Affiliés | `https://affiliate-rhonat-3c2b.vercel.app/links` | Gestion des liens |
| Redirection | `https://affiliate-rhonat-3c2b.vercel.app/go/CODE` | Redirection affiliée |

---

## 🧪 Tests de Vérification

### **1. Tester le Backend ClickBank**

```powershell
# Health Check
Invoke-RestMethod -Uri "https://affiliate-rhonat-delta.vercel.app/api/clickbank/health"

# Devrait retourner:
# {
#   "status": "ok",
#   "message": "ClickBank API is reachable"
# }
```

### **2. Tester le Frontend**

```powershell
# Ouvrir dans le navigateur
Start-Process "https://affiliate-rhonat-3c2b.vercel.app"
```

### **3. Tester un Lien Affilié**

1. Allez sur: `https://affiliate-rhonat-3c2b.vercel.app/links`
2. Créez un nouveau lien
3. Vérifiez que l'URL générée commence par: `https://affiliate-rhonat-3c2b.vercel.app/go/...`

---

## 📝 Prochaines Étapes

### **1. Mettre à Jour les Variables sur Vercel**

#### Frontend (`affiliate-rhonat-3c2b`)
```powershell
cd frontend
vercel env add VITE_BASE_GO_URL production
# Entrez: https://affiliate-rhonat-3c2b.vercel.app/go

vercel env rm VITE_API_URL production
vercel env add VITE_API_URL production
# Entrez: https://affiliate-rhonat-delta.vercel.app
```

#### Backend ClickBank (`affiliate-rhonat-delta`)
```powershell
cd backend-serverless
vercel env rm FRONTEND_URL production
vercel env add FRONTEND_URL production
# Entrez: https://affiliate-rhonat-3c2b.vercel.app
```

### **2. Redéployer**

```powershell
# Frontend
cd frontend
vercel --prod

# Backend (si nécessaire)
cd ../backend-serverless
vercel --prod
```

---

## ✅ Checklist de Vérification

- [x] URLs mises à jour dans le code source
- [ ] Variables d'environnement mises à jour sur Vercel (Frontend)
- [ ] Variables d'environnement mises à jour sur Vercel (Backend)
- [ ] Frontend redéployé
- [ ] Backend redéployé (si nécessaire)
- [ ] Tests de santé réussis
- [ ] Génération de liens affiliés testée
- [ ] Redirection de liens testée

---

## 🆘 En Cas de Problème

### **Erreur 404 sur ClickBank**
- Vérifiez que `CLICKBANK_DEV_KEY` et `CLICKBANK_API_KEY` sont configurées
- Testez: `https://affiliate-rhonat-delta.vercel.app/api/clickbank/health`

### **CORS Errors**
- Vérifiez que `FRONTEND_URL` est bien configurée sur le backend
- Valeur attendue: `https://affiliate-rhonat-3c2b.vercel.app`

### **Liens Affiliés Incorrects**
- Vérifiez que `VITE_BASE_GO_URL` est configurée
- Valeur attendue: `https://affiliate-rhonat-3c2b.vercel.app/go`

---

## 📚 Résumé

**Frontend:** `https://affiliate-rhonat-3c2b.vercel.app`  
**Backend ClickBank:** `https://affiliate-rhonat-delta.vercel.app`  
**Liens Affiliés:** `https://affiliate-rhonat-3c2b.vercel.app/go/CODE`

Tous les fichiers de code ont été mis à jour avec les bonnes URLs ! 🎉

Il reste à mettre à jour les variables d'environnement sur Vercel et redéployer.
