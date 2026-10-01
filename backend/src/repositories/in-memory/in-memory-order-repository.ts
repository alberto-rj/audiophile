import { db } from '@/db/in-memory';
import { makeOrder, paginate, type PaginateResult } from '@/helpers';
import type {
  OrderCreateParams,
  Order,
  OrderFindByIdParams,
  OrderFindManyParams,
} from '@/schemas';

import type { OrderRepository } from '../types/order-repository.types';

export class InMemoryOrderRepository implements OrderRepository {
  async create(params: OrderCreateParams): Promise<Order> {
    const createdOrder = makeOrder(params);
    db.orders.set(createdOrder.id, createdOrder);

    createdOrder.items.forEach((orderItem) =>
      db.orderItems.set(orderItem.id, orderItem),
    );

    return createdOrder;
  }

  async findById({ id, userId }: OrderFindByIdParams): Promise<Order | null> {
    const foundOrder = Array.from(db.orders.values()).find(
      (order) => order.id == id && order.userId == userId,
    );

    if (!foundOrder) {
      return null;
    }

    return foundOrder;
  }

  async findMany({
    userId,
    limit,
    page,
  }: OrderFindManyParams): Promise<PaginateResult<Order>> {
    const items = Array.from(db.orders.values()).filter(
      (order) => order.userId == userId,
    );

    const foundItems = paginate({ items, page, limit });

    return foundItems;
  }

  async clear(): Promise<void> {
    db.orders.clear();
  }
}
