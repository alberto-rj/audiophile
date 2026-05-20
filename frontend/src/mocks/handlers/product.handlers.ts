import { http, HttpResponse } from 'msw';

import { products } from '@/libs/mocks/products';
import type {
  Product,
  ProductListResponse,
  ProductResponse,
} from '@/libs/types';
import { withDelay } from '../middlewares/with-delay';

function sortProductsByNewFirst(products: Product[]) {
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

export const getProductBySlug = http.get(
  '/api/products/:slug',
  withDelay(async ({ params }) => {
    const { slug } = params as { slug?: string };

    const foundProduct = products.find(
      (p) => p.slug.toLowerCase() === slug?.toLowerCase(),
    );

    if (!foundProduct) {
      return new HttpResponse(undefined, { status: 404 });
    }

    const response: ProductResponse = {
      product: foundProduct,
    };

    return HttpResponse.json(response);
  }),
);

export const getProducts = http.get(
  '/api/products',
  withDelay(async () => {
    const response: ProductListResponse = {
      products: sortProductsByNewFirst(products),
    };

    return HttpResponse.json(response);
  }),
);

export const productHandlers = [getProducts, getProductBySlug];
