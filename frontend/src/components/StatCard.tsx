
export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 bg-white rounded shadow flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
