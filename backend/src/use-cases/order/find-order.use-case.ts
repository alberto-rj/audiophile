import { orderRepository } from '@/config';
import {
  ForbiddenError,
  ResourceNotFoundError,
  toOrderFindInput,
} from '@/helpers';
import type { Order } from '@/schemas';

type FindOrderUseCaseParams = {
  payload: unknown;
};

type FindOrderUseCaseResult = {
  item: Order;
};

export async function findOrderUseCase({
  payload,
}: FindOrderUseCaseParams): Promise<FindOrderUseCaseResult> {
  const { id, userId } = toOrderFindInput(payload);

  const foundOrder = await orderRepository.findById({
    id,
  });

  if (!foundOrder) {
    throw new ResourceNotFoundError('Order not found.');
  }

  if (foundOrder.userId !== userId) {
    throw new ForbiddenError('Not allowed to access order.');
  }

  return {
    item: foundOrder,
  };
}
