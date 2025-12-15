# 🎯 Intégration ClickBank - Guide Complet

## ✅ État actuel

Le frontend est maintenant **entièrement configuré** pour utiliser le backend déployé sur Vercel :

- ✅ Backend déployé : https://affiliate-rhonat-delta.vercel.app
- ✅ Proxy Vite configuré pour le développement
- ✅ Tous les composants utilisent le backend via `/api/clickbank`
- ✅ Fichiers doublons supprimés
- ✅ Configuration centralisée créée
- ✅ Code optimisé et maintenable

## 🚀 Démarrage rapide

### 1. Développement local

```bash
cd frontend
npm install
npm run dev
```

Le serveur de développement démarre sur `http://localhost:5173`

**Aucun serveur backend local n'est nécessaire** - le proxy Vite redirige automatiquement toutes les requêtes `/api/*` vers le backend Vercel.

### 2. Accéder à la page ClickBank

Une fois le serveur démarré, naviguez vers :
- **URL** : http://localhost:5173
- **Menu** : Cliquez sur "ClickBank" dans la sidebar

### 3. Configuration des clés API

1. Allez sur https://accounts.clickbank.com/developer-api-keys
2. Créez une nouvelle clé API Developer
3. Copiez la clé (format : `API-XXXXXXXXXX`)
4. Collez-la dans le formulaire "Identifiants API" sur la page ClickBank

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── api/
│   │   ├── clickbank.ts              ⭐ Service principal ClickBank
│   │   └── clickbank-backend.ts      ⭐ Service backend spécifique
│   ├── components/
│   │   └── clickbank/
│   │       ├── BackendAnalyticsSummary.tsx    ⭐ Résumé ventes/CA
│   │       ├── VendorAnalyticsPlayground.tsx  📊 Playground analytics
│   │       ├── OrdersSummary.tsx              📋 Résumé commandes
│   │       └── ClickbankRequestPreview.tsx    📝 Prévisualisation cURL
│   ├── config/
│   │   └── clickbank.config.ts       ⭐ Configuration centralisée
│   └── pages/
│       └── ClickBank.tsx             ⭐ Page principale
├── vite.config.ts                    ⚙️ Configuration proxy
├── CLICKBANK_ARCHITECTURE.md         📚 Documentation architecture
└── CLICKBANK_INTEGRATION.md          📚 Ce fichier
```

## 🔄 Architecture

```
┌──────────────┐
│  Navigateur  │
└──────┬───────┘
       │ Requête /api/clickbank/*
       v
┌──────────────┐
│ Vite Proxy   │ (dev uniquement)
│ Port 5173    │
└──────┬───────┘
       │ Redirige vers
       v
┌─────────────────────────────────┐
│  Backend Vercel                 │
│  affiliate-rhonat-delta         │
│  .vercel.app                    │
│                                 │
│  /api/clickbank/health          │
│  /api/clickbank/orders          │
│  /api/clickbank/analytics       │
│  /api/clickbank/products        │
└──────┬──────────────────────────┘
       │ Appels authentifiés
       v
┌─────────────────┐
│  API ClickBank  │
│ api.clickbank   │
│     .com        │
└─────────────────┘
```

## 🛠️ Fonctionnalités disponibles

### 1. Test de connexion
- Vérifie que votre clé API est valide
- Affiche le JSON de réponse brut

### 2. Résumé backend (Analytics)
- Nombre de ventes sur une période
- Chiffre d'affaires total
- Commissions (si disponibles)
- **Utilise** : `/api/clickbank/orders` et `/api/clickbank/analytics`

### 3. Récupération des ventes
- Filtres : dates, rôle, vendor, type, tracking ID
- Affiche tous les détails des commandes
- **Utilise** : `/api/clickbank/orders`

### 4. Statistiques de clics
- Analytics par Tracking ID ou Vendor
- Métriques : HOP_COUNT, SALE_COUNT, etc.
- **Utilise** : `/api/clickbank/analytics`

### 5. Création de liens d'affiliation
- Génère des HopLinks ClickBank
- Format : `https://[AFFILIATE].[VENDOR].hop.clickbank.net/?tid=[TID]`
- Aucun appel API nécessaire (construction locale)

### 6. Playground Analytics Vendor
- Interface interactive pour tester les requêtes analytics
- Génère des exemples cURL
- **Utilise** : `/api/clickbank/analytics`

## 📝 Exemples d'utilisation

### Récupérer les ventes

```typescript
import { getOrders } from './api/clickbank';

const orders = await getOrders(
  { apiKey: 'API-XXXXXXXXXX' },
  {
    startDate: '2025-12-01',
    endDate: '2025-12-15',
    role: 'AFFILIATE',
    vendor: 'freenzy'
  }
);

console.log(`${orders.orders.length} commandes récupérées`);
```

### Récupérer les analytics

```typescript
import { getClicksAnalytics } from './api/clickbank';

const analytics = await getClicksAnalytics(
  { apiKey: 'API-XXXXXXXXXX' },
  {
    startDate: '2025-12-01',
    endDate: '2025-12-15',
    dimension: 'vendor',
    account: 'freenzy',
    select: 'HOP_COUNT,SALE_COUNT'
  }
);

console.log(analytics.data);
```

### Utiliser le backend pour les résumés

```typescript
import { fetchBackendAnalytics } from './api/clickbank-backend';

const summary = await fetchBackendAnalytics({
  startDate: '2025-12-01',
  endDate: '2025-12-15'
});

console.log(`Ventes: ${summary.data.totalOrders}`);
console.log(`CA: ${summary.data.totalSales}`);
console.log(`Commissions: ${summary.data.totalCommissions}`);
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` :

```bash
# Supabase (pour l'authentification)
VITE_SUPABASE_URL=https://etkeimmyqfangzyrajqx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Pas besoin de VITE_CLICKBANK_BACKEND_URL
# Le proxy Vite gère automatiquement la redirection
```

### Proxy Vite (vite.config.ts)

Le proxy est déjà configuré :

```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://affiliate-rhonat-delta.vercel.app',
      changeOrigin: true,
      secure: true,
    }
  }
}
```

## 🚢 Déploiement

### Frontend sur Vercel

```bash
cd frontend
vercel --prod
```

**Configuration Vercel** :
- Root Directory : `frontend`
- Build Command : `npm run build`
- Output Directory : `dist`
- Framework Preset : Vite

### Backend (déjà déployé)

Le backend est déjà en production :
- URL : https://affiliate-rhonat-delta.vercel.app
- Root Directory : `backend`
- Framework : Node.js (Serverless)

## 🐛 Dépannage

### Erreur "Failed to fetch"

**Cause** : Le proxy ne peut pas atteindre le backend

**Solution** :
1. Vérifier que le backend est accessible : https://affiliate-rhonat-delta.vercel.app/api/clickbank/health
2. Redémarrer le serveur : `npm run dev`

### Erreur 401 Unauthorized

**Cause** : Clé API invalide

**Solution** :
1. Vérifier le format : `API-XXXXXXXXXX`
2. Créer une nouvelle clé sur https://accounts.clickbank.com/developer-api-keys

### Erreur CORS

**Cause** : Appel direct vers api.clickbank.com

**Solution** :
- Toujours utiliser `/api/clickbank/*` (chemins relatifs)
- Ne jamais appeler directement `https://api.clickbank.com`

## 📚 Documentation

- [Architecture détaillée](./CLICKBANK_ARCHITECTURE.md)
- [Configuration backend](./BACKEND_CONFIG.md)
- [Résumé de l'intégration](./CLICKBANK_INTEGRATION_SUMMARY.md)

## ✅ Checklist de production

- [x] Backend déployé sur Vercel
- [x] Proxy Vite configuré
- [x] Tous les composants utilisent le backend
- [x] Fichiers doublons supprimés
- [x] Configuration centralisée
- [ ] Migration vers stockage sécurisé (Supabase)
- [ ] Configuration des webhooks ClickBank
- [ ] Mapping produits ClickBank ↔ produits internes
- [ ] Tâche CRON pour synchronisation automatique

## 🎉 Prochaines étapes

1. **Sécuriser les clés API**
   - Migrer vers Supabase ou un vault sécurisé
   - Ne plus stocker les clés dans le state React

2. **Automatiser la synchronisation**
   - Configurer une tâche CRON
   - Récupérer automatiquement les ventes et rebills

3. **Configurer les webhooks**
   - Recevoir les notifications en temps réel
   - Mettre à jour automatiquement la base de données

4. **Mapper les produits**
   - Associer les produits ClickBank aux produits internes
   - Gérer les SKU et IDs

## 💡 Support

Pour toute question ou problème :
1. Consultez la documentation dans `CLICKBANK_ARCHITECTURE.md`
2. Vérifiez les logs du backend : https://vercel.com/dashboard
3. Testez les endpoints directement : https://affiliate-rhonat-delta.vercel.app/api/clickbank/health
