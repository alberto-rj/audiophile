import type {
  ApiProduct,
  ApiProductPaginationResponse,
  ApiProductResultListResponse,
} from '@audiophile/shared';
import { http, HttpResponse } from 'msw';

import { products } from '@/libs/mocks/products';

import { withDelay, withInfiniteDelay } from '../middlewares/with-delay';

function sortProductsByNewFirst(products: ApiProduct[]) {
  return [...products].sort((a, b) => {
    if (a.isNew && b.isNew) {
      return 0;
    }

    if (a.isNew && !b.isNew) {
      return -1;
    }

    return 1;
  });
}

export function makeGetProductsHandler(
  options: { type?: 'error' | 'infinite' | 'default'; limit?: number } = {},
) {
  const endpoint = '/api/products';

  const { type = 'default', limit = products.length } = options;

  if (type === 'infinite') {
    return http.get(
      endpoint,
      withInfiniteDelay(async () => {
        return HttpResponse.json(undefined);
      }),
    );
  }

  if (type === 'error') {
    return http.get(
      endpoint,
      withDelay(async () => {
        return HttpResponse.json(undefined, { status: 500 });
      }),
    );
  }

  return http.get(
    endpoint,
    withDelay(async () => {
      const response: ApiProductPaginationResponse = {
        results: sortProductsByNewFirst(products.slice(0, limit)),
        pagination: {
          hasNext: false,
          hasPrev: false,
          page: 1,
          totalPages: 1,
        },
      };

      return HttpResponse.json(response);
    }),
  );
}

export function makeGetProductBySlugHandler(
  options: { type?: 'error' | 'infinite' | 'default' } = {},
) {
  const endpoint = '/api/products/:slug';

  const { type = 'default' } = options;

  if (type === 'infinite') {
    return http.get(
      endpoint,
      withInfiniteDelay(async () => {
        return HttpResponse.json(undefined);
      }),
    );
  }

  if (type === 'error') {
    return http.get(
      endpoint,
      withDelay(async () => {
        return HttpResponse.json(undefined, { status: 500 });
      }),
    );
  }

  return http.get(
    endpoint,
    withDelay(async ({ params }) => {
      const { slug } = params as { slug?: string };

      const foundProduct = products.find(
        (p) => p.slug.toLowerCase() === slug?.toLowerCase(),
      );

      if (!foundProduct) {
        return new HttpResponse(undefined, { status: 404 });
      }

      const response: ApiProductResultListResponse = {
        results: [foundProduct],
      };

      return HttpResponse.json(response);
    }),
  );
}

export const productHandlers = [
  makeGetProductsHandler(),
  makeGetProductBySlugHandler(),
];
