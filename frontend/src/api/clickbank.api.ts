import {
    ClickBankOrder,
    ClickBankProduct,
    ClickBankAnalytics,
    ApiResponse,
    ApiError,
} from '../types/clickbank.types';

// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const CLICKBANK_API_PATH = '/api/clickbank';

/**
 * Classe pour gérer les appels à l'API ClickBank via notre backend
 */
class ClickBankApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}${CLICKBANK_API_PATH}`;
    }

    /**
     * Méthode générique pour faire des requêtes HTTP
     */
    private async request<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                ...options,
            });

            if (!response.ok) {
                const error: ApiError = await response.json();
                throw new Error(error.message || 'An error occurred');
            }

            return await response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    /**
     * Vérifie la santé de la connexion à l'API
     */
    async healthCheck(): Promise<{ status: string; message: string }> {
        return this.request('/health');
    }

    /**
     * Récupère les commandes
     * @param startDate - Date de début (format: YYYY-MM-DD)
     * @param endDate - Date de fin (format: YYYY-MM-DD)
     */
    async getOrders(
        startDate?: string,
        endDate?: string
    ): Promise<ApiResponse<ClickBankOrder[]>> {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const queryString = params.toString();
        const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;

        return this.request<ApiResponse<ClickBankOrder[]>>(endpoint);
    }

    /**
     * Récupère la liste des produits
     */
    async getProducts(): Promise<ApiResponse<ClickBankProduct[]>> {
        return this.request<ApiResponse<ClickBankProduct[]>>('/products');
    }

    /**
     * Récupère un produit spécifique par son ID
     * @param productId - ID du produit
     */
    async getProductById(
        productId: string
    ): Promise<ApiResponse<ClickBankProduct>> {
        return this.request<ApiResponse<ClickBankProduct>>(`/products/${productId}`);
    }

    /**
     * Récupère les analytics/statistiques
     * @param startDate - Date de début (format: YYYY-MM-DD)
     * @param endDate - Date de fin (format: YYYY-MM-DD)
     */
    async getAnalytics(
        startDate: string,
        endDate: string
    ): Promise<ApiResponse<ClickBankAnalytics>> {
        const params = new URLSearchParams({
            startDate,
            endDate,
        });

        return this.request<ApiResponse<ClickBankAnalytics>>(
            `/analytics?${params.toString()}`
        );
    }
}

// Export d'une instance singleton
export const clickBankApi = new ClickBankApiService();

export default clickBankApi;
