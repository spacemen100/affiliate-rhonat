# ClickBank Integration - Frontend

Frontend React/TypeScript pour consommer l'API ClickBank via le backend.

## 🚀 Installation

```bash
cd frontend
npm install
```

## ⚙️ Configuration

Créez un fichier `.env` à la racine du frontend:

```env
VITE_API_URL=http://localhost:3001
```

## 🏃 Démarrage

```bash
npm run dev
```

L'application démarre sur `http://localhost:5173`

## 📦 Composants disponibles

### ClickBankProducts
Affiche la liste des produits ClickBank avec leurs détails.

```tsx
import ClickBankProducts from './components/ClickBankProducts';

function App() {
  return <ClickBankProducts />;
}
```

### ClickBankDashboard
Affiche les statistiques et analytics.

```tsx
import ClickBankDashboard from './components/ClickBankDashboard';

function App() {
  return <ClickBankDashboard />;
}
```

## 🎣 Hooks personnalisés

### useClickBankProducts
```tsx
import { useClickBankProducts } from './hooks/useClickBank';

function MyComponent() {
  const { data, loading, error, refetch } = useClickBankProducts();
  
  // Votre logique ici
}
```

### useClickBankOrders
```tsx
import { useClickBankOrders } from './hooks/useClickBank';

function MyComponent() {
  const { data, loading, error, refetch } = useClickBankOrders(
    '2024-01-01',
    '2024-12-31'
  );
  
  // Votre logique ici
}
```

### useClickBankAnalytics
```tsx
import { useClickBankAnalytics } from './hooks/useClickBank';

function MyComponent() {
  const { data, loading, error, refetch } = useClickBankAnalytics(
    '2024-01-01',
    '2024-12-31'
  );
  
  // Votre logique ici
}
```

## 🔌 Service API

Le service API est disponible pour des appels directs:

```tsx
import { clickBankApi } from './api/clickbank.api';

// Récupérer les produits
const products = await clickBankApi.getProducts();

// Récupérer les commandes
const orders = await clickBankApi.getOrders('2024-01-01', '2024-12-31');

// Récupérer les analytics
const analytics = await clickBankApi.getAnalytics('2024-01-01', '2024-12-31');
```

## 📁 Structure

```
frontend/src/
├── api/
│   └── clickbank.api.ts         # Service API
├── components/
│   ├── ClickBankProducts.tsx    # Liste des produits
│   └── ClickBankDashboard.tsx   # Dashboard analytics
├── hooks/
│   └── useClickBank.ts          # Hooks personnalisés
└── types/
    └── clickbank.types.ts       # Types TypeScript
```

## 🎨 Personnalisation

Les composants utilisent Tailwind CSS. Vous pouvez personnaliser les styles en modifiant les classes dans les composants.

## 🐛 Dépannage

### Erreur CORS
- Vérifiez que le backend est démarré
- Vérifiez que `FRONTEND_URL` dans le backend `.env` correspond à votre URL frontend

### Erreur "Failed to fetch"
- Vérifiez que `VITE_API_URL` dans `.env` pointe vers le bon backend
- Vérifiez que le backend est accessible

## 📚 Technologies utilisées

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
