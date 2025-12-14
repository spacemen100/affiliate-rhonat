import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useClickBankAnalytics, useClickBankOrders } from '../hooks/useClickBank';

export default function ClickBank() {
    // Dates par défaut : 30 derniers jours
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [startDate, setStartDate] = useState(
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    );

    const { data: analytics, loading: analyticsLoading, error: analyticsError, refetch: refetchAnalytics } =
        useClickBankAnalytics(startDate, endDate);

    const { data: orders, loading: ordersLoading, error: ordersError, refetch: refetchOrders } =
        useClickBankOrders(startDate, endDate);

    const loading = analyticsLoading || ordersLoading;
    const error = analyticsError || ordersError;

    const handleRefresh = () => {
        refetchAnalytics();
        refetchOrders();
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="p-6 w-full flex flex-col gap-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">ClickBank Analytics</h1>
                        <p className="text-gray-600 mt-1">
                            Période: {startDate} au {endDate}
                        </p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                    >
                        <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Actualiser
                    </button>
                </div>

                {/* Date Range Selector */}
                <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date de début
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date de fin
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                    >
                        Appliquer
                    </button>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-red-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">Erreur</span>
                        </div>
                        <p className="text-red-700 mt-2">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && !error && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Chargement des données...</p>
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                {!loading && analytics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Ventes */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium">Total Ventes</p>
                                    <p className="text-3xl font-bold mt-2">
                                        ${analytics.totalSales?.toLocaleString() ?? 0}
                                    </p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-full p-3">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Total Commissions */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Commissions</p>
                                    <p className="text-3xl font-bold mt-2">
                                        ${analytics.totalCommissions?.toLocaleString() ?? 0}
                                    </p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-full p-3">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Total Commandes */}
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm font-medium">Commandes</p>
                                    <p className="text-3xl font-bold mt-2">
                                        {analytics.totalOrders?.toLocaleString() ?? 0}
                                    </p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-full p-3">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Valeur Moyenne */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100 text-sm font-medium">Valeur Moyenne</p>
                                    <p className="text-3xl font-bold mt-2">
                                        ${analytics.totalOrders > 0
                                            ? (analytics.totalSales / analytics.totalOrders).toFixed(2)
                                            : '0.00'}
                                    </p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-full p-3">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Orders Table */}
                {!loading && orders && orders.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800">Commandes Récentes</h2>
                            <p className="text-sm text-gray-600 mt-1">{orders.length} commande(s) trouvée(s)</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID Commande
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Produit
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Montant
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Commission
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.slice(0, 10).map((order: any, index: number) => (
                                        <tr key={order.orderId || index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {order.orderId || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {order.orderDate ? new Date(order.orderDate).toLocaleDateString('fr-FR') : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {order.productTitle || order.item || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${order.amount?.toFixed(2) || '0.00'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                                ${order.commission?.toFixed(2) || '0.00'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'COMPLETE' || order.transactionType === 'SALE'
                                                        ? 'bg-green-100 text-green-800'
                                                        : order.status === 'REFUND' || order.transactionType === 'RFND'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.status || order.transactionType || 'N/A'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* No Data State */}
                {!loading && !error && (!orders || orders.length === 0) && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune donnée disponible</h3>
                        <p className="text-gray-600">Aucune commande trouvée pour la période sélectionnée.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
