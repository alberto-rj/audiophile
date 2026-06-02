import express from 'express';
import cookieParser from 'cookie-parser';

import { env } from '@/config';

import { errorHandler, notFoundHandler } from './middlewares';
import { authRoute } from './routes';

const { PORT, NODE_ENV } = env;

const app = express();

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

// Middleware for not found routes
app.use(notFoundHandler);

// Middleware for global error handling
app.use(errorHandler);

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

  console.log(`Swagger UI is available at http://localhost:/api-docs`);
}
