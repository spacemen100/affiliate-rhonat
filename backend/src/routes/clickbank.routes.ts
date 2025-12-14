import { Router, Request, Response } from 'express';
import clickBankService from '../services/clickbank.service';

const router = Router();

/**
 * GET /api/clickbank/health
 * Vérifie la santé de la connexion à l'API ClickBank
 */
router.get('/health', async (req: Request, res: Response) => {
    try {
        const health = await clickBankService.healthCheck();
        res.json(health);
    } catch (error) {
        res.status(500).json({
            error: 'Health check failed',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/clickbank/orders
 * Récupère les commandes ClickBank
 * Query params: startDate, endDate (optionnels)
 */
router.get('/orders', async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;

        const orders = await clickBankService.getOrders(
            startDate as string,
            endDate as string
        );

        // Vérifier si c'est une erreur
        if ('error' in orders) {
            return res.status(orders.statusCode).json(orders);
        }

        res.json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch orders',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/clickbank/products
 * Récupère la liste des produits ClickBank
 */
router.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await clickBankService.getProducts();

        // Vérifier si c'est une erreur
        if ('error' in products) {
            return res.status(products.statusCode).json(products);
        }

        res.json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch products',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/clickbank/products/:id
 * Récupère un produit spécifique par son ID
 */
router.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Product ID is required',
            });
        }

        const product = await clickBankService.getProductById(id);

        // Vérifier si c'est une erreur
        if ('error' in product) {
            return res.status(product.statusCode).json(product);
        }

        res.json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch product',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/clickbank/analytics
 * Récupère les analytics/statistiques
 * Query params: startDate, endDate (requis)
 */
router.get('/analytics', async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'startDate and endDate are required',
            });
        }

        const analytics = await clickBankService.getAnalytics(
            startDate as string,
            endDate as string
        );

        // Vérifier si c'est une erreur
        if ('error' in analytics) {
            return res.status(analytics.statusCode).json(analytics);
        }

        res.json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch analytics',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

export default router;
