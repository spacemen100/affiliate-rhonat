# 🌐 Alternatives de Déploiement Backend

Si tu ne veux pas utiliser Vercel pour le backend, voici d'autres options.

---

## ✅ Option 1 : Vercel Serverless (RECOMMANDÉ)

**👍 Avantages**
- ✅ Gratuit pour commencer
- ✅ Scaling automatique
- ✅ HTTPS automatique
- ✅ Même plateforme que le frontend
- ✅ Pas de serveur à gérer
- ✅ Variables d'env sécurisées

**👎 Inconvénients**
- ❌ Cold starts (première requête peut être lente)
- ❌ Limites du plan gratuit (100 GB-Hrs/mois)

**💰 Coût** : Gratuit jusqu'à 100 GB-Hrs/mois

**📚 Documentation** : Voir `PRODUCTION_DEPLOYMENT.md`

---

## Option 2 : Railway.app

**Description** : Plateforme PaaS moderne, très simple

### Déploiement

```bash
# Installer Railway CLI
npm i -g @railway/cli

# Se connecter
railway login

# Depuis le dossier backend-serverless
cd backend-serverless

# Initialiser
railway init

# Ajouter les variables d'env
railway variables set CLICKBANK_DEV_KEY=ta-clé
railway variables set CLICKBANK_API_KEY=ta-clé
railway variables set CLICKBANK_CLERK_KEY=ta-clé
railway variables set CLICKBANK_BASE_URL=https://api.clickbank.com
railway variables set FRONTEND_URL=https://ton-frontend.vercel.app

# Déployer
railway up
```

**👍 Avantages**
- ✅ Très simple
- ✅ Pas de cold starts
- ✅ Base de données incluse si besoin
- ✅ Logs en temps réel

**👎 Inconvénients**
- ❌ Payant après 5$/mois de crédit gratuit

**💰 Coût** : 5$/mois gratuit, puis ~5-10$/mois

---

## Option 3 : Render.com

**Description** : Alternative à Heroku, gratuit pour commencer

### Déploiement

1. Créer un compte sur [render.com](https://render.com)
2. Créer un nouveau **Web Service**
3. Connecter ton repo GitHub
4. Configurer :
   - **Root Directory** : `backend-serverless`
   - **Build Command** : `npm install`
   - **Start Command** : `node api/index.js` (il faudra adapter)
5. Ajouter les variables d'environnement
6. Déployer

**⚠️ Note** : Render ne supporte pas nativement les serverless functions Vercel, il faudrait convertir en Express classique.

**👍 Avantages**
- ✅ Plan gratuit disponible
- ✅ HTTPS automatique
- ✅ Déploiement automatique depuis Git

**👎 Inconvénients**
- ❌ Cold starts sur le plan gratuit
- ❌ Nécessite de convertir le code

**💰 Coût** : Gratuit (avec limitations), puis 7$/mois

---

## Option 4 : Utiliser le Backend Express Existant

Tu as déjà un backend Express dans `backend/` !

### Déploiement sur Railway

```bash
cd backend

# Installer Railway CLI
npm i -g @railway/cli

# Se connecter
railway login

# Initialiser
railway init

# Ajouter les variables d'env
railway variables set CLICKBANK_DEV_KEY=ta-clé
railway variables set CLICKBANK_API_KEY=ta-clé
railway variables set CLICKBANK_CLERK_KEY=ta-clé
railway variables set FRONTEND_URL=https://ton-frontend.vercel.app
railway variables set PORT=3001

# Déployer
railway up
```

### Déploiement sur Render

1. Créer un **Web Service** sur [render.com](https://render.com)
2. Connecter le repo
3. Configurer :
   - **Root Directory** : `backend`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
4. Ajouter les variables d'environnement
5. Déployer

**👍 Avantages**
- ✅ Code déjà prêt
- ✅ Pas de cold starts
- ✅ Plus de contrôle

**👎 Inconvénients**
- ❌ Nécessite un serveur qui tourne 24/7
- ❌ Plus cher que serverless

**💰 Coût** : 5-10$/mois

---

## Option 5 : VPS Classique (DigitalOcean, Linode, etc.)

**Description** : Serveur virtuel complet, contrôle total

### Déploiement

```bash
# Sur ton VPS (Ubuntu)
sudo apt update
sudo apt install nodejs npm nginx

# Cloner le repo
git clone ton-repo
cd backend

# Installer les dépendances
npm install

# Installer PM2 pour gérer le processus
npm i -g pm2

# Créer un fichier .env avec tes clés
nano .env

# Démarrer avec PM2
pm2 start npm --name "clickbank-api" -- start
pm2 save
pm2 startup

# Configurer Nginx comme reverse proxy
sudo nano /etc/nginx/sites-available/api
```

**Nginx config** :
```nginx
server {
    listen 80;
    server_name api.ton-domaine.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Installer Certbot pour HTTPS
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.ton-domaine.com
```

**👍 Avantages**
- ✅ Contrôle total
- ✅ Pas de cold starts
- ✅ Peut héberger plusieurs apps

**👎 Inconvénients**
- ❌ Nécessite des compétences DevOps
- ❌ Maintenance et sécurité à gérer
- ❌ Pas de scaling automatique

**💰 Coût** : 5-10$/mois (VPS de base)

---

## Option 6 : AWS Lambda + API Gateway

**Description** : Serverless AWS, très scalable

### Déploiement

Nécessite de convertir le code pour AWS Lambda (utiliser Serverless Framework ou AWS SAM).

**👍 Avantages**
- ✅ Très scalable
- ✅ Pay-per-use
- ✅ Gratuit jusqu'à 1M de requêtes/mois

**👎 Inconvénients**
- ❌ Configuration complexe
- ❌ Cold starts
- ❌ Courbe d'apprentissage

**💰 Coût** : Gratuit jusqu'à 1M requêtes/mois, puis ~$0.20 par million

---

## 📊 Comparaison Rapide

| Plateforme | Gratuit | Facilité | Cold Starts | HTTPS Auto | Recommandé Pour |
|------------|---------|----------|-------------|------------|-----------------|
| **Vercel Serverless** | ✅ | ⭐⭐⭐⭐⭐ | Oui | ✅ | **Débutants, MVP** |
| **Railway** | 5$/mois | ⭐⭐⭐⭐ | Non | ✅ | **Petits projets** |
| **Render** | ✅ | ⭐⭐⭐⭐ | Oui (gratuit) | ✅ | **Projets moyens** |
| **VPS** | Non | ⭐⭐ | Non | ❌ | **Contrôle total** |
| **AWS Lambda** | ✅ | ⭐⭐ | Oui | ❌ | **Grandes apps** |

---

## 🎯 Recommandation Finale

### Pour ton cas (ClickBank API) :

**🥇 1er choix : Vercel Serverless**
- Tu as déjà le code prêt dans `backend-serverless/`
- Gratuit pour commencer
- Même plateforme que le frontend
- Déploiement en 5 minutes

**🥈 2ème choix : Railway + Backend Express**
- Si tu veux éviter les cold starts
- Code déjà prêt dans `backend/`
- Très simple à déployer
- 5$/mois gratuit

**🥉 3ème choix : VPS**
- Si tu veux un contrôle total
- Si tu as de l'expérience DevOps
- Pour plusieurs projets sur le même serveur

---

## 🚀 Mon Conseil

**Commence avec Vercel Serverless** :
1. C'est gratuit
2. C'est le plus simple
3. Tu peux toujours migrer plus tard si besoin
4. Parfait pour tester et valider ton produit

Une fois que tu as du trafic et des revenus, tu pourras migrer vers Railway ou un VPS si nécessaire.

---

**📚 Pour déployer sur Vercel** : Voir `DEPLOY_CHECKLIST.md`
