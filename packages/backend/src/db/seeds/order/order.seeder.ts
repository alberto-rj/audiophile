import {
  getProductItemSummary,
  type Order,
  type OrderCreateParams,
  type Product,
  type User,
} from '@audiophile/shared';

import { logger } from '@/helpers/logger';
import type { OrderRepository } from '@/repositories/types';

import type { OrderSeed } from './order.seeds';

type RunParams = {
  orders: OrderSeed[];
  products: Product[];
  users: User[];
};

type ToCreateParams = {
  order: OrderSeed;
  products: Product[];
  users: User[];
};

export class OrderSeeder {
  constructor(private orderRepository: OrderRepository) {}

  static toCreateParams({
    order: { email, address, zip, city, country, paymentMethod, items },
    users,
    products,
  }: ToCreateParams): OrderCreateParams {
    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) {
      throw new Error(`Cannot find user with email "${email}" for order.`);
    }

    const orderItems = items.map((item) => {
      const foundProduct = products.find(
        (product) => product.name === item.name,
      );

      if (!foundProduct) {
        throw new Error(
          `Cannot find product called "${item.name}" for order item.`,
        );
      }

      return {
        productId: foundProduct.id,
        image: foundProduct.image,
        price: foundProduct.price,
        name: item.name,
        quantity: item.quantity,
      };
    });

    return {
      userId: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      address,
      zip,
      city,
      country,
      paymentMethod: paymentMethod as Order['paymentMethod'],
      items: orderItems,
      ...getProductItemSummary(orderItems),
    };
  }

  async run({ orders, products, users }: RunParams): Promise<Order[]> {
    const createdOrders: Order[] = [];

    const paramsList = orders.map((order) =>
      OrderSeeder.toCreateParams({ order, products, users }),
    );

    for (const params of paramsList) {
      const createdOrder = await this.orderRepository.create(params);
      createdOrders.push(createdOrder);
    }

    return createdOrders;
  }

  async safeRun({ orders, products, users }: RunParams): Promise<Order[]> {
    try {
      logger.info('Seeding "orders"...');
      const createdOrders = await this.run({ orders, products, users });
      logger.info('"orders" was successfully seeded.');
      return createdOrders;
    } catch (error) {
      logger.error('Failed to seed "orders".', error);
      process.exit(1);
    }
  }
}
