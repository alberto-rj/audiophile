import type { Category } from '@audiophile/shared';

import { categoryRepository } from '@/config/repositories';
import { ResourceNotFoundError } from '@/helpers/app-error';
import { toCategorySlugInput } from '@/helpers/category';

interface FindCategoryBySlugUseCaseParams {
  input: unknown;
}

interface FindCategoryBySlugUseCaseResult {
  output: Category;
}

export async function findCategoryBySlugUseCase({
  input,
}: FindCategoryBySlugUseCaseParams): Promise<FindCategoryBySlugUseCaseResult> {
  const { slug } = toCategorySlugInput(input);

  const foundCategory = await categoryRepository.findBySlug({ slug });

  if (!foundCategory) {
    throw new ResourceNotFoundError('Category not found.');
  }

  return {
    output: foundCategory,
  };
}
