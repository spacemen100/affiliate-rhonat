import { StatCard } from '../components/StatCard';
import { useStats } from '../hooks/useStats';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  const { stats, loading, error } = useStats();

  return (
    <main className="page-surface p-6 w-full flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 font-medium">{t('dashboard.overview')}</p>
          <h1 className="text-2xl font-bold">{t('nav.affiliate')}</h1>
        </div>
        <button type="button" className="btn-primary text-sm">
          {t('common.refresh')}
        </button>
      </div>

      {loading && <div className="text-gray-600">{t('common.loading')}</div>}
      {error && <div className="text-red-600 text-sm">{t('common.error')} : {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label={t('dashboard.totalClicks')} value={stats?.clicks ?? 0} />
        <StatCard label={t('links.sales')} value={stats?.sales ?? 0} />
        <StatCard label={t('dashboard.revenue')} value={`${stats?.revenue ?? 0}€`} />
      </div>

      <div className="card p-4 text-xs mt-2">
        <div className="font-semibold mb-2 text-sm text-gray-700">{t('dashboard.stats')}</div>
        <pre className="text-gray-700 whitespace-pre-wrap">{JSON.stringify(stats ?? {}, null, 2)}</pre>
      </div>
    </main>
  );
}
