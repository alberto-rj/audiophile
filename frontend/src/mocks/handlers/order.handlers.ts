import { http, HttpResponse } from 'msw';

import { orders } from '@/libs/mocks/orders';
import type { CreateOrderPayload, Order } from '@/libs/types';

import { withAuth } from '../middlewares/with-auth';

export const getOrders = http.get(
  '/api/orders',

  withAuth(async () => {
    return HttpResponse.json({ orders });
  }),
);

export const getOrderById = http.get(
  '/api/orders/:slug',

  withAuth(async ({ params }) => {
    const { slug } = params as { slug?: string };

    const foundOrder = orders.find((order) => order.id === Number(slug));

    if (typeof foundOrder === 'undefined') {
      HttpResponse.json(undefined, { status: 404 });
    }

    return HttpResponse.json({ order: foundOrder });
  }),
);

export const createOrder = http.post(
  '/api/orders',

  withAuth(async ({ request }) => {
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
);

export const orderHandlers = [getOrders, getOrderById, createOrder];
