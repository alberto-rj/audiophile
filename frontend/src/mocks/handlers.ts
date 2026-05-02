import { http, HttpResponse } from 'msw';

import { products } from '@/libs/mocks/products';
import { categories } from '@/libs/mocks/categories';
import type {
  Category,
  CreateOrderPayload,
  CreateOrderResponse,
  Product,
} from '@/libs/types';
import { orders } from '@/libs/mocks/orders';

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

export const handlers = [
  http.get<never, never, Category[]>('/api/categories', async () => {
    await new Promise((r) => setTimeout(r, 1000 * categories.length));

    return HttpResponse.json(categories);
  }),

  http.get<{ slug: string }, never, Category>(
    '/api/categories/:slug',
    async ({ params }) => {
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

  http.get<never, never, Product[]>('/api/products', async () => {
    return HttpResponse.json(sortProductsByNewFirst(products));
  }),

  http.get<{ slug: string }, never, Product>(
    '/api/products/:slug',
    ({ params }) => {
      const product = products.find((p) => p.slug === params.slug);

      if (!product) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(product);
    },
  ),

  http.post<never, CreateOrderPayload, CreateOrderResponse>(
    '/api/orders',
    async ({ request }) => {
      const payload = await request.json();

      const createdOrder = {
        ...payload,
        id: orders.length + 1,
        number: `ORDER-${orders.length + 1}`,
        createdAt: new Date().toISOString(),
      };

      return HttpResponse.json(createdOrder, { status: 201 });
    },
  ),
];
