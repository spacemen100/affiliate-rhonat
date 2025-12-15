# Architecture ClickBank - Frontend

## 🎯 Vue d'ensemble

Le frontend utilise **uniquement** le backend déployé sur Vercel pour toutes les interactions avec l'API ClickBank. Aucun appel direct n'est effectué vers `api.clickbank.com` depuis le navigateur.

## 🔗 Backend Déployé

**URL de production** : https://affiliate-rhonat-delta.vercel.app

**Endpoints disponibles** :
- `GET /api/clickbank/health` - Vérification de l'état du backend
- `GET /api/clickbank/orders` - Récupération des commandes
- `GET /api/clickbank/analytics` - Analytics agrégées
- `GET /api/clickbank/products` - Liste des produits

## 📁 Structure des fichiers API

### Fichiers principaux

1. **`src/api/clickbank.ts`** ⭐
   - Service principal pour les interactions ClickBank
   - Gère : orders, analytics, affiliate links
   - Utilise des chemins relatifs `/api/clickbank/*`
   - Profite du proxy Vite en développement

2. **`src/api/clickbank-backend.ts`** ⭐
   - Service pour les endpoints backend spécifiques
   - Endpoints : `/api/clickbank/orders`, `/api/clickbank/analytics`
   - Retourne des données agrégées (ventes, CA, commissions)

### Fichiers supprimés (doublons)

- ❌ `clickbank.api.ts` - Supprimé (doublon)
- ❌ `clickbank-example.ts` - Supprimé (code d'exemple)

## 🔄 Flux de données

```
┌─────────────────┐
│   Composant     │
│   ClickBank     │
└────────┬────────┘
         │
         ├─────────────────────────────────────┐
         │                                     │
         v                                     v
┌────────────────────┐              ┌──────────────────────┐
│  clickbank.ts      │              │ clickbank-backend.ts │
│                    │              │                      │
│ - getOrders()      │              │ - fetchBackendOrders()│
│ - getClicksAnalytics()│           │ - fetchBackendAnalytics()│
│ - createAffiliateLink()│          │                      │
└────────┬───────────┘              └──────────┬───────────┘
         │                                     │
         │ /api/clickbank/*                    │ /api/clickbank/*
         │                                     │
         └─────────────────┬───────────────────┘
                           │
                           v
                  ┌────────────────┐
                  │  Vite Proxy    │ (dev uniquement)
                  │  vite.config.ts│
                  └────────┬───────┘
                           │
                           │ Redirige vers
                           v
         ┌──────────────────────────────────────┐
         │  Backend Vercel                      │
         │  https://affiliate-rhonat-delta      │
         │         .vercel.app                  │
         │                                      │
         │  /api/clickbank/orders               │
         │  /api/clickbank/analytics            │
         │  /api/clickbank/products             │
         └──────────────┬───────────────────────┘
                        │
                        │ Appels authentifiés
                        v
              ┌─────────────────────┐
              │   API ClickBank     │
              │ api.clickbank.com   │
              └─────────────────────┘
```

## 🛠️ Configuration

### Développement (Vite Proxy)

Le fichier `vite.config.ts` configure un proxy qui redirige automatiquement toutes les requêtes `/api/*` vers le backend Vercel :

```typescript
proxy: {
  '/api': {
    target: 'https://affiliate-rhonat-delta.vercel.app',
    changeOrigin: true,
    secure: true,
  }
}
```

**Avantages** :
- ✅ Pas de problèmes CORS en développement
- ✅ Même comportement qu'en production
- ✅ Aucun serveur local nécessaire
- ✅ Clés API sécurisées (jamais exposées au navigateur)

### Production (Vercel)

En production, les requêtes `/api/clickbank/*` sont directement servies par Vercel sans proxy.

## 📦 Composants ClickBank

### Page principale
- **`src/pages/ClickBank.tsx`**
  - Interface complète pour gérer ClickBank
  - Formulaire de configuration des clés API
  - Tests de connexion
  - Récupération des ventes
  - Statistiques de clics
  - Création de liens d'affiliation

### Composants réutilisables

1. **`BackendAnalyticsSummary.tsx`** ⭐
   - Résumé des ventes et CA via le backend
   - Utilise `clickbank-backend.ts`
   - Affiche : nombre de ventes, CA total, commissions

2. **`VendorAnalyticsPlayground.tsx`**
   - Interface pour tester les analytics par vendor
   - Génère des requêtes cURL pour référence
   - Utilise `clickbank.ts`

3. **`OrdersSummary.tsx`**
   - Affiche un résumé des commandes récupérées
   - Calcule les totaux par type et rôle

4. **`ClickbankRequestPreview.tsx`**
   - Prévisualisation des requêtes cURL
   - Documentation intégrée

## 🔑 Gestion des clés API

Les clés API ClickBank sont :
- ✅ Stockées localement dans le state React (session uniquement)
- ✅ Envoyées au backend via l'en-tête `Authorization`
- ✅ **Jamais** exposées dans le code frontend
- ⚠️ Pour la production, migrer vers Supabase ou un vault sécurisé

### Format des clés

```typescript
{
  nickname: string;        // UUID de l'influenceur (pour HopLinks)
  developerKey: string;    // API-XXXXXXXXXX
}
```

## 🚀 Déploiement

### Backend (Vercel)

Le backend est déjà déployé :
- URL : https://affiliate-rhonat-delta.vercel.app
- Root Directory : `backend`
- Framework : Node.js (Serverless Functions)

### Frontend (Vercel)

Pour déployer le frontend :

```bash
cd frontend
vercel --prod
```

Configuration Vercel :
- Root Directory : `frontend`
- Build Command : `npm run build`
- Output Directory : `dist`

## 📝 Variables d'environnement

### Frontend (.env.local)

```bash
# Supabase (pour l'authentification)
VITE_SUPABASE_URL=https://etkeimmyqfangzyrajqx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Pas besoin de VITE_CLICKBANK_BACKEND_URL car on utilise des chemins relatifs
```

### Backend (Vercel)

Les clés API ClickBank sont passées dynamiquement via les en-têtes HTTP, donc aucune variable d'environnement n'est nécessaire côté backend pour les clés.

## ✅ Checklist de vérification

Avant de déployer en production :

- [x] Backend déployé sur Vercel
- [x] Proxy Vite configuré pour le développement
- [x] Tous les composants utilisent `clickbank.ts` ou `clickbank-backend.ts`
- [x] Fichiers doublons supprimés
- [x] Clés API jamais exposées dans le code
- [ ] Migration vers stockage sécurisé (Supabase/Vault)
- [ ] Configuration des webhooks ClickBank
- [ ] Mapping des produits ClickBank vers produits internes
- [ ] Tâche CRON pour synchronisation automatique

## 🐛 Dépannage

### Erreur "Failed to fetch"

**Cause** : Le proxy Vite ne peut pas atteindre le backend Vercel

**Solution** :
1. Vérifier que le backend est accessible : https://affiliate-rhonat-delta.vercel.app/api/clickbank/health
2. Redémarrer le serveur de développement : `npm run dev`

### Erreur CORS

**Cause** : Appel direct vers `api.clickbank.com` au lieu du backend

**Solution** :
- Vérifier que tous les appels utilisent `/api/clickbank/*` (chemins relatifs)
- Ne jamais appeler directement `https://api.clickbank.com`

### Erreur 401 Unauthorized

**Cause** : Clé API invalide ou manquante

**Solution** :
1. Vérifier que la clé API est correctement saisie
2. Vérifier le format : `API-XXXXXXXXXX`
3. Créer une nouvelle clé sur https://accounts.clickbank.com/developer-api-keys

## 📚 Documentation supplémentaire

- [README ClickBank](./README.clickbank.md) - Guide d'intégration
- [Configuration Backend](./BACKEND_CONFIG.md) - Configuration du backend
- [Intégration Summary](./CLICKBANK_INTEGRATION_SUMMARY.md) - Résumé de l'intégration
