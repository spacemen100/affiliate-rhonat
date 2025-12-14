import type { VercelRequest, VercelResponse } from '@vercel/node';
import ClickBankService from '../../lib/clickbank.service';

function setCorsHeaders(res: VercelResponse) {
    const allowedOrigin = process.env.FRONTEND_URL || '*';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { startDate, endDate } = req.query;

        const clickBankService = new ClickBankService();
        const orders = await clickBankService.getOrders(
            startDate as string,
            endDate as string
        );

        // Vérifier si c'est une erreur
        if ('error' in orders) {
            return res.status(orders.statusCode).json(orders);
        }

        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        console.error('Orders error:', error);
        return res.status(500).json({
            error: 'Failed to fetch orders',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
