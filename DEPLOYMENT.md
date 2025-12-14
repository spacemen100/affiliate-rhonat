# 🚀 Guide de Déploiement en Production

## 📋 Options de déploiement

Vous avez **3 options** pour déployer votre intégration ClickBank en production :

### Option 1 : Backend Serverless sur Vercel (RECOMMANDÉ ⭐)
- ✅ Pas de serveur à gérer
- ✅ HTTPS automatique
- ✅ Scaling automatique
- ✅ Même plateforme que le frontend
- ✅ Gratuit jusqu'à un certain volume

### Option 2 : Backend Express sur Railway/Render
- ✅ Utilise le code backend existant
- ✅ Facile à déployer
- ✅ Gratuit (tier limité)

### Option 3 : Backend sur VPS (DigitalOcean, etc.)
- ✅ Contrôle total
- ❌ Plus complexe à gérer

---

## 🌟 OPTION 1 : Backend Serverless sur Vercel (RECOMMANDÉ)

### Architecture en production

```
Frontend Vercel (https://votre-app.vercel.app)
        ↓
Backend Vercel Serverless (https://votre-api.vercel.app/api/clickbank/*)
        ↓
API ClickBank
```

### Structure du projet

```
affiliate-rhonat/
├── frontend/              # Déployé sur Vercel (projet 1)
└── backend-serverless/    # Déployé sur Vercel (projet 2)
    ├── api/
    │   └── clickbank/
    │       ├── health.ts
    │       ├── orders.ts
    │       ├── products.ts
    │       └── analytics.ts
    ├── lib/
    │   ├── clickbank.service.ts
    │   └── types.ts
    ├── vercel.json
    └── package.json
```

### Étapes de déploiement

#### 1. Créer le backend serverless (JE VAIS LE CRÉER POUR VOUS)

#### 2. Déployer le backend sur Vercel

```bash
cd backend-serverless
vercel
```

Suivez les instructions :
- Set up and deploy? **Yes**
- Which scope? **Votre compte**
- Link to existing project? **No**
- Project name? **affiliate-clickbank-api**
- Directory? **./**

#### 3. Configurer les variables d'environnement sur Vercel

Dans le dashboard Vercel du backend :
1. Allez dans **Settings** > **Environment Variables**
2. Ajoutez :
   - `CLICKBANK_DEV_KEY`
   - `CLICKBANK_API_KEY`
   - `CLICKBANK_CLERK_KEY`
   - `CLICKBANK_BASE_URL` = `https://api.clickbank.com`
   - `FRONTEND_URL` = `https://votre-frontend.vercel.app`

#### 4. Déployer le frontend

```bash
cd frontend
vercel
```

#### 5. Configurer la variable d'environnement du frontend

Dans le dashboard Vercel du frontend :
1. **Settings** > **Environment Variables**
2. Ajoutez :
   - `VITE_API_URL` = `https://votre-backend.vercel.app`

#### 6. Redéployer le frontend

```bash
vercel --prod
```

---

## 🚂 OPTION 2 : Backend Express sur Railway

### Étapes

#### 1. Créer un compte sur [Railway.app](https://railway.app)

#### 2. Installer Railway CLI

```bash
npm install -g @railway/cli
```

#### 3. Déployer

```bash
cd backend
railway login
railway init
railway up
```

#### 4. Configurer les variables d'environnement

Dans le dashboard Railway :
- Ajoutez toutes les variables de `.env`

#### 5. Obtenir l'URL du backend

Railway vous donnera une URL comme : `https://votre-app.railway.app`

#### 6. Configurer le frontend

Dans Vercel, ajoutez :
- `VITE_API_URL` = `https://votre-app.railway.app`

---

## 🖥️ OPTION 3 : VPS (DigitalOcean, etc.)

### Étapes simplifiées

1. **Créer un VPS** (Ubuntu 22.04)
2. **Installer Node.js**
3. **Cloner le repo**
4. **Installer PM2** pour gérer le processus
5. **Configurer Nginx** comme reverse proxy
6. **Configurer SSL** avec Let's Encrypt

Cette option est plus avancée. Consultez la documentation complète si nécessaire.

---

## 📊 Comparaison des options

| Critère | Vercel Serverless | Railway | VPS |
|---------|-------------------|---------|-----|
| **Facilité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Coût (petit volume)** | Gratuit | Gratuit | ~$5/mois |
| **Scaling** | Auto | Auto | Manuel |
| **Maintenance** | Aucune | Minimale | Importante |
| **HTTPS** | Auto | Auto | Manuel |
| **Recommandé pour** | Débutants | Intermédiaires | Avancés |

---

## 🎯 Ma recommandation

**Pour votre cas ClickBank : Option 1 (Vercel Serverless)**

Pourquoi ?
- ✅ Vous utilisez déjà Vercel pour le frontend
- ✅ Pas de serveur à gérer
- ✅ Gratuit pour commencer
- ✅ Scaling automatique si vous avez du succès
- ✅ HTTPS et domaine inclus

---

## 🔐 Sécurité en production

### Checklist

- [ ] Variables d'environnement configurées sur Vercel (pas dans le code)
- [ ] CORS configuré avec l'URL exacte du frontend
- [ ] `.env` dans `.gitignore`
- [ ] HTTPS activé (automatique sur Vercel)
- [ ] Rate limiting activé (optionnel mais recommandé)

### Configuration CORS en production

Dans votre backend, mettez l'URL exacte du frontend :

```typescript
// Pour Vercel Serverless
const allowedOrigins = [
  'https://votre-frontend.vercel.app',
  'https://votre-domaine.com', // si vous avez un domaine custom
];
```

---

## 🧪 Tester en production

### 1. Tester le backend

```bash
curl https://votre-backend.vercel.app/api/clickbank/health
```

### 2. Tester depuis le frontend

Ouvrez la console du navigateur sur votre frontend en production et vérifiez qu'il n'y a pas d'erreurs CORS.

---

## 📝 Checklist de déploiement

### Backend
- [ ] Code déployé sur Vercel/Railway
- [ ] Variables d'environnement configurées
- [ ] Health check fonctionne
- [ ] CORS configuré avec l'URL du frontend

### Frontend
- [ ] Code déployé sur Vercel
- [ ] `VITE_API_URL` pointe vers le backend en production
- [ ] Pas d'erreurs dans la console
- [ ] Les données s'affichent correctement

---

## 🆘 Problèmes courants en production

### Erreur CORS
**Cause :** URL du frontend mal configurée dans le backend  
**Solution :** Vérifiez `FRONTEND_URL` dans les variables d'environnement du backend

### 500 Internal Server Error
**Cause :** Variables d'environnement manquantes  
**Solution :** Vérifiez que toutes les variables sont configurées sur Vercel

### Credentials ClickBank invalides
**Cause :** Mauvaise copie des clés  
**Solution :** Re-copiez les clés depuis votre compte ClickBank

---

## 🎉 Après le déploiement

Une fois en production, vous pouvez :

1. **Configurer un domaine custom** sur Vercel
2. **Monitorer les performances** avec Vercel Analytics
3. **Ajouter des logs** pour le debugging
4. **Mettre en place des alertes** en cas d'erreur

---

**Je vais maintenant créer le backend serverless pour vous ! 🚀**
