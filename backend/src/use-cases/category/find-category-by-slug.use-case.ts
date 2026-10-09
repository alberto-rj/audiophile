import type { Category, ProductDetailed } from '@audiophile/shared';

import { categoryRepository, productRepository } from '@/config';
import {
  paginate,
  ResourceNotFoundError,
  toCategoryFindBySlugInput,
  type PaginateResult,
} from '@/helpers';

interface FindCategoryBySlugUseCaseParams {
  input: unknown;
}

interface FindCategoryBySlugUseCaseResult {
  category: Category;
  productPaginationResult: PaginateResult<ProductDetailed>;
}

export async function findCategoryBySlugUseCase({
  input,
}: FindCategoryBySlugUseCaseParams): Promise<FindCategoryBySlugUseCaseResult> {
  const { slug, includeProducts, limit, page } =
    toCategoryFindBySlugInput(input);

  const foundCategory = await categoryRepository.findBySlug({ slug });

  if (!foundCategory) {
    throw new ResourceNotFoundError('Category not found.');
  }

  if (!includeProducts) {
    return {
      category: foundCategory,
      productPaginationResult: paginate({ items: [], limit, page }),
    };
  }

  const productsPaginationResults = await productRepository.findMany({
    category: foundCategory.name,
    limit,
    page,
  });

  return {
    category: foundCategory,
    productPaginationResult: productsPaginationResults,
  };
}
