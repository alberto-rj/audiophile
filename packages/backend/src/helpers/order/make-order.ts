import type { Order, OrderCreateParams } from '@audiophile/shared';

import { makeId } from '../make-id';

export function makeOrder({
  items,
  ...remainingFields
}: OrderCreateParams): Order {
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
    ...remainingFields,
  };
}
