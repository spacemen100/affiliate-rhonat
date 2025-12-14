# Backend Serverless pour ClickBank

Backend serverless déployable sur Vercel pour l'intégration ClickBank.

## 🚀 Déploiement sur Vercel

### 1. Installation

```bash
cd backend-serverless
npm install
```

### 2. Configuration locale (optionnel)

Créez un fichier `.env` pour tester localement :

```env
CLICKBANK_DEV_KEY=your_dev_key
CLICKBANK_API_KEY=your_api_key
CLICKBANK_CLERK_KEY=your_clerk_key
CLICKBANK_BASE_URL=https://api.clickbank.com
FRONTEND_URL=http://localhost:5173
```

### 3. Test en local

```bash
npm run dev
```

Testez : `http://localhost:3000/api/clickbank/health`

### 4. Déploiement sur Vercel

```bash
vercel
```

Suivez les instructions :
- **Set up and deploy?** Yes
- **Which scope?** Votre compte
- **Link to existing project?** No
- **Project name?** affiliate-clickbank-api
- **Directory?** ./

### 5. Configuration des variables d'environnement

Dans le dashboard Vercel :

1. Allez dans **Settings** > **Environment Variables**
2. Ajoutez :
   - `CLICKBANK_DEV_KEY` = votre dev key
   - `CLICKBANK_API_KEY` = votre api key
   - `CLICKBANK_CLERK_KEY` = votre clerk key
   - `CLICKBANK_BASE_URL` = `https://api.clickbank.com`
   - `FRONTEND_URL` = URL de votre frontend (ex: `https://votre-app.vercel.app`)

### 6. Redéployer

```bash
vercel --prod
```

## 📡 Endpoints disponibles

Une fois déployé, vos endpoints seront :

```
https://votre-backend.vercel.app/api/clickbank/health
https://votre-backend.vercel.app/api/clickbank/orders
https://votre-backend.vercel.app/api/clickbank/products
https://votre-backend.vercel.app/api/clickbank/analytics
```

## 📁 Structure

```
backend-serverless/
├── api/
│   └── clickbank/
│       ├── health.ts       # Health check
│       ├── orders.ts       # Récupérer les commandes
│       ├── products.ts     # Récupérer les produits
│       └── analytics.ts    # Récupérer les analytics
├── lib/
│   ├── clickbank.service.ts  # Service ClickBank
│   └── types.ts              # Types TypeScript
├── vercel.json              # Configuration Vercel
├── package.json
└── tsconfig.json
```

## 🔒 Sécurité

- ✅ CORS configuré avec `FRONTEND_URL`
- ✅ Variables d'environnement sécurisées sur Vercel
- ✅ Pas de clés API dans le code
- ✅ HTTPS automatique

## 🧪 Tester en production

```bash
# Health check
curl https://votre-backend.vercel.app/api/clickbank/health

# Products
curl https://votre-backend.vercel.app/api/clickbank/products

# Orders
curl "https://votre-backend.vercel.app/api/clickbank/orders?startDate=2024-01-01&endDate=2024-12-31"

# Analytics
curl "https://votre-backend.vercel.app/api/clickbank/analytics?startDate=2024-01-01&endDate=2024-12-31"
```

## 🔄 Mettre à jour le frontend

Une fois le backend déployé, mettez à jour la variable d'environnement du frontend :

Dans Vercel (projet frontend) :
- `VITE_API_URL` = `https://votre-backend.vercel.app`

Puis redéployez le frontend.

## 📊 Avantages du serverless

- ✅ Pas de serveur à gérer
- ✅ Scaling automatique
- ✅ Paiement à l'usage
- ✅ HTTPS inclus
- ✅ Déploiement en quelques secondes

## 🐛 Dépannage

### Erreur 500
- Vérifiez les variables d'environnement sur Vercel
- Consultez les logs dans le dashboard Vercel

### Erreur CORS
- Vérifiez que `FRONTEND_URL` correspond exactement à l'URL de votre frontend

### Credentials invalides
- Vérifiez vos clés ClickBank dans les variables d'environnement Vercel

## 📚 Ressources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [ClickBank API](https://api.clickbank.com/rest/1.3/docs)

## 📖 Guides de Déploiement Complets

Pour un guide de déploiement complet et détaillé, consultez :

- **[../DEPLOY_CHECKLIST.md](../DEPLOY_CHECKLIST.md)** - Checklist étape par étape
- **[../PRODUCTION_DEPLOYMENT.md](../PRODUCTION_DEPLOYMENT.md)** - Guide complet
- **[../DEPLOY_QUICK.md](../DEPLOY_QUICK.md)** - Commandes rapides
- **[../START_HERE.md](../START_HERE.md)** - Point de départ

**Déploiement rapide** :
```bash
cd ..
.\deploy.ps1
```
