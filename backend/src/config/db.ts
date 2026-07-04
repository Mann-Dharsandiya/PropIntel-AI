import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

mongoose.set('strictQuery', true);

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    logger.error('MongoDB connection failed', error);
    // Fail fast in production, but allow the API/health checks to still
    // boot in development so the rest of the setup module can be verified
    // even without a running MongoDB instance.
    if (isProdSafeExit()) {
      process.exit(1);
    }
  }

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB error', err);
  });
}

function isProdSafeExit(): boolean {
  return env.nodeEnv === 'production';
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}

export function getDBStatus(): string {
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] ?? 'unknown';
}
