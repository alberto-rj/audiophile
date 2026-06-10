import { categoryRepository } from '@/config';
import { type PaginateResult } from '@/helpers';
import { makeCategoryFindManyParams, type Category } from '@/schemas';

type FindCategoriesUseCaseParams = {
  payload: unknown;
};

type FindCategoriesUseCaseResult = PaginateResult<Category>;

export async function findCategoriesUseCase({
  payload,
}: FindCategoriesUseCaseParams): Promise<FindCategoriesUseCaseResult> {
  const { page, limit } = makeCategoryFindManyParams(payload);

  const result = await categoryRepository.findMany({ page, limit });

  return result;
}
