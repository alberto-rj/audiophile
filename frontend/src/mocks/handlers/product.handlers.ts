import { delay, http, HttpResponse } from 'msw';

import { products } from '@/libs/mocks/products';
import type { Product } from '@/libs/types';

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

export const productHandlers = [
  http.get<never, never, Product[]>('/api/products', async () => {
    await delay(3 * 1000);

    return HttpResponse.json(sortProductsByNewFirst(products));
  }),

  http.get<{ slug: string }, never, Product>(
    '/api/products/:slug',
    async ({ params }) => {
      await delay(3 * 1000);

      const product = products.find((p) => p.slug === params.slug);

      if (!product) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(product);
    },
  ),
];
