import { orderRepository } from '@/config';
import { ResourceNotFoundError, toOrderFindInput } from '@/helpers';
import type { Order } from '@audiophile/shared';

type FindOrderUseCaseParams = {
  input: unknown;
};

type FindOrderUseCaseResult = {
  output: Order;
};

export async function findOrderUseCase({
  input,
}: FindOrderUseCaseParams): Promise<FindOrderUseCaseResult> {
  const { id, userId } = toOrderFindInput(input);

  const foundOrder = await orderRepository.findById({
    id,
    userId,
  });

  if (!foundOrder) {
    throw new ResourceNotFoundError('Order not found.');
  }

  return {
    output: foundOrder,
  };
}
