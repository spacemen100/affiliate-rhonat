import { useEffect, useState } from 'react';
import { getApprovals } from '../api/approvals';
import { useTranslation } from 'react-i18next';

export default function Approvals() {
  const { t } = useTranslation();
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getApprovals().then(({ data }) => {
      setApprovals(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <main className="p-6 w-full">
      <h1 className="text-xl font-bold mb-4">{t('approvals.title')}</h1>
      {loading && <div className="text-gray-600">{t('common.loading')}</div>}
      {!loading && approvals.length === 0 && (
        <div className="bg-white p-4 rounded shadow text-gray-600">
          {t('approvals.noRequests')}
        </div>
      )}
      {approvals.map((a) => (
        <div key={a.id} className="bg-white shadow p-3 rounded mb-2">
          {t('approvals.product')} : {a.product_id} — {t('approvals.status')} : {a.status}
        </div>
      ))}
    </main>
  );
}
