# Intégration ClickBank - Guide Complet

Ce projet implémente une intégration sécurisée de l'API ClickBank avec une architecture backend/frontend.

## 🏗️ Architecture

```
┌─────────────────┐
│  Frontend       │
│  (React/TS)     │
│  Port: 5173     │
└────────┬────────┘
         │
         │ HTTP Requests
         │
┌────────▼────────┐
│  Backend        │
│  (Node/Express) │
│  Port: 3001     │
└────────┬────────┘
         │
         │ Authenticated Requests
         │
┌────────▼────────┐
│  ClickBank API  │
│  (External)     │
└─────────────────┘
```

## 📋 Prérequis

- Node.js 18+ et npm
- Compte ClickBank avec accès API
- Credentials ClickBank (Dev Key, API Key)

## 🚀 Installation complète

### 1. Backend

```bash
cd backend
npm install
copy .env.example .env
```

Éditez `.env` et ajoutez vos credentials ClickBank:
```env
CLICKBANK_DEV_KEY=votre_dev_key_ici
CLICKBANK_API_KEY=votre_api_key_ici
```

Démarrez le backend:
```bash
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
```

Créez `.env`:
```env
VITE_API_URL=http://localhost:3001
```

Démarrez le frontend:
```bash
npm run dev
```

## 🎯 Étapes de développement

### ✅ Phase 1: Backend (Complété)
- [x] Structure du projet
- [x] Configuration TypeScript
- [x] Service ClickBank avec authentification
- [x] Routes API
- [x] Gestion des erreurs
- [x] Configuration CORS

### ✅ Phase 2: Frontend (Complété)
- [x] Types TypeScript
- [x] Service API
- [x] Hooks personnalisés
- [x] Composant Products
- [x] Composant Dashboard

### 🔄 Phase 3: Prochaines étapes
- [ ] Configurer vos credentials ClickBank
- [ ] Tester la connexion à l'API
- [ ] Intégrer les composants dans votre application
- [ ] Ajouter des tests
- [ ] Déploiement

## 📡 Endpoints disponibles

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/clickbank/health` | GET | Vérifier la connexion |
| `/api/clickbank/orders` | GET | Liste des commandes |
| `/api/clickbank/products` | GET | Liste des produits |
| `/api/clickbank/products/:id` | GET | Détails d'un produit |
| `/api/clickbank/analytics` | GET | Statistiques |

## 🧪 Tests

### Tester le backend

1. Démarrez le backend
2. Testez avec curl:
```bash
curl http://localhost:3001/api/clickbank/health
```

### Tester le frontend

1. Démarrez le backend ET le frontend
2. Ouvrez `http://localhost:5173`
3. Naviguez vers les pages ClickBank

## 🔒 Sécurité - Points importants

### ✅ À FAIRE
- Stocker les clés API dans `.env`
- Ajouter `.env` au `.gitignore`
- Appeler ClickBank uniquement depuis le backend
- Valider les données côté backend
- Configurer CORS correctement

### ❌ À NE PAS FAIRE
- Ne JAMAIS exposer les clés API dans le frontend
- Ne JAMAIS commiter `.env` dans Git
- Ne JAMAIS appeler l'API ClickBank directement depuis le frontend
- Ne JAMAIS désactiver CORS en production

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.clickbank.md)
- [Workflow détaillé](./.agent/workflows/clickbank-integration.md)

## 🐛 Résolution de problèmes

### Le backend ne démarre pas
1. Vérifiez que `.env` existe dans `/backend`
2. Vérifiez que toutes les variables requises sont définies
3. Vérifiez que le port 3001 est libre

### Le frontend ne peut pas se connecter au backend
1. Vérifiez que le backend est démarré
2. Vérifiez `VITE_API_URL` dans le `.env` du frontend
3. Vérifiez la console du navigateur pour les erreurs CORS

### Erreur d'authentification ClickBank
1. Vérifiez vos credentials dans `.env`
2. Vérifiez que votre compte ClickBank a accès à l'API
3. Consultez les logs du backend pour plus de détails

## 📞 Support

Pour toute question sur l'API ClickBank:
- [Documentation officielle](https://api.clickbank.com/rest/1.3/docs)
- [Support ClickBank](https://support.clickbank.com/)

## 🎉 Prochaines fonctionnalités possibles

- [ ] Pagination des résultats
- [ ] Filtres avancés
- [ ] Export des données (CSV, Excel)
- [ ] Graphiques et visualisations
- [ ] Notifications en temps réel
- [ ] Cache des données
- [ ] Rate limiting
- [ ] Tests unitaires et d'intégration
