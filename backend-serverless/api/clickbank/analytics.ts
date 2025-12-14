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

        if (!startDate || !endDate) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'startDate and endDate are required',
            });
        }

        const clickBankService = new ClickBankService();
        const analytics = await clickBankService.getAnalytics(
            startDate as string,
            endDate as string
        );

        // Vérifier si c'est une erreur
        if ('error' in analytics) {
            return res.status(analytics.statusCode).json(analytics);
        }

        return res.status(200).json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        console.error('Analytics error:', error);
        return res.status(500).json({
            error: 'Failed to fetch analytics',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
