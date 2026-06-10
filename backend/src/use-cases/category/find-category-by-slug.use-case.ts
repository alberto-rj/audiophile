import { categoryRepository } from '@/config';
import { ResourceNotFoundError } from '@/helpers';
import { makeCategoryFindBySlugParams, type Category } from '@/schemas';

interface FindCategoryBySlugUseCaseParams {
  payload: unknown;
}

interface FindCategoryBySlugUseCaseResult {
  item: Category;
}

export async function findCategoryBySlugUseCase({
  payload,
}: FindCategoryBySlugUseCaseParams): Promise<FindCategoryBySlugUseCaseResult> {
  const { slug } = makeCategoryFindBySlugParams(payload);

  const foundItem = await categoryRepository.findBySlug({ slug });

  if (!foundItem) {
    throw new ResourceNotFoundError('Category not found.');
  }

  return {
    item: foundItem,
  };
}
