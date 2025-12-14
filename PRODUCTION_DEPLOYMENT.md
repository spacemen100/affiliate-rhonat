# 🚀 Guide de Déploiement Production

## Architecture Production

```
┌─────────────────────────────────────────────────────────────┐
│                     PRODUCTION SETUP                         │
└─────────────────────────────────────────────────────────────┘

Frontend (Vercel)                    Backend Serverless (Vercel)
├─ https://ton-site.vercel.app  →    https://api-ton-site.vercel.app
│                                              ↓
│                                        ClickBank API
│                                        (clés sécurisées)
└─────────────────────────────────────────────────────────────┘
```

## 📋 Étapes de Déploiement

### 1️⃣ Déployer le Backend Serverless

#### A. Préparer le projet backend

```bash
cd backend-serverless
npm install
```

#### B. Connecter à Vercel

```bash
# Installer Vercel CLI si pas déjà fait
npm i -g vercel

# Se connecter à Vercel
vercel login

# Initialiser le projet backend
vercel
```

Lors de l'initialisation, réponds :
- **Set up and deploy?** → `Y`
- **Which scope?** → Ton compte/organisation
- **Link to existing project?** → `N`
- **Project name?** → `affiliate-clickbank-api` (ou ton choix)
- **Directory?** → `.` (dossier actuel)
- **Override settings?** → `N`

#### C. Configurer les variables d'environnement

```bash
# Ajouter les clés ClickBank (IMPORTANT : utilise tes vraies clés)
vercel env add CLICKBANK_DEV_KEY
# Colle ta clé DEV quand demandé
# Sélectionne : Production, Preview, Development

vercel env add CLICKBANK_API_KEY
# Colle ta clé API

vercel env add CLICKBANK_CLERK_KEY
# Colle ta clé CLERK

vercel env add CLICKBANK_BASE_URL
# Valeur : https://api.clickbank.com

vercel env add FRONTEND_URL
# Valeur : https://ton-frontend.vercel.app (tu mettras à jour après)
```

#### D. Déployer en production

```bash
# Déploiement production
vercel --prod
```

✅ **Note l'URL de ton backend** : `https://affiliate-clickbank-api.vercel.app`

---

### 2️⃣ Déployer le Frontend

#### A. Mettre à jour la configuration frontend

Avant de déployer, assure-toi que ton frontend pointe vers le bon backend :

**Fichier : `frontend/.env.production`**
```env
VITE_API_URL=https://affiliate-clickbank-api.vercel.app
```

#### B. Déployer sur Vercel

**Option 1 : Via l'interface Vercel (recommandé)**

1. Va sur [vercel.com](https://vercel.com)
2. Clique sur **"Add New Project"**
3. Importe ton repo GitHub
4. Configure :
   - **Framework Preset** : Vite
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
5. Ajoute les variables d'environnement :
   - `VITE_API_URL` = `https://affiliate-clickbank-api.vercel.app`
6. Clique sur **"Deploy"**

**Option 2 : Via CLI**

```bash
cd frontend
vercel

# Puis pour la production
vercel --prod
```

#### C. Mettre à jour le CORS du backend

Une fois que tu as l'URL du frontend (ex: `https://ton-site.vercel.app`), retourne dans le backend :

```bash
cd ../backend-serverless

# Mettre à jour FRONTEND_URL
vercel env rm FRONTEND_URL production
vercel env add FRONTEND_URL
# Entre : https://ton-site.vercel.app

# Redéployer
vercel --prod
```

---

## 🔒 Sécurité en Production

### Variables d'environnement

✅ **Backend** (sur Vercel)
- `CLICKBANK_DEV_KEY` → Clé développeur ClickBank
- `CLICKBANK_API_KEY` → Clé API ClickBank
- `CLICKBANK_CLERK_KEY` → Clé Clerk ClickBank
- `CLICKBANK_BASE_URL` → `https://api.clickbank.com`
- `FRONTEND_URL` → URL de ton frontend Vercel

✅ **Frontend** (sur Vercel)
- `VITE_API_URL` → URL de ton backend Vercel

### CORS

Le backend est configuré pour accepter uniquement les requêtes depuis `FRONTEND_URL`. Cela protège ton API.

---

## 📊 Vérification Post-Déploiement

### 1. Tester le backend

```bash
# Health check
curl https://affiliate-clickbank-api.vercel.app/api/clickbank/health

# Devrait retourner :
# {
#   "status": "ok",
#   "timestamp": "...",
#   "environment": "production",
#   "clickbank": { "configured": true }
# }
```

### 2. Tester le frontend

1. Ouvre ton site : `https://ton-site.vercel.app`
2. Ouvre la console développeur (F12)
3. Vérifie qu'il n'y a pas d'erreurs CORS
4. Teste les appels API (orders, products, analytics)

---

## 🔄 Workflow de Mise à Jour

### Backend

```bash
cd backend-serverless

# Faire tes modifications...

# Déployer
vercel --prod
```

### Frontend

```bash
cd frontend

# Faire tes modifications...

# Si déployé via GitHub, juste push :
git add .
git commit -m "Update frontend"
git push

# Vercel redéploie automatiquement

# Ou via CLI :
vercel --prod
```

---

## 🐛 Troubleshooting

### Erreur CORS

**Symptôme** : `Access-Control-Allow-Origin` error dans la console

**Solution** :
1. Vérifie que `FRONTEND_URL` dans le backend correspond exactement à l'URL du frontend
2. Pas de `/` à la fin de l'URL
3. Redéploie le backend après modification

### Erreur 401 ClickBank

**Symptôme** : `Unauthorized` dans les réponses API

**Solution** :
1. Vérifie que les clés ClickBank sont correctes
2. Vérifie qu'elles sont bien en production :
   ```bash
   vercel env ls
   ```
3. Redéploie si nécessaire

### Erreur 500 Backend

**Symptôme** : Erreurs serveur

**Solution** :
1. Consulte les logs Vercel :
   ```bash
   vercel logs https://affiliate-clickbank-api.vercel.app
   ```
2. Ou via l'interface : [vercel.com/dashboard](https://vercel.com/dashboard) → ton projet → Logs

---

## 💰 Coûts

### Vercel Free Tier

✅ **Inclus gratuitement** :
- 100 GB de bande passante / mois
- Déploiements illimités
- HTTPS automatique
- Serverless functions (100 GB-Hrs)

👉 **Largement suffisant pour démarrer !**

Si tu dépasses, Vercel te préviendra. Le plan Pro est à ~$20/mois.

---

## 📈 Monitoring

### Logs en temps réel

```bash
# Backend
vercel logs https://affiliate-clickbank-api.vercel.app --follow

# Frontend
vercel logs https://ton-site.vercel.app --follow
```

### Analytics Vercel

Va sur [vercel.com/dashboard](https://vercel.com/dashboard) pour voir :
- Nombre de requêtes
- Temps de réponse
- Erreurs
- Utilisation des ressources

---

## ✅ Checklist Finale

Avant de considérer le déploiement terminé :

- [ ] Backend déployé et accessible
- [ ] Variables d'environnement configurées (backend)
- [ ] Frontend déployé et accessible
- [ ] Variables d'environnement configurées (frontend)
- [ ] CORS configuré correctement
- [ ] Health check backend fonctionne
- [ ] Appels API frontend → backend fonctionnent
- [ ] Pas d'erreurs dans les logs
- [ ] Clés ClickBank valides et testées

---

## 🎯 Résumé des URLs

| Service | URL | Rôle |
|---------|-----|------|
| Frontend | `https://ton-site.vercel.app` | Interface utilisateur |
| Backend API | `https://affiliate-clickbank-api.vercel.app` | Proxy sécurisé ClickBank |
| ClickBank | `https://api.clickbank.com` | API officielle |

---

## 📞 Support

Si tu rencontres des problèmes :

1. **Logs Vercel** : Toujours commencer par là
2. **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
3. **ClickBank Support** : Pour les problèmes d'API

---

**🎉 Félicitations ! Ton application est maintenant en production !**
