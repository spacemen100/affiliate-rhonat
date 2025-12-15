/**
 * Configuration centralisée pour l'intégration ClickBank
 * 
 * Ce fichier contient toutes les constantes et configurations
 * nécessaires pour l'intégration ClickBank.
 */

// ============================================================================
// BACKEND CONFIGURATION
// ============================================================================

/**
 * URL du backend Vercel déployé
 * En développement, le proxy Vite redirige /api/* vers cette URL
 * En production, les routes /api/* sont servies directement par Vercel
 */
export const CLICKBANK_BACKEND_URL = 'https://affiliate-rhonat-delta.vercel.app';

/**
 * Chemin de base pour les endpoints ClickBank
 * Utilise des chemins relatifs pour profiter du proxy Vite
 */
export const CLICKBANK_API_PATH = '/api/clickbank';

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const CLICKBANK_ENDPOINTS = {
    // Vérification de l'état du backend
    health: `${CLICKBANK_API_PATH}/health`,

    // Récupération des commandes
    orders: `${CLICKBANK_API_PATH}/orders`,

    // Analytics agrégées (ventes, CA, commissions)
    analytics: `${CLICKBANK_API_PATH}/analytics`,

    // Liste des produits
    products: `${CLICKBANK_API_PATH}/products`,
} as const;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

/**
 * Clé API par défaut pour les tests
 * ⚠️ À remplacer par la vraie clé en production
 */
export const DEFAULT_DEV_KEY = 'API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT';

/**
 * Vendor par défaut pour les tests
 */
export const DEFAULT_VENDOR = 'freenzy';

/**
 * Métriques par défaut pour les analytics
 */
export const DEFAULT_METRICS = 'HOP_COUNT,SALE_COUNT';

/**
 * Nombre de jours par défaut pour les plages de dates
 */
export const DEFAULT_DATE_RANGE_DAYS = 7;

// ============================================================================
// PAGINATION
// ============================================================================

/**
 * Nombre maximum de pages à récupérer (limite de sécurité)
 */
export const MAX_PAGINATION_PAGES = 1000;

/**
 * Nombre d'éléments par page (défini par ClickBank)
 */
export const ITEMS_PER_PAGE = 100;

// ============================================================================
// TRANSACTION TYPES
// ============================================================================

export const TRANSACTION_TYPES = {
    SALE: 'SALE',           // Vente
    RFND: 'RFND',           // Remboursement
    CGBK: 'CGBK',           // Chargeback
    BILL: 'BILL',           // Facturation récurrente
    CANCEL_REBILL: 'CANCEL_REBILL', // Annulation d'abonnement
} as const;

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];

// ============================================================================
// ROLES
// ============================================================================

export const ROLES = {
    VENDOR: 'VENDOR',       // Vendeur
    AFFILIATE: 'AFFILIATE', // Affilié
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// ============================================================================
// ANALYTICS DIMENSIONS
// ============================================================================

export const ANALYTICS_DIMENSIONS = {
    VENDOR: 'vendor',
    TRACKING_ID: 'TRACKING_ID',
    PRODUCT: 'product',
    COUNTRY: 'country',
} as const;

export type AnalyticsDimension = typeof ANALYTICS_DIMENSIONS[keyof typeof ANALYTICS_DIMENSIONS];

// ============================================================================
// METRICS
// ============================================================================

export const AVAILABLE_METRICS = [
    'HOP_COUNT',          // Nombre de clics
    'SALE_COUNT',         // Nombre de ventes
    'REBILL_COUNT',       // Nombre de rebills
    'REFUND_COUNT',       // Nombre de remboursements
    'CHARGEBACK_COUNT',   // Nombre de chargebacks
    'REVENUE',            // Revenu total
    'COMMISSION',         // Commission totale
] as const;

export type Metric = typeof AVAILABLE_METRICS[number];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Génère une plage de dates par défaut
 * @param days Nombre de jours à partir d'aujourd'hui (par défaut: 7)
 * @returns Objet avec startDate et endDate au format yyyy-mm-dd
 */
export function getDefaultDateRange(days: number = DEFAULT_DATE_RANGE_DAYS) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    const format = (date: Date) => date.toISOString().slice(0, 10);

    return {
        startDate: format(start),
        endDate: format(end),
    };
}

/**
 * Construit une URL HopLink ClickBank
 * @param affiliateNickname Nickname de l'affilié (UUID)
 * @param vendorNickname Nickname du vendeur
 * @param trackingId ID de tracking
 * @returns URL du HopLink
 */
export function buildHopLink(
    affiliateNickname: string,
    vendorNickname: string,
    trackingId: string
): string {
    return `https://${affiliateNickname}.${vendorNickname}.hop.clickbank.net/?tid=${encodeURIComponent(trackingId)}`;
}

/**
 * Formate une clé API ClickBank
 * Ajoute le préfixe "API-" si nécessaire
 * @param apiKey Clé API
 * @returns Clé API formatée
 */
export function formatApiKey(apiKey: string): string {
    if (!apiKey) return '';
    return apiKey.startsWith('API-') ? apiKey : `API-${apiKey}`;
}

/**
 * Nettoie une clé API ClickBank
 * Supprime le préfixe "API-" si présent
 * @param apiKey Clé API
 * @returns Clé API sans préfixe
 */
export function stripApiKeyPrefix(apiKey: string): string {
    if (!apiKey) return '';
    return apiKey.startsWith('API-') ? apiKey.substring(4) : apiKey;
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Valide une clé API ClickBank
 * @param apiKey Clé API à valider
 * @returns true si la clé est valide
 */
export function isValidApiKey(apiKey: string): boolean {
    if (!apiKey) return false;
    const cleaned = stripApiKeyPrefix(apiKey);
    // Les clés ClickBank font généralement 32 caractères
    return cleaned.length >= 20 && /^[A-Z0-9]+$/i.test(cleaned);
}

/**
 * Valide une date au format yyyy-mm-dd
 * @param dateString Date à valider
 * @returns true si la date est valide
 */
export function isValidDate(dateString: string): boolean {
    if (!dateString) return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
    CLICKBANK_BACKEND_URL,
    CLICKBANK_API_PATH,
    CLICKBANK_ENDPOINTS,
    DEFAULT_DEV_KEY,
    DEFAULT_VENDOR,
    DEFAULT_METRICS,
    DEFAULT_DATE_RANGE_DAYS,
    MAX_PAGINATION_PAGES,
    ITEMS_PER_PAGE,
    TRANSACTION_TYPES,
    ROLES,
    ANALYTICS_DIMENSIONS,
    AVAILABLE_METRICS,
    getDefaultDateRange,
    buildHopLink,
    formatApiKey,
    stripApiKeyPrefix,
    isValidApiKey,
    isValidDate,
};
