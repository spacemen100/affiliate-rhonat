# 💡 Exemples d'Utilisation - ClickBank Integration

Ce document contient des exemples pratiques d'utilisation de l'intégration ClickBank.

## 📋 Table des matières

1. [Utilisation des Hooks](#utilisation-des-hooks)
2. [Appels API directs](#appels-api-directs)
3. [Composants personnalisés](#composants-personnalisés)
4. [Gestion des erreurs](#gestion-des-erreurs)
5. [Exemples avancés](#exemples-avancés)

---

## 1. Utilisation des Hooks

### Afficher la liste des produits

```tsx
import { useClickBankProducts } from './hooks/useClickBank';

function ProductList() {
  const { data: products, loading, error, refetch } = useClickBankProducts();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Actualiser</button>
      {products?.map(product => (
        <div key={product.site}>
          <h3>{product.title}</h3>
          <p>Prix: {product.price} {product.currency}</p>
          <p>Commission: {product.commissionRate}%</p>
        </div>
      ))}
    </div>
  );
}
```

### Afficher les commandes avec filtres de date

```tsx
import { useState } from 'react';
import { useClickBankOrders } from './hooks/useClickBank';

function OrderList() {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  
  const { data: orders, loading, error } = useClickBankOrders(startDate, endDate);

  return (
    <div>
      <input 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)} 
      />
      <input 
        type="date" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} 
      />
      
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>}
      
      {orders?.map(order => (
        <div key={order.receipt}>
          <p>Reçu: {order.receipt}</p>
          <p>Montant: {order.totalOrderAmount} {order.currency}</p>
          <p>Client: {order.customer.billing.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### Afficher les analytics

```tsx
import { useClickBankAnalytics } from './hooks/useClickBank';

function Analytics() {
  const { data, loading, error } = useClickBankAnalytics(
    '2024-01-01',
    '2024-12-31'
  );

  if (loading) return <div>Chargement des statistiques...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h2>Statistiques 2024</h2>
      <div>
        <p>Total des ventes: ${data.totalSales}</p>
        <p>Total des commissions: ${data.totalCommissions}</p>
        <p>Nombre de commandes: {data.totalOrders}</p>
        <p>Valeur moyenne: ${(data.totalSales / data.totalOrders).toFixed(2)}</p>
      </div>
    </div>
  );
}
```

---

## 2. Appels API directs

### Sans utiliser les hooks

```tsx
import { clickBankApi } from './api/clickbank.api';
import { useState } from 'react';

function ManualFetch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await clickBankApi.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchProducts}>Charger les produits</button>
      {loading && <p>Chargement...</p>}
      {products.map(p => <div key={p.site}>{p.title}</div>)}
    </div>
  );
}
```

### Récupérer un produit spécifique

```tsx
import { clickBankApi } from './api/clickbank.api';
import { useEffect, useState } from 'react';

function ProductDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await clickBankApi.getProductById(productId);
      setProduct(response.data);
    };
    
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Prix: {product.price} {product.currency}</p>
      <p>Commission: {product.commissionRate}%</p>
      <p>Gravity: {product.gravity}</p>
    </div>
  );
}
```

---

## 3. Composants personnalisés

### Carte produit réutilisable

```tsx
import { ClickBankProduct } from './types/clickbank.types';

interface ProductCardProps {
  product: ClickBankProduct;
  onPromote?: (product: ClickBankProduct) => void;
}

function ProductCard({ product, onPromote }: ProductCardProps) {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p className="category">{product.category}</p>
      <p className="description">{product.description}</p>
      
      <div className="stats">
        <span>Prix: {product.price} {product.currency}</span>
        <span>Commission: {product.commissionRate}%</span>
        <span>Gravity: {product.gravity}</span>
      </div>
      
      {onPromote && (
        <button onClick={() => onPromote(product)}>
          Promouvoir ce produit
        </button>
      )}
    </div>
  );
}

// Utilisation
function ProductGallery() {
  const { data: products } = useClickBankProducts();
  
  const handlePromote = (product: ClickBankProduct) => {
    console.log('Promouvoir:', product.title);
    // Votre logique ici
  };

  return (
    <div className="gallery">
      {products?.map(product => (
        <ProductCard 
          key={product.site} 
          product={product} 
          onPromote={handlePromote}
        />
      ))}
    </div>
  );
}
```

### Filtre de produits par catégorie

```tsx
import { useState, useMemo } from 'react';
import { useClickBankProducts } from './hooks/useClickBank';

function FilteredProducts() {
  const { data: products } = useClickBankProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extraire les catégories uniques
  const categories = useMemo(() => {
    if (!products) return [];
    const cats = products.map(p => p.category);
    return ['all', ...new Set(cats)];
  }, [products]);

  // Filtrer les produits
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div>
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.site}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. Gestion des erreurs

### Composant avec gestion d'erreur complète

```tsx
import { useClickBankProducts } from './hooks/useClickBank';

function ProductsWithErrorHandling() {
  const { data, loading, error, refetch } = useClickBankProducts();

  // État de chargement
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Chargement des produits...</p>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="error">
        <h3>Une erreur est survenue</h3>
        <p>{error}</p>
        <button onClick={refetch}>Réessayer</button>
      </div>
    );
  }

  // État vide
  if (!data || data.length === 0) {
    return (
      <div className="empty">
        <p>Aucun produit disponible</p>
        <button onClick={refetch}>Actualiser</button>
      </div>
    );
  }

  // État normal
  return (
    <div className="products">
      <button onClick={refetch}>Actualiser</button>
      {data.map(product => (
        <div key={product.site}>{product.title}</div>
      ))}
    </div>
  );
}
```

### Notification d'erreur avec toast

```tsx
import { useEffect } from 'react';
import { useClickBankProducts } from './hooks/useClickBank';

function ProductsWithToast() {
  const { data, loading, error } = useClickBankProducts();

  useEffect(() => {
    if (error) {
      // Utiliser votre système de notification (toast, alert, etc.)
      showToast('error', `Erreur: ${error}`);
    }
  }, [error]);

  // Reste du composant...
}
```

---

## 5. Exemples avancés

### Pagination des produits

```tsx
import { useState, useMemo } from 'react';
import { useClickBankProducts } from './hooks/useClickBank';

function PaginatedProducts() {
  const { data: products } = useClickBankProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedProducts = useMemo(() => {
    if (!products) return [];
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return products.slice(start, end);
  }, [products, currentPage]);

  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

  return (
    <div>
      <div className="products">
        {paginatedProducts.map(product => (
          <div key={product.site}>{product.title}</div>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        
        <span>Page {currentPage} sur {totalPages}</span>
        
        <button 
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
```

### Recherche de produits

```tsx
import { useState, useMemo } from 'react';
import { useClickBankProducts } from './hooks/useClickBank';

function SearchableProducts() {
  const { data: products } = useClickBankProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchTerm) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <p>{filteredProducts.length} produit(s) trouvé(s)</p>

      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.site}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}
```

### Tri des produits

```tsx
import { useState, useMemo } from 'react';
import { useClickBankProducts } from './hooks/useClickBank';

type SortBy = 'price' | 'commission' | 'gravity' | 'title';
type SortOrder = 'asc' | 'desc';

function SortableProducts() {
  const { data: products } = useClickBankProducts();
  const [sortBy, setSortBy] = useState<SortBy>('gravity');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedProducts = useMemo(() => {
    if (!products) return [];
    
    return [...products].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'commission':
          comparison = a.commissionRate - b.commissionRate;
          break;
        case 'gravity':
          comparison = a.gravity - b.gravity;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [products, sortBy, sortOrder]);

  return (
    <div>
      <div className="sort-controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
          <option value="title">Titre</option>
          <option value="price">Prix</option>
          <option value="commission">Commission</option>
          <option value="gravity">Gravity</option>
        </select>

        <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <div className="products">
        {sortedProducts.map(product => (
          <div key={product.site}>
            {product.title} - {product[sortBy]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Combiner plusieurs filtres

```tsx
import { useState, useMemo } from 'react';
import { useClickBankProducts } from './hooks/useClickBank';

function AdvancedProductFilter() {
  const { data: products } = useClickBankProducts();
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    minCommission: 0,
    searchTerm: '',
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      // Filtre par catégorie
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Filtre par prix
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      
      // Filtre par commission
      if (product.commissionRate < filters.minCommission) {
        return false;
      }
      
      // Filtre par recherche
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        if (!product.title.toLowerCase().includes(term) &&
            !product.description.toLowerCase().includes(term)) {
          return false;
        }
      }
      
      return true;
    });
  }, [products, filters]);

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher..."
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
        />
        
        <input
          type="number"
          placeholder="Prix min"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
        />
        
        <input
          type="number"
          placeholder="Prix max"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
        />
        
        <input
          type="number"
          placeholder="Commission min %"
          value={filters.minCommission}
          onChange={(e) => setFilters({ ...filters, minCommission: Number(e.target.value) })}
        />
      </div>

      <p>{filteredProducts.length} produit(s) trouvé(s)</p>

      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.site}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🎓 Conseils d'utilisation

1. **Utilisez les hooks** pour la plupart des cas d'usage (plus simple)
2. **Utilisez les appels API directs** quand vous avez besoin de plus de contrôle
3. **Mémorisez les calculs coûteux** avec `useMemo`
4. **Gérez toujours les états** loading, error, et empty
5. **Testez avec des données réelles** de ClickBank

---

**Besoin de plus d'exemples?** Consultez les composants dans `frontend/src/components/` !
