import { type Category } from '@audiophile/shared';

import { categoryRepository } from '@/config/repositories';
import { toCategoryFindManyInput } from '@/helpers/category';
import type { PaginateResult } from '@/helpers/paginate';

type FindCategoriesUseCaseParams = {
  input: unknown;
};

type FindCategoriesUseCaseResult = PaginateResult<Category>;

export async function findCategoriesUseCase({
  input,
}: FindCategoriesUseCaseParams): Promise<FindCategoriesUseCaseResult> {
  const { page, limit } = toCategoryFindManyInput(input);

  const result = await categoryRepository.findMany({ page, limit });

  return result;
}
