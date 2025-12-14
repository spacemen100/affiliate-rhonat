# ✅ Checklist de Déploiement Production

## 📋 Avant de Commencer

- [ ] Compte Vercel créé ([vercel.com](https://vercel.com))
- [ ] Vercel CLI installé : `npm i -g vercel`
- [ ] Clés ClickBank disponibles :
  - [ ] `CLICKBANK_DEV_KEY`
  - [ ] `CLICKBANK_API_KEY`
  - [ ] `CLICKBANK_CLERK_KEY`
- [ ] Repository Git créé (optionnel mais recommandé)

---

## 🔧 Étape 1 : Déployer le Backend

### 1.1 Préparer le backend

```bash
cd backend-serverless
npm install
```

- [ ] Dépendances installées

### 1.2 Se connecter à Vercel

```bash
vercel login
```

- [ ] Connecté à Vercel

### 1.3 Initialiser le projet backend

```bash
vercel
```

Répondre :
- **Set up and deploy?** → `Y`
- **Project name?** → `affiliate-clickbank-api`
- **Directory?** → `.`
- **Override settings?** → `N`

- [ ] Projet backend initialisé

### 1.4 Configurer les variables d'environnement

```bash
vercel env add CLICKBANK_DEV_KEY
# Coller la clé → Sélectionner : Production, Preview, Development

vercel env add CLICKBANK_API_KEY
# Coller la clé → Sélectionner : Production, Preview, Development

vercel env add CLICKBANK_CLERK_KEY
# Coller la clé → Sélectionner : Production, Preview, Development

vercel env add CLICKBANK_BASE_URL
# Valeur : https://api.clickbank.com

vercel env add FRONTEND_URL
# Valeur temporaire : * (on mettra à jour après)
```

- [ ] Variables d'environnement configurées

### 1.5 Déployer en production

```bash
vercel --prod
```

- [ ] Backend déployé
- [ ] **Noter l'URL du backend** : `https://_____________.vercel.app`

### 1.6 Tester le backend

```bash
curl https://TON-BACKEND-URL.vercel.app/api/clickbank/health
```

Devrait retourner :
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production",
  "clickbank": { "configured": true }
}
```

- [ ] Backend fonctionne

---

## 🎨 Étape 2 : Déployer le Frontend

### 2.1 Préparer le frontend

```bash
cd ../frontend
npm install
```

- [ ] Dépendances installées

### 2.2 Vérifier la configuration

Le fichier `.env.production` doit contenir :
```env
VITE_API_URL=https://TON-BACKEND-URL.vercel.app
```

- [ ] `.env.production` configuré avec la bonne URL backend

### 2.3 Option A : Déployer via Vercel Dashboard (Recommandé)

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Importer le repository GitHub
3. Configurer :
   - **Framework Preset** : Vite
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
4. Ajouter la variable d'environnement :
   - **Name** : `VITE_API_URL`
   - **Value** : `https://TON-BACKEND-URL.vercel.app`
   - **Environments** : Production, Preview, Development
5. Cliquer sur **Deploy**

- [ ] Frontend déployé via Dashboard
- [ ] **Noter l'URL du frontend** : `https://_____________.vercel.app`

### 2.3 Option B : Déployer via CLI

```bash
vercel
```

Répondre :
- **Set up and deploy?** → `Y`
- **Project name?** → `affiliate-clickbank-frontend`
- **Directory?** → `.`
- **Override settings?** → `N`

Puis :
```bash
# Ajouter la variable d'environnement
vercel env add VITE_API_URL
# Valeur : https://TON-BACKEND-URL.vercel.app

# Déployer en production
vercel --prod
```

- [ ] Frontend déployé via CLI
- [ ] **Noter l'URL du frontend** : `https://_____________.vercel.app`

---

## 🔒 Étape 3 : Sécuriser le CORS

### 3.1 Mettre à jour FRONTEND_URL dans le backend

```bash
cd ../backend-serverless

# Supprimer l'ancienne valeur
vercel env rm FRONTEND_URL production

# Ajouter la nouvelle avec l'URL exacte du frontend
vercel env add FRONTEND_URL
# Valeur : https://TON-FRONTEND-URL.vercel.app (sans / à la fin)
```

- [ ] `FRONTEND_URL` mise à jour

### 3.2 Redéployer le backend

```bash
vercel --prod
```

- [ ] Backend redéployé avec le bon CORS

---

## ✅ Étape 4 : Vérification Finale

### 4.1 Tester le backend

```bash
curl https://TON-BACKEND-URL.vercel.app/api/clickbank/health
```

- [ ] Health check OK

### 4.2 Tester le frontend

1. Ouvrir : `https://TON-FRONTEND-URL.vercel.app`
2. Ouvrir la console développeur (F12)
3. Vérifier qu'il n'y a pas d'erreurs CORS
4. Tester les fonctionnalités :
   - [ ] Chargement des produits
   - [ ] Chargement des commandes
   - [ ] Chargement des analytics

### 4.3 Vérifier les logs

```bash
# Logs backend
vercel logs https://TON-BACKEND-URL.vercel.app

# Logs frontend
vercel logs https://TON-FRONTEND-URL.vercel.app
```

- [ ] Pas d'erreurs dans les logs

---

## 📝 Informations de Déploiement

### URLs de Production

| Service | URL |
|---------|-----|
| **Frontend** | `https://_____________________.vercel.app` |
| **Backend** | `https://_____________________.vercel.app` |

### Variables d'Environnement

#### Backend
- [x] `CLICKBANK_DEV_KEY`
- [x] `CLICKBANK_API_KEY`
- [x] `CLICKBANK_CLERK_KEY`
- [x] `CLICKBANK_BASE_URL` = `https://api.clickbank.com`
- [x] `FRONTEND_URL` = URL du frontend

#### Frontend
- [x] `VITE_API_URL` = URL du backend

---

## 🎉 Déploiement Terminé !

### Prochaines Étapes

1. **Tester en conditions réelles** avec de vraies données ClickBank
2. **Configurer un domaine personnalisé** (optionnel)
3. **Mettre en place le monitoring** via Vercel Dashboard
4. **Configurer les alertes** en cas d'erreur

### Commandes Utiles

```bash
# Voir tous les déploiements
vercel ls

# Voir les logs en temps réel
vercel logs URL --follow

# Promouvoir un déploiement en production
vercel promote DEPLOYMENT-URL

# Supprimer un déploiement
vercel rm DEPLOYMENT-URL
```

---

## 🐛 En Cas de Problème

### Erreur CORS
→ Vérifier que `FRONTEND_URL` dans le backend correspond exactement à l'URL du frontend

### Erreur 401 ClickBank
→ Vérifier les clés ClickBank avec `vercel env ls`

### Erreur 500
→ Consulter les logs : `vercel logs URL`

### Le frontend ne charge pas les données
→ Vérifier que `VITE_API_URL` pointe vers le bon backend

---

**📚 Documentation complète** : Voir `PRODUCTION_DEPLOYMENT.md`

**🚀 Scripts rapides** : Voir `DEPLOY_QUICK.md`
