# 🔄 Backend Express vs Backend Serverless

## Quelle est la différence ?

Tu as **deux backends** dans ce projet :

```
affiliate-rhonat/
├── backend/              ← Backend Express (serveur classique)
└── backend-serverless/   ← Backend Serverless (Vercel Functions)
```

## 📊 Comparaison

| Critère | Backend Express | Backend Serverless |
|---------|-----------------|-------------------|
| **Type** | Serveur Node.js classique | Serverless Functions |
| **Déploiement** | Railway, Render, VPS | Vercel |
| **Coût** | 5-10$/mois | Gratuit (100 GB-Hrs) |
| **Cold Starts** | ❌ Non | ✅ Oui (première requête lente) |
| **Scaling** | Manuel | Automatique |
| **Maintenance** | Nécessite gestion serveur | Zéro maintenance |
| **Complexité** | Plus complexe | Plus simple |
| **Contrôle** | Total | Limité |

## 🎯 Lequel choisir ?

### ✅ Utilise Backend Serverless si :

- ✅ Tu débutes
- ✅ Tu veux déployer rapidement
- ✅ Tu veux un coût minimal
- ✅ Tu n'as pas besoin de contrôle total
- ✅ Ton trafic est variable

**👉 Recommandé pour 90% des cas**

### ✅ Utilise Backend Express si :

- ✅ Tu as besoin de performances constantes
- ✅ Tu veux éviter les cold starts
- ✅ Tu as besoin de fonctionnalités avancées (WebSockets, etc.)
- ✅ Tu as déjà un serveur
- ✅ Ton trafic est constant et élevé

## 🔧 Différences Techniques

### Backend Express (`backend/`)

**Structure** :
```
backend/
├── src/
│   ├── server.ts          ← Serveur Express principal
│   ├── routes/
│   │   └── clickbank.routes.ts
│   ├── controllers/
│   │   └── clickbank.controller.ts
│   └── services/
│       └── clickbank.service.ts
└── package.json
```

**Fonctionnement** :
- Serveur qui tourne 24/7
- Écoute sur un port (ex: 3001)
- Gère toutes les requêtes en continu

**Démarrage** :
```bash
cd backend
npm install
npm start
```

---

### Backend Serverless (`backend-serverless/`)

**Structure** :
```
backend-serverless/
├── api/
│   └── clickbank/
│       ├── orders.ts      ← Function serverless
│       ├── products.ts    ← Function serverless
│       ├── analytics.ts   ← Function serverless
│       └── health.ts      ← Function serverless
├── lib/
│   └── clickbank.service.ts
└── vercel.json
```

**Fonctionnement** :
- Chaque fichier = une function serverless
- Se lance uniquement quand appelé
- S'arrête après la réponse

**Démarrage** :
```bash
cd backend-serverless
npm install
vercel dev
```

## 🔄 Conversion

### Du Serverless vers Express

Si tu veux passer du serverless à Express :

1. Le code est déjà dans `backend/`
2. Déploie sur Railway/Render
3. Mets à jour `VITE_API_URL` dans le frontend

### De Express vers Serverless

Si tu veux passer d'Express à serverless :

1. Le code est déjà dans `backend-serverless/`
2. Déploie sur Vercel
3. Mets à jour `VITE_API_URL` dans le frontend

## 📝 Exemple de Requête

### Avec Backend Express

```
Frontend → http://localhost:3001/api/clickbank/orders
           ↓
        Serveur Express (toujours actif)
           ↓
        Route /api/clickbank/orders
           ↓
        Controller
           ↓
        Service ClickBank
           ↓
        API ClickBank
```

### Avec Backend Serverless

```
Frontend → https://api.vercel.app/api/clickbank/orders
           ↓
        Vercel (démarre la function)
           ↓
        api/clickbank/orders.ts
           ↓
        Service ClickBank
           ↓
        API ClickBank
           ↓
        Vercel (arrête la function)
```

## 💡 Recommandation

### Pour démarrer : Backend Serverless

**Pourquoi ?**
1. ✅ Gratuit
2. ✅ Plus simple
3. ✅ Déploiement en 5 minutes
4. ✅ Scaling automatique
5. ✅ Pas de serveur à gérer

**Quand migrer vers Express ?**
- Quand tu as un trafic constant élevé (>10k requêtes/jour)
- Quand les cold starts deviennent un problème
- Quand tu as besoin de fonctionnalités avancées

### Migration facile

Les deux backends utilisent le **même service ClickBank** (`clickbank.service.ts`), donc migrer de l'un à l'autre est facile :

1. Déployer l'autre backend
2. Mettre à jour `VITE_API_URL` dans le frontend
3. Tester
4. Basculer

## 🎯 En Résumé

| Situation | Backend à utiliser |
|-----------|-------------------|
| Je débute | **Serverless** |
| Je veux déployer vite | **Serverless** |
| Je veux du gratuit | **Serverless** |
| J'ai un trafic variable | **Serverless** |
| J'ai un trafic constant élevé | **Express** |
| Je veux éviter les cold starts | **Express** |
| J'ai besoin de WebSockets | **Express** |
| J'ai déjà un serveur | **Express** |

---

**👉 Pour 90% des cas : utilise le Backend Serverless**

**📚 Guides de déploiement** :
- Backend Serverless : [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)
- Backend Express : [DEPLOY_ALTERNATIVES.md](./DEPLOY_ALTERNATIVES.md)

---

*Dernière mise à jour : Décembre 2024*
