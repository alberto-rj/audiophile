import { type ProductDetailed } from '@audiophile/shared';

import { productRepository } from '@/config';
import { toProductFindManyInput, type PaginateResult } from '@/helpers';

type FindCategoriesUseCaseParams = {
  input: unknown;
};

type FindCategoriesUseCaseResult = PaginateResult<ProductDetailed>;

export async function findProductsUseCase({
  input,
}: FindCategoriesUseCaseParams): Promise<FindCategoriesUseCaseResult> {
  const { page, limit, categoryId } = toProductFindManyInput(input);

  const result = await productRepository.findMany({ categoryId, limit, page });

  return result;
}
