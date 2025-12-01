
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-white shadow p-4 flex flex-col gap-3">
      <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      <Link to="/links" className="hover:underline">Mes liens</Link>
      <Link to="/products" className="hover:underline">Produits</Link>
    </aside>
  );
}
