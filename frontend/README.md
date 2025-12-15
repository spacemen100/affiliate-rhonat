# 🚀 Affiliate Platform - Frontend

Plateforme d'affiliation moderne avec intégration ClickBank complète.

## 📋 Table des matières

- [Démarrage rapide](#-démarrage-rapide)
- [Fonctionnalités](#-fonctionnalités)
- [Intégration ClickBank](#-intégration-clickbank)
- [Documentation](#-documentation)
- [Technologies](#-technologies)
- [Structure du projet](#-structure-du-projet)

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.local.example .env.local

# Démarrer le serveur de développement
npm run dev
```

Le serveur démarre sur http://localhost:5173

### Configuration

Éditez `.env.local` avec vos credentials :

```bash
# Supabase
VITE_SUPABASE_URL=https://etkeimmyqfangzyrajqx.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_anon
```

## ✨ Fonctionnalités

### Gestion d'affiliation

- 📊 Dashboard avec métriques en temps réel
- 👥 Gestion des affiliés
- 🔗 Génération de liens d'affiliation
- 💰 Suivi des commissions
- 📈 Analytics détaillées

### Intégration ClickBank

- ✅ Backend sécurisé déployé sur Vercel
- ✅ Récupération des ventes et commandes
- ✅ Analytics par vendor et tracking ID
- ✅ Génération de HopLinks
- ✅ Test de connexion API
- ✅ Playground interactif

### Autres fonctionnalités

- 🎨 Interface moderne avec glassmorphism
- 🌐 Support multilingue (i18n)
- 🔐 Authentification Supabase
- 📱 Design responsive
- 🎯 Marketplace de produits

## 🔗 Intégration ClickBank

### Architecture

Le frontend utilise **uniquement** le backend déployé sur Vercel pour toutes les interactions ClickBank :

```
Frontend → Vite Proxy → Backend Vercel → API ClickBank
```

**Avantages** :
- ✅ Pas de problèmes CORS
- ✅ Clés API sécurisées
- ✅ Même comportement dev/prod

### Utilisation

1. Accédez à la page ClickBank dans la sidebar
2. Configurez votre clé API Developer
3. Testez la connexion
4. Explorez les fonctionnalités :
   - Résumé des ventes et CA
   - Récupération des commandes
   - Analytics par vendor
   - Création de liens d'affiliation

### Documentation ClickBank

- 📖 [Guide d'utilisation](./CLICKBANK_USER_GUIDE.md) - Comment utiliser la page ClickBank
- 🏗️ [Architecture](./CLICKBANK_ARCHITECTURE.md) - Architecture technique détaillée
- 🔧 [Intégration](./CLICKBANK_INTEGRATION.md) - Guide d'intégration complet
- ✅ [Résumé des modifications](./CLICKBANK_UPDATE_SUMMARY.md) - Dernières mises à jour

## 📚 Documentation

### Guides utilisateur

- [Guide ClickBank](./CLICKBANK_USER_GUIDE.md) - Utilisation de la page ClickBank
- [Configuration backend](./BACKEND_CONFIG.md) - Configuration du backend Vercel

### Documentation technique

- [Architecture ClickBank](./CLICKBANK_ARCHITECTURE.md) - Architecture et flux de données
- [Intégration ClickBank](./CLICKBANK_INTEGRATION.md) - Guide d'intégration
- [Configuration Supabase](../SUPABASE_SETUP.md) - Configuration de la base de données

### Résumés

- [Mise à jour ClickBank](./CLICKBANK_UPDATE_SUMMARY.md) - Dernières modifications
- [Résumé d'intégration](./CLICKBANK_INTEGRATION_SUMMARY.md) - Vue d'ensemble

## 🛠️ Technologies

### Frontend

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **TailwindCSS** - Framework CSS
- **React Router** - Routing

### Backend & Services

- **Vercel** - Déploiement et serverless functions
- **Supabase** - Base de données et authentification
- **ClickBank API** - Plateforme d'affiliation

### Outils

- **ESLint** - Linting
- **Prettier** - Formatage de code
- **PostCSS** - Transformation CSS

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── api/                    # Services API
│   │   ├── clickbank.ts        # Service ClickBank principal
│   │   ├── clickbank-backend.ts # Service backend Vercel
│   │   ├── supabase.ts         # Client Supabase
│   │   └── ...                 # Autres services
│   │
│   ├── components/             # Composants réutilisables
│   │   ├── clickbank/          # Composants ClickBank
│   │   │   ├── BackendAnalyticsSummary.tsx
│   │   │   ├── VendorAnalyticsPlayground.tsx
│   │   │   ├── OrdersSummary.tsx
│   │   │   └── ClickbankRequestPreview.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   │
│   ├── config/                 # Configuration
│   │   └── clickbank.config.ts # Config ClickBank centralisée
│   │
│   ├── pages/                  # Pages de l'application
│   │   ├── ClickBank.tsx       # Page ClickBank
│   │   ├── Dashboard.tsx
│   │   └── ...
│   │
│   ├── types/                  # Types TypeScript
│   │   └── clickbank.types.ts
│   │
│   ├── App.tsx                 # Composant racine
│   └── main.tsx                # Point d'entrée
│
├── public/                     # Assets statiques
│
├── .env.local.example          # Exemple de configuration
├── vite.config.ts              # Configuration Vite
├── tailwind.config.cjs         # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
│
└── Documentation/
    ├── CLICKBANK_USER_GUIDE.md
    ├── CLICKBANK_ARCHITECTURE.md
    ├── CLICKBANK_INTEGRATION.md
    └── CLICKBANK_UPDATE_SUMMARY.md
```

## 🚢 Déploiement

### Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

**Configuration Vercel** :
- Root Directory : `frontend`
- Build Command : `npm run build`
- Output Directory : `dist`
- Framework Preset : Vite

### Build local

```bash
# Créer le build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 🧪 Tests

```bash
# Lancer les tests (à configurer)
npm test

# Linting
npm run lint
```

## 🐛 Dépannage

### Erreur "Failed to fetch"

**Cause** : Le backend Vercel n'est pas accessible

**Solution** :
1. Vérifiez que le backend est en ligne : https://affiliate-rhonat-delta.vercel.app/api/clickbank/health
2. Redémarrez le serveur : `npm run dev`

### Erreur CORS

**Cause** : Appel direct vers une API externe

**Solution** :
- Toujours utiliser les chemins relatifs `/api/*`
- Le proxy Vite gère automatiquement la redirection

### Erreur de build

**Cause** : Dépendances manquantes ou obsolètes

**Solution** :
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

## 📝 Scripts disponibles

```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Créer le build de production
npm run preview      # Prévisualiser le build
npm run lint         # Linter le code
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 🔗 Liens utiles

- [Backend Vercel](https://affiliate-rhonat-delta.vercel.app)
- [ClickBank Developer](https://accounts.clickbank.com/developer-api-keys)
- [Documentation API ClickBank](https://api.clickbank.com/rest/1.3/)
- [Supabase Dashboard](https://supabase.com/dashboard)

## 💬 Support

Pour toute question ou problème :
1. Consultez la [documentation](#-documentation)
2. Vérifiez les [issues GitHub](https://github.com/votre-repo/issues)
3. Contactez l'équipe de développement

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2025-12-15
