import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from './config/env';
import clickBankRoutes from './routes/clickbank.routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS
app.use(
    cors({
        origin: config.frontend.url,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Logging middleware (en développement)
if (config.nodeEnv === 'development') {
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    });
}

// Routes
app.use('/api/clickbank', clickBankRoutes);

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'ClickBank Backend API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: '/api/clickbank/health',
            orders: '/api/clickbank/orders',
            products: '/api/clickbank/products',
            analytics: '/api/clickbank/analytics',
        },
    });
});

// Route 404
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
    });
});

// Gestionnaire d'erreurs global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);

    res.status(500).json({
        error: 'Internal Server Error',
        message: config.nodeEnv === 'development' ? err.message : 'An error occurred',
    });
});

// Démarrage du serveur
const PORT = config.port;

app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${config.nodeEnv}`);
    console.log(`🌐 Frontend URL: ${config.frontend.url}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api/clickbank`);
    console.log('=================================');
});

export default app;
