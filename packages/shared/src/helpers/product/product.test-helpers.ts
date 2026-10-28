import type { Product, ProductCreateParams } from '@/schemas';

import { makeId } from '../make-id';
import { toSlug } from '../to-slug';

import { isNewProduct } from './product.helpers';

export function makeProduct({ name, ...rest }: ProductCreateParams): Product {
  return {
    ...rest,
    name,
    id: makeId(),
    slug: toSlug(name),
    isNew: isNewProduct(new Date()),
  };
}
