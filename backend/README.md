# ClickBank Integration - Backend API

Backend Node.js/Express pour l'intégration sécurisée de l'API ClickBank.

## 🚀 Installation

```bash
cd backend
npm install
```

## ⚙️ Configuration

1. Copiez le fichier `.env.example` vers `.env`:
```bash
copy .env.example .env
```

2. Remplissez vos credentials ClickBank dans `.env`:
```env
CLICKBANK_DEV_KEY=votre_dev_key
CLICKBANK_API_KEY=votre_api_key
CLICKBANK_CLERK_KEY=votre_clerk_key
```

## 🔑 Obtenir vos credentials ClickBank

1. Connectez-vous à votre compte ClickBank
2. Allez dans **Settings** > **API Settings**
3. Générez ou récupérez vos clés:
   - Developer Key
   - API Key
   - Clerk Key (optionnel)

## 🏃 Démarrage

### Mode développement (avec hot reload)
```bash
npm run dev
```

### Mode production
```bash
npm run build
npm start
```

Le serveur démarre sur `http://localhost:3001`

## 📡 Endpoints disponibles

### Health Check
```
GET /api/clickbank/health
```

### Commandes
```
GET /api/clickbank/orders?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

### Produits
```
GET /api/clickbank/products
GET /api/clickbank/products/:id
```

### Analytics
```
GET /api/clickbank/analytics?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

## 🧪 Tester l'API

Avec curl:
```bash
curl http://localhost:3001/api/clickbank/health
```

Avec Postman:
1. Créez une nouvelle requête GET
2. URL: `http://localhost:3001/api/clickbank/products`
3. Envoyez la requête

## 🔒 Sécurité

- ✅ Les clés API sont stockées dans `.env` (jamais dans le code)
- ✅ `.env` est dans `.gitignore`
- ✅ CORS configuré pour accepter uniquement le frontend
- ✅ Authentification gérée côté backend uniquement

## 📁 Structure du projet

```
backend/
├── src/
│   ├── config/
│   │   └── env.ts              # Configuration environnement
│   ├── services/
│   │   └── clickbank.service.ts # Logique ClickBank
│   ├── routes/
│   │   └── clickbank.routes.ts  # Routes API
│   ├── types/
│   │   └── clickbank.types.ts   # Types TypeScript
│   └── server.ts                # Point d'entrée
├── .env                         # Variables d'environnement
├── .env.example                 # Template
├── package.json
└── tsconfig.json
```

## 🐛 Dépannage

### Erreur "Missing required environment variable"
- Vérifiez que `.env` existe et contient toutes les variables requises

### Erreur de connexion à ClickBank
- Vérifiez vos credentials dans `.env`
- Vérifiez que votre compte ClickBank a accès à l'API

### Port déjà utilisé
- Changez le port dans `.env`: `PORT=3002`

## 📚 Documentation

- [ClickBank API Documentation](https://api.clickbank.com/rest/1.3/docs)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
