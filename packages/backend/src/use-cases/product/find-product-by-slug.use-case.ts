import { type ProductDetailed } from '@audiophile/shared';

import { productRepository } from '@/config/repositories';
import { ResourceNotFoundError } from '@/helpers/app-error';
import { toProductSlugInput } from '@/helpers/product';

interface FindProductBySlugUseCaseParams {
  payload: unknown;
}

interface FindProductBySlugUseCaseResult {
  item: ProductDetailed;
}

export async function findProductBySlugUseCase({
  payload,
}: FindProductBySlugUseCaseParams): Promise<FindProductBySlugUseCaseResult> {
  const { slug } = toProductSlugInput(payload);

  const foundItem = await productRepository.findBySlug({ slug });

  if (!foundItem) {
    throw new ResourceNotFoundError('Product not found.');
  }

  return {
    item: foundItem,
  };
}
