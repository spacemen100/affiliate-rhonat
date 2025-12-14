import type { VercelRequest, VercelResponse } from '@vercel/node';
import ClickBankService from '../../lib/clickbank.service';

// Helper pour gérer CORS
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

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const clickBankService = new ClickBankService();
        const health = await clickBankService.healthCheck();

        return res.status(200).json(health);
    } catch (error) {
        console.error('Health check error:', error);
        return res.status(500).json({
            error: 'Health check failed',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
