
import Sidebar from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { useStats } from '../hooks/useStats';

export default function Dashboard() {
  const { stats } = useStats();

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">Dashboard affilié</h1>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Clics" value={stats?.clicks ?? 0} />
          <StatCard label="Ventes" value={stats?.sales ?? 0} />
          <StatCard label="Revenus" value={`${stats?.revenue ?? 0}€`} />
        </div>
        <pre className="bg-white p-3 rounded shadow text-xs mt-4">
          {JSON.stringify(stats, null, 2)}
        </pre>
      </main>
    </div>
  );
}
