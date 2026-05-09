import { delay, http, HttpResponse } from 'msw';

import { orders } from '@/libs/mocks/orders';
import type { CreateOrderPayload, Order } from '@/libs/types';

import { withAuth } from '../middlewares/with-auth';

export const orderHandlers = [
  http.post(
    '/api/orders',

    withAuth(async ({ request }) => {
      await delay(3 * 1000);

      const payload = (await request.json()) as CreateOrderPayload;

      const createdOrder: Order = {
        ...payload,
        status: 'pending',
        id: orders.length + 1,
        createdAt: new Date().toISOString(),
      };

      orders.push(createdOrder);

      return HttpResponse.json({ order: createdOrder }, { status: 201 });
    }),
  ),

  http.get(
    '/api/orders',

    withAuth(async () => {
      await delay(3 * 1000);

      return HttpResponse.json({ orders });
    }),
  ),

  http.get(
    '/api/orders/:slug',

    withAuth(async ({ params }) => {
      await delay(3 * 1000);

      const { slug } = params as { slug?: string };

      const foundOrder = orders.find((order) => order.id === Number(slug));

      if (typeof foundOrder === 'undefined') {
        HttpResponse.json(undefined, { status: 404 });
      }

      return HttpResponse.json(foundOrder);
    }),
  ),
];
