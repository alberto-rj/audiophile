import { categoryRepository } from '@/config';
import { ResourceNotFoundError, toCategorySlugInput } from '@/helpers';
import type { Category } from '@/schemas';

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

  const foundItem = await categoryRepository.findBySlug({ slug });

  if (!foundItem) {
    throw new ResourceNotFoundError('Category not found.');
  }

  return {
    output: foundItem,
  };
}
