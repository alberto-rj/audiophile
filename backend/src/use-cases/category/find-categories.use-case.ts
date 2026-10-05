import { categoryRepository } from '@/config';
import { toCategoryFindManyInput, type PaginateResult } from '@/helpers';
import { type Category } from '@/schemas';

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
