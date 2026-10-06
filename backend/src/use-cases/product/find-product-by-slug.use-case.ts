import { productRepository } from '@/config';
import { makeProductFindBySlugParams, ResourceNotFoundError } from '@/helpers';
import { type ProductDetailed } from '@audiophile/shared';

interface FindProductBySlugUseCaseParams {
  payload: unknown;
}

interface FindProductBySlugUseCaseResult {
  item: ProductDetailed;
}

export async function findProductBySlugUseCase({
  payload,
}: FindProductBySlugUseCaseParams): Promise<FindProductBySlugUseCaseResult> {
  const { slug } = makeProductFindBySlugParams(payload);

  const foundItem = await productRepository.findBySlug({ slug });

  if (!foundItem) {
    throw new ResourceNotFoundError('Product not found.');
  }

  return {
    item: foundItem,
  };
}
