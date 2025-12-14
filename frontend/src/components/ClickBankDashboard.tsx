import React, { useState } from 'react';
import { useClickBankAnalytics } from '../hooks/useClickBank';

const ClickBankDashboard: React.FC = () => {
    // Dates par défaut : 30 derniers jours
    const [endDate] = useState(new Date().toISOString().split('T')[0]);
    const [startDate] = useState(
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]
    );

    const { data: analytics, loading, error, refetch } = useClickBankAnalytics(
        startDate,
        endDate
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <h3 className="text-red-800 font-semibold mb-2">Erreur</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={refetch}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Tableau de bord ClickBank
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Période: {startDate} au {endDate}
                    </p>
                </div>
                <button
                    onClick={refetch}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Actualiser
                </button>
            </div>

            {analytics && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total des ventes */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">
                                    Total des ventes
                                </p>
                                <p className="text-3xl font-bold mt-2">
                                    ${analytics.totalSales.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Total des commissions */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">
                                    Total des commissions
                                </p>
                                <p className="text-3xl font-bold mt-2">
                                    ${analytics.totalCommissions.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Total des commandes */}
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">
                                    Nombre de commandes
                                </p>
                                <p className="text-3xl font-bold mt-2">
                                    {analytics.totalOrders.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Statistiques supplémentaires */}
            {analytics && analytics.totalOrders > 0 && (
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Statistiques détaillées
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <p className="text-gray-600 text-sm">Valeur moyenne par commande</p>
                            <p className="text-2xl font-bold text-gray-800">
                                ${(analytics.totalSales / analytics.totalOrders).toFixed(2)}
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <p className="text-gray-600 text-sm">
                                Commission moyenne par commande
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                                $
                                {(analytics.totalCommissions / analytics.totalOrders).toFixed(
                                    2
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClickBankDashboard;
