import { type ProductDetailed } from '@audiophile/shared';

import { productRepository } from '@/config/repositories';
import type { PaginateResult } from '@/helpers/paginate';
import { toProductFindManyInput } from '@/helpers/product';

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
