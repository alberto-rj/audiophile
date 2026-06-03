import type { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { env } from '@/config';
import { logger, setRequestContext } from '@/helpers';

const { LOG_REQUEST_BODY, LOG_REQUEST_HEADERS } = env;

const SENSITIVE_HEADERS_FIELDS = ['authorization', 'cookie', 'x-api-key'];
const SENSITIVE_BODY_FIELDS = [
  'password',
  'passwordHash',
  'accessToken',
  'token',
  'secret',
  'cvv',
];

function sanitizeFields(
  fields: Record<string, unknown>,
  sensitiveFields: string[],
): Record<string, unknown> {
  const sanitized = { ...fields };

  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }

  return sanitized;
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const requestId = (req.headers['x-request-id'] as string) ?? uuidv4();
  const startTime = Date.now();

  // Initializes the request context (AsyncLocalStorage)
  setRequestContext({ requestId, startTime });

  // Propagates requestId to the client (useful for debugging).
  res.setHeader('x-request-id', requestId);

  // Input log
  const { method, path, ip } = req;
  logger.http(`${method} ${path}`, {
    ip,
    userAgent: req.headers['user-agent'],

    ...(LOG_REQUEST_HEADERS && {
      headers: sanitizeFields(req.headers, SENSITIVE_HEADERS_FIELDS),
    }),

    ...(LOG_REQUEST_BODY && {
      body: sanitizeFields(req.body, SENSITIVE_BODY_FIELDS),
    }),
  });

  // Intercept res.json to log the response.
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const durationMs = Date.now() - startTime;

    const message = `${method} ${path} ${res.statusCode} ${durationMs}ms`;
    const meta = { statusCode: res.statusCode, durationMs };

    if (res.statusCode >= 500) {
      logger.error(message, meta);
    } else if (res.statusCode >= 400) {
      logger.warn(message, meta);
    } else {
      logger.http(message, meta);
    }

    return originalJson(body);
  };

  next();
}
