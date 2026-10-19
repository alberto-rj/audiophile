import { AsyncLocalStorage } from 'async_hooks';

import type { RequestContext } from './logger.types';

/**
 * Storage singleton - one instance for the entire app.
 */
export const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

/**
 * Initialize context (called by requestLogger)
 */
export function setRequestContext(ctx: RequestContext) {
  const store = asyncLocalStorage.getStore();

  if (store) {
    Object.assign(store, ctx);
  }
}

/**
 * Update context (e.g., add userId after authentication)
 */
export function updateRequestContext(update: Partial<RequestContext>) {
  const store = asyncLocalStorage.getStore();

  if (store) {
    Object.assign(store, update);
  }
}

/**
 * Read context (used by the log formatter)
 */
export function getRequestContext() {
  return asyncLocalStorage.getStore();
}
