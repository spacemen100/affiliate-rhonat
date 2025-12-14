# 🌐 Configuration des URLs de Production

## Backend Serverless (Vercel)

**URL de Production** : `https://affiliate-rhonat-ujyn.vercel.app`

### Endpoints Disponibles

- **Health Check** : `https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/health`
- **Orders** : `https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/orders`
- **Products** : `https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/products`
- **Analytics** : `https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/analytics`

## Frontend (À Déployer)

**URL à venir** : `https://ton-frontend.vercel.app`

## Configuration

### Frontend `.env.production`

```env
VITE_API_URL=https://affiliate-rhonat-ujyn.vercel.app
```

### Frontend `.env.local` (pour développement local)

Créer un fichier `frontend/.env.local` avec :

```env
VITE_API_URL=https://affiliate-rhonat-ujyn.vercel.app
```

## Tests Rapides

### Test du Backend

```bash
# Health check
curl https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/health

# Products
curl https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/products

# Orders (avec dates)
curl "https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/orders?startDate=2024-01-01&endDate=2024-12-31"

# Analytics
curl "https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/analytics?startDate=2024-01-01&endDate=2024-12-31"
```

### Test depuis le Frontend Local

1. Créer `frontend/.env.local` :
   ```env
   VITE_API_URL=https://affiliate-rhonat-ujyn.vercel.app
   ```

2. Démarrer le frontend :
   ```bash
   cd frontend
   npm run dev
   ```

3. Ouvrir `http://localhost:5173`

## Prochaines Étapes

### 1. Déployer le Frontend

```bash
cd frontend
vercel --prod
```

### 2. Mettre à Jour FRONTEND_URL dans le Backend

Une fois le frontend déployé, mettre à jour la variable `FRONTEND_URL` dans Vercel :

```bash
cd backend-serverless
vercel env rm FRONTEND_URL production
vercel env add FRONTEND_URL
# Entrer : https://ton-frontend.vercel.app

# Redéployer
vercel --prod
```

## Logs et Monitoring

### Voir les Logs du Backend

```bash
vercel logs https://affiliate-rhonat-ujyn.vercel.app --follow
```

### Dashboard Vercel

Aller sur : [https://vercel.com/dashboard](https://vercel.com/dashboard)

---

**Dernière mise à jour** : Décembre 2024  
**Backend déployé** : ✅ `https://affiliate-rhonat-ujyn.vercel.app`  
**Frontend déployé** : ⏳ À faire
