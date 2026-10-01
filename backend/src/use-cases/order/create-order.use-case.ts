import { orderRepository } from '@/config';
import { toOrderCreateInput } from '@/helpers';
import type { Order } from '@/schemas';

type CreateOrderUseCaseParams = {
  input: unknown;
};

type CreateOrderUseCaseResult = {
  output: Order;
};

export async function createOrderUseCase({
  input,
}: CreateOrderUseCaseParams): Promise<CreateOrderUseCaseResult> {
  const {
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
    shipping,
    vat,
    grandTotal,
  } = toOrderCreateInput(input);

  const createdOrder = await orderRepository.create({
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
    shipping,
    vat,
    grandTotal,
  });

  return {
    output: createdOrder,
  };
}
