import type { Order, OrderCreateParams } from '@/schemas';

import { makeId } from '../make-id';

export function makeOrder({ items, ...orderFields }: OrderCreateParams): Order {
  const orderId = makeId();

  return {
    id: orderId,
    status: 'pending',
    createdAt: new Date().toISOString(),
    items: items.map((item) => ({
      id: makeId(),
      orderId: orderId,
      ...item,
    })),
    ...orderFields,
  };
}
