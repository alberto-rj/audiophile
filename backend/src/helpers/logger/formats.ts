import { format } from 'winston';

import { getRequestContext } from './context';

// Automatically injects the request context into each log
const injectContext = format((info) => {
  const ctx = getRequestContext();

  if (ctx) {
    if (ctx.requestId) {
      info.requestId = ctx.requestId;
    }

    if (ctx.userId) {
      info.userId = ctx.userId;
    }
  }

  return info;
});

// Colorful and legible format for development
export const devFormat = format.combine(
  injectContext(),
  format.timestamp({ format: 'HH:mm:ss' }),
  format.colorize({ all: true }),
  format.printf(({ timestamp, level, message, requestId, ...meta }) => {
    const rid = requestId ? `[${requestId}]` : '';
    const extra = Object.keys(meta).length ? '' + JSON.stringify(meta) : '';

    return `${timestamp} ${level} ${rid}${message}${extra}`;
  }),
);

// JSON format for production - one line per log
export const prodFormat = format.combine(
  injectContext(),
  format.timestamp(),
  format.errors({ stack: true }), // Includes stack trace in JSON
  format.json(),
);
