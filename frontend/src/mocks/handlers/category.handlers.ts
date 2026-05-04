import { delay, http, HttpResponse } from 'msw';

import { products } from '@/libs/mocks/products';
import { categories } from '@/libs/mocks/categories';
import type { Category, Product } from '@/libs/types';

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

export const categoryHandlers = [
  http.get<never, never, Category[]>('/api/categories', async () => {
    await delay(3 * 1000);

    return HttpResponse.json(categories);
  }),

  http.get<{ slug: string }, never, Category>(
    '/api/categories/:slug',
    async ({ params }) => {
      await delay(3 * 1000);

      const foundCategory = categories.find(
        (category) => category.slug === params.slug,
      );

      if (!foundCategory) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(foundCategory);
    },
  ),

  http.get<{ slug: string }, Product[]>(
    '/api/categories/:slug/products',
    async ({ params }) => {
      await delay(3 * 1000);

      const foundCategory = categories.find(
        (category) => category.slug === params.slug,
      );

      if (!foundCategory) {
        return new HttpResponse(null, { status: 404 });
      }

      const filteredProducts = sortProductsByNewFirst(
        products.filter((p) => p.category === params.slug),
      );

      return HttpResponse.json({
        ...foundCategory,
        items: filteredProducts,
      });
    },
  ),
];
