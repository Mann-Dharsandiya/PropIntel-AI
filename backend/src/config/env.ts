 import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  nodeEnv: string;
  port: number;
  apiPrefix: string;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtAccessSecret: string;
  jwtAccessExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  bcryptSaltRounds: number;
  clientOrigin: string;
  mlServiceUrl: string;
}

function required(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: EnvConfig = {
  nodeEnv: required('NODE_ENV', 'development'),
  port: Number(required('PORT', '5000')),
  apiPrefix: required('API_PREFIX', '/api/v1'),
  mongoUri: required('MONGO_URI', 'mongodb://localhost:27017/propintel_ai'),
  jwtSecret: required('JWT_SECRET', 'dev_secret_change_me'),
  jwtExpiresIn: required('JWT_EXPIRES_IN', '7d'),
  jwtAccessSecret: required('JWT_ACCESS_SECRET', 'dev_access_secret_change_me'),
  jwtAccessExpiresIn: required('JWT_ACCESS_EXPIRES_IN', '15m'),
  jwtRefreshSecret: required('JWT_REFRESH_SECRET', 'dev_refresh_secret_change_me'),
  jwtRefreshExpiresIn: required('JWT_REFRESH_EXPIRES_IN', '30d'),
  bcryptSaltRounds: Number(required('BCRYPT_SALT_ROUNDS', '12')),
  clientOrigin: required('CLIENT_ORIGIN', 'http://localhost:5173'),
  mlServiceUrl: required('ML_SERVICE_URL', 'http://localhost:8000'),
};

export const isProduction = env.nodeEnv === 'production';