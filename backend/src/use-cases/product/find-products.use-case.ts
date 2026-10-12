import { productRepository } from '@/config';
import { toProductFindManyInput, type PaginateResult } from '@/helpers';
import { type ProductDetailed } from '@audiophile/shared';

type FindCategoriesUseCaseParams = {
  payload: unknown;
};

type FindCategoriesUseCaseResult = PaginateResult<ProductDetailed>;

export async function findProductsUseCase({
  payload,
}: FindCategoriesUseCaseParams): Promise<FindCategoriesUseCaseResult> {
  const { page, limit } = toProductFindManyInput(payload);

  const result = await productRepository.findMany({ page, limit });

  return result;
}
