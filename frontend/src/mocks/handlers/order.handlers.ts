import { http, HttpResponse } from 'msw';

import { orders } from '@/libs/mocks/orders';
import type {
  CreateOrderPayload,
  Order,
  OrderListResponse,
  OrderResponse,
} from '@/libs/types';
import {
  cart,
  getGrandTotal,
  getShipping,
  getSubtotal,
  getVAT,
} from '@/libs/mocks';

import { withAuth } from '../middlewares/with-auth';
import { withDelay, withInfiniteDelay } from '../middlewares/with-delay';
import {
  makeGetInfiniteHandler,
  makeGetStatusHandler,
  makeInfiniteHandler,
  makeNotFoundHandler,
} from '.';

export const makeGetOrderHandler = (
  options: { type?: 'error' | 'infinite' | 'default' } = {},
) => {
  const { type = 'default' } = options;
  const endpoint = '/api/orders/:slug';

  if (type === 'infinite') {
    return makeGetInfiniteHandler(endpoint);
  }

  if (type === 'error') {
    return makeGetStatusHandler(endpoint, 500);
  }

  return http.get(
    endpoint,

    withDelay(
      withAuth(async ({ params }) => {
        const { slug } = params as { slug?: string };

        const foundOrder = orders.find((order) => order.id === Number(slug));

        if (typeof foundOrder === 'undefined') {
          return HttpResponse.json(undefined, { status: 404 });
        }

        const response: OrderResponse = {
          order: foundOrder,
        };

        return HttpResponse.json(response);
      }),
    ),
  );
};

export const makeGetOrdersHandler = (
  options: { type?: 'error' | 'infinite' | 'default'; limit?: number } = {},
) => {
  const { type = 'default', limit = orders.length } = options;

  const endpoint = '/api/orders';

  if (type === 'error') {
    return makeNotFoundHandler(endpoint);
  }

  if (type === 'infinite') {
    return makeInfiniteHandler(endpoint);
  }

  return http.get(
    endpoint,

    withDelay(
      withAuth(async () => {
        const response: OrderListResponse = {
          orders: orders.slice(0, limit),
        };

        return HttpResponse.json(response);
      }),
    ),
  );
};

export const makeCreateOrderHandler = (
  options: {
    type?: 'error' | 'infinite' | 'default';
  } = {},
) => {
  const { type = 'default' } = options;

  const endpoint = '/api/orders';

  if (type === 'error') {
    return http.post(
      endpoint,

      withDelay(
        withAuth(async () => {
          return HttpResponse.json(undefined, { status: 500 });
        }),
      ),
    );
  }

  if (type === 'infinite') {
    return http.post(
      endpoint,
      withAuth(
        withInfiniteDelay(async () => {
          return HttpResponse.json(undefined, { status: 201 });
        }),
      ),
    );
  }

  return http.post(
    endpoint,

    withDelay(
      withAuth(async ({ request }) => {
        const payload = (await request.json()) as CreateOrderPayload;

        const orderId = orders.length + 1;
        const createdOrder: Order = {
          ...payload,
          id: orderId,
          status: 'pending',
          items: cart.items.map((item) => ({
            ...item,
            orderId,
            image: item.image.mobile,
          })),
          vat: getVAT(cart.items),
          shipping: getShipping(),
          subtotal: getSubtotal(cart.items),
          grandTotal: getGrandTotal(cart.items),
          createdAt: new Date().toISOString(),
        };

        orders.push(createdOrder);

        const response: OrderResponse = {
          order: createdOrder,
        };

        return HttpResponse.json(response, { status: 201 });
      }),
    ),
  );
};

export const orderHandlers = [
  makeGetOrdersHandler(),
  makeGetOrderHandler(),
  makeCreateOrderHandler(),
];
