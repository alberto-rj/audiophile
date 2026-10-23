import type { Order } from '@audiophile/shared';

import { orderRepository } from '@/config/repositories';
import { toOrderFindManyInput } from '@/helpers/order';
import type { PaginateResult } from '@/helpers/paginate';

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
