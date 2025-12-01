
import { useEffect, useState } from 'react';
import { getAffiliateLinks } from '../api/links';
import Sidebar from '../components/Sidebar';

const BASE_GO_URL = 'https://your-domain.com/go';

export default function Links() {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    getAffiliateLinks().then(({ data }) => setLinks(data ?? []));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Mes liens affiliés</h1>
        {links.map(link => (
          <div key={link.id} className="bg-white shadow p-2 rounded mb-2">
            {`${BASE_GO_URL}?code=${link.code}`}
          </div>
        ))}
      </main>
    </div>
  );
}
