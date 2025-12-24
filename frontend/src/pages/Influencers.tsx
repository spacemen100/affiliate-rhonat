import { useEffect, useState } from 'react';
import { getAffiliates, createAffiliate } from '../api/affiliates';
import { useTranslation } from 'react-i18next';
import Toast from '../components/Toast';

export default function Influencers() {
    const { t } = useTranslation();
    const [affiliates, setAffiliates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newAffiliateName, setNewAffiliateName] = useState('');
    const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

    useEffect(() => {
        loadAffiliates();
    }, []);

    async function loadAffiliates() {
        setLoading(true);
        const { data, error } = await getAffiliates();
        if (error) {
            console.error(error);
            setToast({ message: t('common.error'), type: 'error' });
        } else {
            setAffiliates(data || []);
        }
        setLoading(false);
    }

    async function handleCreate() {
        if (!newAffiliateName.trim()) return;
        setCreating(true);
        const { data, error } = await createAffiliate({ display_name: newAffiliateName });
        setCreating(false);

        if (error) {
            setToast({ message: error.message, type: 'error' });
        } else {
            setToast({ message: t('common.success'), type: 'success' });
            setShowModal(false);
            setNewAffiliateName('');
            loadAffiliates();
        }
    }

    return (
        <main className="p-6 w-full space-y-6">
            {toast && (
                <div className="fixed top-4 right-4 z-50">
                    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
                </div>
            )}

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{t('influencers.title')}</h1>
                    <p className="text-gray-600">{t('influencers.subtitle')}</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {t('influencers.create')}
                </button>
            </div>

            {loading ? (
                <div>{t('common.loading')}</div>
            ) : (
                <div className="bg-white rounded shadow text-sm">
                    {affiliates.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            {t('influencers.noData')}
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 text-left text-gray-600 border-b">
                                <tr>
                                    <th className="px-4 py-3">{t('influencers.name')}</th>
                                    <th className="px-4 py-3">{t('common.date')}</th>
                                    <th className="px-4 py-3">{t('common.status')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {affiliates.map((aff) => (
                                    <tr key={aff.id}>
                                        <td className="px-4 py-3 font-medium">
                                            {aff.display_name || t('influencers.unnamed')}
                                            {aff.user_id && <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">User Account</span>}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(aff.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-green-600">{t('common.active')}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
                        <h2 className="text-xl font-bold">{t('influencers.create')}</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('influencers.nameLabel')}
                            </label>
                            <input
                                autoFocus
                                className="w-full border p-2 rounded"
                                placeholder="Ex: @instagram_user"
                                value={newAffiliateName}
                                onChange={(e) => setNewAffiliateName(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                onClick={handleCreate}
                                disabled={creating || !newAffiliateName.trim()}
                            >
                                {creating ? t('common.loading') : t('common.save')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
