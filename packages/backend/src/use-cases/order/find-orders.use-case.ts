import { orderRepository } from '@/config';
import { toOrderFindManyInput, type PaginateResult } from '@/helpers';
import type { Order } from '@audiophile/shared';

type FindOrdersUseCaseParams = {
  input: unknown;
};

type FindOrdersUseCaseResult = {
  output: PaginateResult<Order>;
};

export async function findOrdersUseCase({
  input,
}: FindOrdersUseCaseParams): Promise<FindOrdersUseCaseResult> {
  const { userId, limit, page } = toOrderFindManyInput(input);

  const result = await orderRepository.findMany({
    userId,
    limit,
    page,
  });

  return {
    output: result,
  };
}
