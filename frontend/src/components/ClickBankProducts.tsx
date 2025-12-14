import React from 'react';
import { useClickBankProducts } from '../hooks/useClickBank';
import { ClickBankProduct } from '../types/clickbank.types';

const ClickBankProducts: React.FC = () => {
    const { data: products, loading, error, refetch } = useClickBankProducts();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des produits...</p>
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
                <h1 className="text-3xl font-bold text-gray-800">
                    Produits ClickBank
                </h1>
                <button
                    onClick={refetch}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Actualiser
                </button>
            </div>

            {!products || products.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <p className="text-gray-600">Aucun produit trouvé</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product: ClickBankProduct, index: number) => (
                        <ProductCard key={`${product.site}-${index}`} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

interface ProductCardProps {
    product: ClickBankProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                <h3 className="text-white font-semibold text-lg truncate">
                    {product.title}
                </h3>
                <p className="text-blue-100 text-sm">{product.site}</p>
            </div>

            <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Catégorie:</span>
                        <span className="text-gray-800 font-medium text-sm">
                            {product.category}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Prix:</span>
                        <span className="text-green-600 font-bold">
                            {product.price} {product.currency}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Commission:</span>
                        <span className="text-blue-600 font-semibold">
                            {product.commissionRate}%
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Gravity:</span>
                        <span className="text-purple-600 font-semibold">
                            {product.gravity}
                        </span>
                    </div>
                </div>

                {product.rebillAmount && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
                        <p className="text-yellow-800">
                            <strong>Rebill:</strong> {product.rebillAmount}{' '}
                            {product.currency}
                            {product.rebillFrequency && ` / ${product.rebillFrequency} jours`}
                        </p>
                    </div>
                )}

                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded hover:from-blue-600 hover:to-purple-700 transition font-medium">
                    Promouvoir ce produit
                </button>
            </div>
        </div>
    );
};

export default ClickBankProducts;
