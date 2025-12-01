
import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import Sidebar from '../components/Sidebar';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then(({ data }) => setProducts(data ?? []));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Produits</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white shadow p-4 rounded">
              <h2 className="font-semibold text-lg mb-1">{p.name}</h2>
              <p className="text-gray-700 mb-1">{p.price}€</p>
              <p className="text-sm text-gray-500">
                Commission: {p.commission_percent}%
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
