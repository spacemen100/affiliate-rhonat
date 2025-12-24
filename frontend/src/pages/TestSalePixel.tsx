import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function TestSalePixel() {
    const { t } = useTranslation();
    const [orderId, setOrderId] = useState<string>('');
    const [amount, setAmount] = useState<string>('99.90');
    const [pixelUrl, setPixelUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
    const [pixelFired, setPixelFired] = useState(false);
    const [cookieValue, setCookieValue] = useState<string>('');

    useEffect(() => {
        checkCookie();
    }, []);

    const checkCookie = () => {
        const cookies = document.cookie.split(';');
        const affCookie = cookies.find(c => c.trim().startsWith('aff_link_id='));
        if (affCookie) {
            const value = affCookie.split('=')[1];
            setCookieValue(value);
        } else {
            setCookieValue('');
        }
    };

    const generatePixelUrl = () => {
        if (!orderId || !amount) {
            setResult({ success: false, message: t('testSalePixel.errors.fillOrderIdAmount') });
            return;
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setResult({ success: false, message: t('testSalePixel.errors.amountMustBePositive') });
            return;
        }

        if (!cookieValue) {
            setResult({
                success: false,
                message: t('testSalePixel.errors.noCookieFound')
            });
            return;
        }

        // Récupérer l'URL Supabase depuis les variables d'environnement
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

        if (!supabaseUrl) {
            setResult({
                success: false,
                message: t('testSalePixel.errors.missingSupabaseUrl')
            });
            return;
        }

        // Générer l'URL du pixel de tracking
        const url = `${supabaseUrl}/functions/v1/record-sale?order_id=${encodeURIComponent(orderId)}&amount=${encodeURIComponent(amountNum)}`;
        setPixelUrl(url);
        setResult({
            success: true,
            message: t('testSalePixel.successMessages.urlGenerated')
        });
    };

    const firePixel = async () => {
        if (!pixelUrl) {
            setResult({ success: false, message: t('testSalePixel.errors.generateUrlFirst') });
            return;
        }

        setLoading(true);
        setResult(null);
        setPixelFired(false);

        try {
            // Créer une image invisible pour déclencher le pixel
            const img = new Image();

            img.onload = () => {
                setPixelFired(true);
                setResult({
                    success: true,
                    message: t('testSalePixel.successMessages.pixelTriggered', { orderId, amount })
                });
                setLoading(false);
            };

            img.onerror = () => {
                setPixelFired(false);
                setResult({
                    success: false,
                    message: t('testSalePixel.errors.pixelTriggerError')
                });
                setLoading(false);
            };

            // Déclencher le pixel
            img.src = pixelUrl;

            // Timeout de sécurité
            setTimeout(() => {
                if (loading) {
                    setLoading(false);
                    if (!pixelFired) {
                        setResult({
                            success: false,
                            message: t('testSalePixel.errors.timeout')
                        });
                    }
                }
            }, 10000); // 10 secondes

        } catch (error: any) {
            console.error('Erreur complète:', error);
            setResult({
                success: false,
                message: `Erreur: ${error.message || 'Erreur de connexion'}`
            });
            setLoading(false);
        }
    };

    const resetForm = () => {
        setOrderId('');
        setAmount('99.90');
        setPixelUrl('');
        setResult(null);
        setPixelFired(false);
    };

    return (
        <main className="p-6 w-full max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">{t('testSalePixel.title')}</h1>

            <div className={`p-4 rounded border mb-6 ${cookieValue
                ? 'bg-green-50 border-green-200'
                : 'bg-orange-50 border-orange-200'
                }`}>
                <div className="flex items-center justify-between">
                    <div>
                        <strong className={cookieValue ? 'text-green-800' : 'text-orange-800'}>
                            {cookieValue ? `✓ ${t('testSalePixel.cookieDetected')}` : `⚠️ ${t('testSalePixel.noCookieDetected')}`}
                        </strong>
                        <p className={`text-sm mt-1 ${cookieValue ? 'text-green-700' : 'text-orange-700'}`}>
                            {cookieValue
                                ? `${t('testSalePixel.linkId')}: ${cookieValue.substring(0, 20)}${cookieValue.length > 20 ? '...' : ''}`
                                : t('testSalePixel.clickAffiliateLink')
                            }
                        </p>
                    </div>
                    <button
                        onClick={checkCookie}
                        className={`px-3 py-1 text-sm rounded ${cookieValue
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-orange-600 hover:bg-orange-700 text-white'
                            }`}
                    >
                        {t('testSalePixel.refresh')}
                    </button>
                </div>
                {!cookieValue && (
                    <p className="text-xs text-orange-600 mt-2">
                        💡 {t('testSalePixel.tip')} : <a href="/test-sale" className="underline font-semibold">/test-sale</a> {t('testSalePixel.useTestSalePage')}
                    </p>
                )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6 text-sm text-blue-800">
                <strong>💡 {t('testSalePixel.aboutPixel')} :</strong>
                <p className="mt-2">
                    {t('testSalePixel.pixelDescription1')}
                </p>
                <p className="mt-2">
                    {t('testSalePixel.pixelDescription2')}
                </p>
                <p className="mt-2 font-semibold">
                    🔑 {t('testSalePixel.linkIdAutomatic')} <code className="bg-blue-100 px-1 rounded">aff_link_id</code> {t('testSalePixel.createdOnClick')}
                </p>
            </div>

            <div className="bg-white p-6 shadow rounded mb-6">
                <h2 className="text-lg font-semibold mb-4">1. {t('testSalePixel.saleInformation')}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('testSalePixel.orderIdLabel')}
                        </label>
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="ORDER_123"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('testSalePixel.amountLabel')}
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="99.90"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={generatePixelUrl}
                        disabled={!orderId || !amount}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('testSalePixel.generatePixelUrl')}
                    </button>
                </div>
            </div>

            {pixelUrl && (
                <div className="bg-white p-6 shadow rounded mb-6">
                    <h2 className="text-lg font-semibold mb-4">2. {t('testSalePixel.pixelUrlGenerated')}</h2>
                    <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded border border-gray-200 break-all text-sm font-mono">
                            {pixelUrl}
                        </div>
                        <p className="text-sm text-gray-600">
                            {t('testSalePixel.urlUsage')} <code className="bg-gray-200 px-1 rounded">&lt;img&gt;</code> {t('testSalePixel.onConfirmationPage')}
                        </p>
                        <div className="bg-gray-50 p-3 rounded border border-gray-200">
                            <p className="text-xs font-semibold text-gray-700 mb-2">{t('testSalePixel.htmlIntegrationExample')} :</p>
                            <code className="text-xs block bg-white p-2 rounded border border-gray-300 overflow-x-auto">
                                &lt;img src="{pixelUrl}" width="1" height="1" style="display:none;" alt="" /&gt;
                            </code>
                        </div>
                    </div>
                </div>
            )}

            {pixelUrl && (
                <div className="bg-white p-6 shadow rounded mb-6">
                    <h2 className="text-lg font-semibold mb-4">3. {t('testSalePixel.triggerPixel')}</h2>
                    <div className="space-y-3">
                        <button
                            onClick={firePixel}
                            disabled={loading}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? t('common.loading') : t('testSalePixel.firePixel')}
                        </button>
                        <p className="text-sm text-gray-600">
                            {t('testSalePixel.clickToSimulate')}
                        </p>
                    </div>
                </div>
            )}

            {result && (
                <div className={`p-4 rounded border ${result.success
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                    <strong>{result.success ? `✓ ${t('testSalePixel.success')}` : `✗ ${t('testSalePixel.error')}`}</strong>
                    <p className="mt-1">{result.message}</p>
                    {result.success && (
                        <button
                            onClick={resetForm}
                            className="mt-3 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                            {t('testSalePixel.newTest')}
                        </button>
                    )}
                </div>
            )}

            <div className="bg-gray-50 p-4 rounded mt-6 text-sm text-gray-600">
                <h3 className="font-semibold mb-2">{t('testSalePixel.technicalInfo')} :</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>{t('testSalePixel.pixelUsesEdgeFunction')} : <code className="bg-gray-200 px-1 rounded">/functions/v1/record-sale</code></li>
                    <li>{t('testSalePixel.parametersViaUrl')}</li>
                    <li>{t('testSalePixel.cookieMustBePresent')}</li>
                    <li>{t('testSalePixel.commissionAutoCalculated')}</li>
                    <li>{t('testSalePixel.checkSalesInDashboard')}</li>
                </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mt-4 text-sm text-yellow-800">
                <strong>⚠️ {t('testSalePixel.prerequisites')} :</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>{t('testSalePixel.edgeFunctionDeployed')}</li>
                    <li>{t('testSalePixel.validCookieRequired')}</li>
                    <li>{t('testSalePixel.checkSupabaseUrl')}</li>
                </ol>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded p-4 mt-4 text-sm text-purple-800">
                <strong>🔗 {t('testSalePixel.websiteIntegration')} :</strong>
                <p className="mt-2">
                    {t('testSalePixel.integrationInstructions')}
                </p>
            </div>
        </main>
    );
}
