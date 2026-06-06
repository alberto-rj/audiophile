import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { env } from '@/config';
import { logger, scheduleTasks } from '@/helpers';

import { generateOpenAPISpec } from './openapi';
import './openapi/paths';
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
  runWithContext,
} from './middlewares';
import { authRoute, usersRoute } from './routes';

const { PORT, NODE_ENV, CORS_HEADERS, CORS_METHODS, CORS_ORIGINS } = env;

const app = express();

app.use(express.static('public'));

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Swagger UI
if (NODE_ENV !== 'production') {
  // Generate the spec once on startup (not on every request)
  const openApiSpec = generateOpenAPISpec();

  // Serve raw JSON specs (useful for importing in Postman, Insomnia, etc.)
  app.get('/api-docs.json', (_req, res) => res.json(openApiSpec));

  // Serve Interactive Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(openApiSpec, {
      customSiteTitle: 'audiophile API | Docs',
      customfavIcon: '/favicon.svg',
      customCssUrl: '/css/swagger-ui.css',
      swaggerOptions: {
        persistAuthorization: true, // Keep the token between page reloads
        filter: true, // endpoint search bar
        displayRequestDuration: true, // shows response time in tests.
      },
    }),
  );
}

// Async context
app.use(runWithContext);

// Request logger
app.use(requestLogger);

// API routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);

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
