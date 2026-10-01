import { and, count, eq } from 'drizzle-orm';

import { getBaseResult, getOffset, type PaginateResult } from '@/helpers';
import { db, orderItems, orders } from '@/db/drizzle';
import type {
  Order as DrizzleOrder,
  OrderItem as DrizzleOrderItem,
} from '@/db/drizzle';
import type {
  OrderCreateParams,
  Order,
  OrderFindByIdParams,
  OrderFindManyParams,
  OrderItem,
} from '@/schemas';

import type { OrderRepository } from '../types/order-repository.types';

const ORDER_COLUMNS = {
  id: true,
  userId: true,
  name: true,
  email: true,
  status: true,
  paymentMethod: true,
  address: true,
  zip: true,
  city: true,
  country: true,
  subtotal: true,
  shipping: true,
  vat: true,
  grandTotal: true,
  createdAt: true,
  updatedAt: true,
} as const;

const ORDER_WITH = {
  items: {
    columns: {
      id: true,
      productId: true,
      orderId: true,
      image: true,
      name: true,
      price: true,
      quantity: true,
    },
  },
} as const;

function toOrder({
  order,
  items,
}: {
  order: DrizzleOrder;
  items: DrizzleOrderItem[];
}): Order {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = order;

  return {
    ...itemWithoutTimestamp,
    createdAt: createdAt.toISOString(),
    items: items.map(toOrderItem),
  };
}

function toOrderItem(item: DrizzleOrderItem): OrderItem {
  const { ...itemWithoutTimestamp } = item;

  return itemWithoutTimestamp;
}

export class DrizzleOrderRepository implements OrderRepository {
  async create({
    userId,
    name,
    email,
    address,
    zip,
    city,
    country,
    paymentMethod,
    items,
    subtotal,
    vat,
    shipping,
    grandTotal,
  }: OrderCreateParams): Promise<Order> {
    const { createdOrder, createdOrderItems } = await db.transaction(
      async (tx) => {
        const [createdOrder] = await tx
          .insert(orders)
          .values({
            userId,
            name,
            email,
            address,
            zip,
            city,
            country,
            paymentMethod,
            subtotal,
            shipping,
            vat,
            grandTotal,
          })
          .returning();

        const createdOrderItems = await tx
          .insert(orderItems)
          .values(
            items.map((item) => ({
              orderId: createdOrder!.id,
              ...item,
            })),
          )
          .returning();

        return {
          createdOrder,
          createdOrderItems,
        };
      },
    );

    return toOrder({ order: createdOrder!, items: createdOrderItems });
  }

  async findById({ id, userId }: OrderFindByIdParams): Promise<Order | null> {
    const foundOrder = await db.query.orders.findFirst({
      where: and(eq(orders.id, id), eq(orders.userId, userId)),
      columns: ORDER_COLUMNS,
      with: ORDER_WITH,
    });

    if (!foundOrder) {
      return null;
    }

    return toOrder({ order: foundOrder, items: foundOrder.items });
  }

  async findMany({
    userId,
    limit,
    page,
  }: OrderFindManyParams): Promise<PaginateResult<Order>> {
    const [foundOrders, [countResult]] = await Promise.all([
      db.query.orders.findMany({
        where: eq(orders.userId, userId),
        columns: ORDER_COLUMNS,
        with: ORDER_WITH,
        limit,
        offset: getOffset({ limit, page }),
      }),
      db
        .select({ totalCount: count() })
        .from(orders)
        .where(eq(orders.userId, userId)),
    ]);

    const totalItems = countResult!.totalCount;
    const result = getBaseResult({
      page: page,
      limit: limit,
      totalItems,
    });

    return {
      ...result,
      items: foundOrders.map((order) => toOrder({ order, items: order.items })),
    };
  }

  async clear(): Promise<void> {
    await db.delete(orders);
  }
}
