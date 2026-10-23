import type { Order } from '@audiophile/shared';

import { cartRepository, orderRepository } from '@/config/repositories';
import { toOrderCreateInput, EmptyOrderError } from '@/helpers/order';
import { getProductItemSummary } from '@/helpers/product';

type CreateOrderUseCaseParams = {
  input: unknown;
};

type CreateOrderUseCaseResult = {
  output: Order;
};

export async function createOrderUseCase({
  input,
}: CreateOrderUseCaseParams): Promise<CreateOrderUseCaseResult> {
  const { userId, name, email, address, zip, city, country, paymentMethod } =
    toOrderCreateInput(input);

  const userCart = await cartRepository.findByUserId({ userId });

  if (!userCart) {
    throw new EmptyOrderError('Cannot create order with no item.');
  }

  const orderItems = userCart.items.map(
    ({ productId, image, name, price, quantity }) => ({
      productId,
      image,
      name,
      price,
      quantity,
    }),
  );

  const { subtotal, shipping, vat, grandTotal } =
    getProductItemSummary(orderItems);

  const createdOrder = await orderRepository.create({
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
    items: orderItems,
  });

  return {
    output: createdOrder,
  };
}
