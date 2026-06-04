import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { env } from '@/config';
import { logger, scheduleTasks } from '@/helpers';

import {
  errorHandler,
  notFoundHandler,
  requestLogger,
  runWithContext,
} from './middlewares';
import { authRoute } from './routes';

const { PORT, NODE_ENV, CORS_HEADERS, CORS_METHODS, CORS_ORIGINS } = env;

const app = express();

// Async context
app.use(runWithContext);

// Request logger
app.use(requestLogger);

// Cors
app.use(
  cors({
    // Dynamically validate the origin
    origin: (origin, callback) => {
      // Allow requests without origin (e.g., Postman, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (CORS_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: origin not allowed: ${origin}`));
      }
    },

    // REQUIRED for cross-domain cookies
    // Allows the browser to send and receive cookies in cross-origin requests
    credentials: true,

    // Allowed methods
    methods: CORS_METHODS,

    // Allowed headers
    allowedHeaders: CORS_HEADERS,

    // Preflight OPTIONS cache for 10 minutes
    maxAge: 10 * 60,
  }),
);

// External middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/v1/auth', authRoute);

app.get('/api/v1/health', (_, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Not found handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`, {
      mode: NODE_ENV,
    });

    logger.info(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
  });

  // Uncaught synchronous errors
  process.on('uncaughtException', (err) => {
    const { message: error, stack } = err;

    logger.error('uncaughtException', { error, stack });
    process.exit(1);
  });

  // Rejected promises not fulfilled
  process.on('unhandledRejection', (reason) => {
    logger.error('unhandledRejection', { reason });
    process.exit(1);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received - closing server');
    process.exit(0);
  });

  // Cron tasks
  scheduleTasks();
}
