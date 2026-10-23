import type {
  Order,
  OrderCreateParams,
  Product,
  User,
} from '@audiophile/shared';

import { orderRepository } from '@/config/repositories';
import { type Order as OrderMock } from '@/db/mocks';
import { logger } from '@/helpers/logger';
import { getProductItemSummary } from '@/helpers/product';

type CreateOrdersParams = {
  orders: OrderMock[];
  products: Product[];
  users: User[];
};

function toOrderCreateParamsList({
  orders,
  products,
  users,
}: CreateOrdersParams): OrderCreateParams[] {
  return orders.map(
    ({ email, address, zip, city, country, paymentMethod, items }) => {
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
    },
  );
}

export async function createOrders({
  orders,
  products,
  users,
}: CreateOrdersParams): Promise<Order[]> {
  const createdOrders: Order[] = [];

  const creationOrders = toOrderCreateParamsList({ orders, products, users });

  for (const order of creationOrders) {
    const createdOrder = await orderRepository.create(order);
    createdOrders.push(createdOrder);
  }

  return createdOrders;
}

export async function seedOrders({
  orders,
  products,
  users,
}: CreateOrdersParams): Promise<Order[]> {
  try {
    logger.info('Seeding "orders"...');
    const createdOrders = await createOrders({ orders, products, users });
    logger.info('"orders" was successfully seeded.');
    return createdOrders;
  } catch (error) {
    logger.error('Failed to seed "orders".', error);
    process.exit(1);
  }
}
