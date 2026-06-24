import { productRepository } from '@/config';
import { type PaginateResult } from '@/helpers';
import { makeProductFindManyParams, type ProductDetailed } from '@/schemas';

type FindCategoriesUseCaseParams = {
  payload: unknown;
};

type FindCategoriesUseCaseResult = PaginateResult<ProductDetailed>;

export async function findProductsUseCase({
  payload,
}: FindCategoriesUseCaseParams): Promise<FindCategoriesUseCaseResult> {
  const { page, limit } = makeProductFindManyParams(payload);

  const result = await productRepository.findMany({ page, limit });

  return result;
}
