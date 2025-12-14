import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

interface EnvConfig {
    port: number;
    nodeEnv: string;
    clickbank: {
        devKey: string;
        apiKey: string;
        clerkKey: string;
        baseUrl: string;
    };
    frontend: {
        url: string;
    };
}

// Validation des variables d'environnement
const requiredEnvVars = [
    'CLICKBANK_DEV_KEY',
    'CLICKBANK_API_KEY',
    'CLICKBANK_BASE_URL',
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

export const config: EnvConfig = {
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    clickbank: {
        devKey: process.env.CLICKBANK_DEV_KEY!,
        apiKey: process.env.CLICKBANK_API_KEY!,
        clerkKey: process.env.CLICKBANK_CLERK_KEY || '',
        baseUrl: process.env.CLICKBANK_BASE_URL!,
    },
    frontend: {
        url: process.env.FRONTEND_URL || 'http://localhost:5173',
    },
};

export default config;
