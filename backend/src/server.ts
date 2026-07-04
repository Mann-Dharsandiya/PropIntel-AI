import { createApp } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';
import { logger } from './utils/logger';

async function bootstrap(): Promise<void> {
  await connectDB();

  const app = createApp();

  const server = app.listen(env.port, () => {
    logger.info(`PropIntel AI backend running on http://localhost:${env.port}`);
    logger.info(`Environment: ${env.nodeEnv}`);
    logger.info(`API base path: ${env.apiPrefix}`);
  });

  const shutdown = (signal: string) => {
    logger.warn(`${signal} received. Shutting down gracefully...`);
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', reason);
  });

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', err);
    process.exit(1);
  });
}

bootstrap();
