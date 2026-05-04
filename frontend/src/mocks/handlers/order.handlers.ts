import { delay, http, HttpResponse } from 'msw';

import { orders } from '@/libs/mocks/orders';
import type { CreateOrderPayload, CreateOrderResponse } from '@/libs/types';

export const orderHandlers = [
  http.post<never, CreateOrderPayload, CreateOrderResponse>(
    '/api/orders',
    async ({ request }) => {
      await delay(3 * 1000);

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
