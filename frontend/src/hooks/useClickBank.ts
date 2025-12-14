import { useState, useEffect, useCallback } from 'react';
import { clickBankApi } from '../api/clickbank.api';
import {
    ClickBankOrder,
    ClickBankProduct,
    ClickBankAnalytics,
} from '../types/clickbank.types';

interface UseClickBankState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook personnalisé pour récupérer les commandes ClickBank
 */
export function useClickBankOrders(
    startDate?: string,
    endDate?: string
): UseClickBankState<ClickBankOrder[]> {
    const [data, setData] = useState<ClickBankOrder[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await clickBankApi.getOrders(startDate, endDate);
            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch orders');
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { data, loading, error, refetch: fetchOrders };
}

/**
 * Hook personnalisé pour récupérer les produits ClickBank
 */
export function useClickBankProducts(): UseClickBankState<ClickBankProduct[]> {
    const [data, setData] = useState<ClickBankProduct[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await clickBankApi.getProducts();
            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { data, loading, error, refetch: fetchProducts };
}

/**
 * Hook personnalisé pour récupérer un produit spécifique
 */
export function useClickBankProduct(
    productId: string
): UseClickBankState<ClickBankProduct> {
    const [data, setData] = useState<ClickBankProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = useCallback(async () => {
        if (!productId) return;

        try {
            setLoading(true);
            setError(null);
            const response = await clickBankApi.getProductById(productId);
            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch product');
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return { data, loading, error, refetch: fetchProduct };
}

/**
 * Hook personnalisé pour récupérer les analytics ClickBank
 */
export function useClickBankAnalytics(
    startDate: string,
    endDate: string
): UseClickBankState<ClickBankAnalytics> {
    const [data, setData] = useState<ClickBankAnalytics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = useCallback(async () => {
        if (!startDate || !endDate) return;

        try {
            setLoading(true);
            setError(null);
            const response = await clickBankApi.getAnalytics(startDate, endDate);
            setData(response.data);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to fetch analytics'
            );
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return { data, loading, error, refetch: fetchAnalytics };
}
