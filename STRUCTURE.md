# 📁 Structure du Projet - ClickBank Integration

```
affiliate-rhonat/
│
├── 📄 QUICKSTART.md                    # Guide de démarrage rapide (COMMENCEZ ICI!)
├── 📄 PLAN_ACTION.md                   # Plan d'action détaillé étape par étape
├── 📄 CLICKBANK_INTEGRATION.md         # Documentation complète de l'intégration
│
├── 📁 backend/                         # Backend Node.js/Express/TypeScript
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── env.ts                  # Configuration des variables d'environnement
│   │   ├── 📁 services/
│   │   │   └── clickbank.service.ts    # Service principal ClickBank (authentification, appels API)
│   │   ├── 📁 routes/
│   │   │   └── clickbank.routes.ts     # Routes Express pour l'API
│   │   ├── 📁 types/
│   │   │   └── clickbank.types.ts      # Types TypeScript pour ClickBank
│   │   └── server.ts                   # Point d'entrée du serveur
│   │
│   ├── .env.example                    # Template pour les variables d'environnement
│   ├── .env                            # ⚠️ À CRÉER - Vos credentials ClickBank (gitignored)
│   ├── .gitignore                      # Fichiers à ignorer par Git
│   ├── package.json                    # Dépendances backend
│   ├── tsconfig.json                   # Configuration TypeScript
│   ├── nodemon.json                    # Configuration nodemon pour le dev
│   └── README.md                       # Documentation backend
│
├── 📁 frontend/                        # Frontend React/TypeScript
│   ├── 📁 src/
│   │   ├── 📁 api/
│   │   │   └── clickbank.api.ts        # Service API pour communiquer avec le backend
│   │   ├── 📁 components/
│   │   │   ├── ClickBankProducts.tsx   # Composant liste des produits
│   │   │   └── ClickBankDashboard.tsx  # Composant dashboard/analytics
│   │   ├── 📁 hooks/
│   │   │   └── useClickBank.ts         # Hooks personnalisés React
│   │   └── 📁 types/
│   │       └── clickbank.types.ts      # Types TypeScript (synchronisés avec backend)
│   │
│   ├── .env.example                    # Template pour les variables d'environnement
│   ├── .env                            # ⚠️ À CRÉER - URL du backend
│   ├── package.json                    # Dépendances frontend
│   └── README.clickbank.md             # Documentation frontend ClickBank
│
└── 📁 .agent/
    └── 📁 workflows/
        └── clickbank-integration.md    # Workflow détaillé de l'intégration
```

## 🎯 Fichiers clés à connaître

### Backend

| Fichier | Rôle | Importance |
|---------|------|------------|
| `src/services/clickbank.service.ts` | Gère toutes les interactions avec l'API ClickBank | ⭐⭐⭐⭐⭐ |
| `src/routes/clickbank.routes.ts` | Définit les endpoints de votre API | ⭐⭐⭐⭐ |
| `src/server.ts` | Point d'entrée du serveur | ⭐⭐⭐⭐ |
| `.env` | Credentials ClickBank (À CRÉER) | ⭐⭐⭐⭐⭐ |

### Frontend

| Fichier | Rôle | Importance |
|---------|------|------------|
| `src/api/clickbank.api.ts` | Service pour appeler le backend | ⭐⭐⭐⭐⭐ |
| `src/hooks/useClickBank.ts` | Hooks React pour gérer les données | ⭐⭐⭐⭐ |
| `src/components/ClickBankProducts.tsx` | Affiche les produits | ⭐⭐⭐ |
| `src/components/ClickBankDashboard.tsx` | Affiche les statistiques | ⭐⭐⭐ |

### Documentation

| Fichier | Contenu | Quand le lire |
|---------|---------|---------------|
| `QUICKSTART.md` | Guide de démarrage rapide | 🚀 COMMENCEZ ICI |
| `PLAN_ACTION.md` | Plan d'action détaillé | Après le démarrage |
| `CLICKBANK_INTEGRATION.md` | Documentation complète | Pour référence |
| `backend/README.md` | Documentation backend | Pour le développement backend |
| `frontend/README.clickbank.md` | Documentation frontend | Pour le développement frontend |

## 🔄 Flux de données

```
1. Utilisateur clique sur "Voir les produits" (Frontend)
                    ↓
2. useClickBankProducts() hook est appelé (Frontend)
                    ↓
3. clickBankApi.getProducts() fait une requête HTTP (Frontend)
                    ↓
4. GET http://localhost:3001/api/clickbank/products (Réseau)
                    ↓
5. Route /products reçoit la requête (Backend)
                    ↓
6. clickBankService.getProducts() est appelé (Backend)
                    ↓
7. Requête authentifiée vers ClickBank API (Backend → ClickBank)
                    ↓
8. Réponse de ClickBank (ClickBank → Backend)
                    ↓
9. Données formatées et renvoyées (Backend → Frontend)
                    ↓
10. Hook met à jour l'état React (Frontend)
                    ↓
11. Composant affiche les produits (Frontend UI)
```

## 🔐 Sécurité

### ✅ Fichiers sécurisés (gitignored)
- `backend/.env` - Contient les credentials ClickBank
- `frontend/.env` - Contient l'URL du backend
- `node_modules/` - Dépendances

### ⚠️ Ne JAMAIS commiter
- Clés API ClickBank
- Fichiers `.env`
- Credentials de quelque nature que ce soit

## 📊 Endpoints API disponibles

| Endpoint | Méthode | Description | Paramètres |
|----------|---------|-------------|------------|
| `/api/clickbank/health` | GET | Vérifier la connexion | - |
| `/api/clickbank/orders` | GET | Liste des commandes | `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` |
| `/api/clickbank/products` | GET | Liste des produits | - |
| `/api/clickbank/products/:id` | GET | Détails d'un produit | `:id` dans l'URL |
| `/api/clickbank/analytics` | GET | Statistiques | `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` |

## 🚀 Commandes utiles

### Backend
```bash
cd backend
npm install          # Installer les dépendances
npm run dev          # Démarrer en mode développement
npm run build        # Compiler TypeScript
npm start            # Démarrer en production
```

### Frontend
```bash
cd frontend
npm install          # Installer les dépendances
npm run dev          # Démarrer en mode développement
npm run build        # Build pour production
npm run preview      # Prévisualiser le build
```

## 📝 Notes importantes

1. **Le backend DOIT être démarré avant le frontend** pour que les appels API fonctionnent
2. **Les credentials ClickBank** doivent être configurés dans `backend/.env`
3. **CORS est configuré** pour accepter uniquement les requêtes du frontend
4. **Tous les appels à ClickBank** passent par le backend (jamais directement depuis le frontend)

## 🎓 Pour aller plus loin

Après avoir maîtrisé l'intégration de base, vous pouvez:

1. **Ajouter de nouveaux endpoints** dans `backend/src/routes/clickbank.routes.ts`
2. **Créer de nouveaux hooks** dans `frontend/src/hooks/useClickBank.ts`
3. **Personnaliser les composants** dans `frontend/src/components/`
4. **Ajouter des tests** unitaires et d'intégration
5. **Optimiser avec du cache** pour réduire les appels API
6. **Déployer** sur un serveur de production

---

**Prêt à commencer? Consultez `QUICKSTART.md` ! 🚀**
