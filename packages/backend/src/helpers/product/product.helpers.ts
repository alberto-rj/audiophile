import {
  ProductCreateInputSchema,
  ProductIdInputSchema,
  ProductFindManyInputSchema,
  ProductSlugInputSchema,
  makeId,
  toSlug,
} from '@audiophile/shared';
import type {
  Product,
  ProductCreateInput,
  ProductCreateParams,
  ProductFindManyInput,
  ProductIdInput,
  ProductSlugInput,
} from '@audiophile/shared';

import { isNewProduct } from './is-new-product';

import { parseSchema } from '../parse-schema';

export function makeProduct({ name, ...rest }: ProductCreateParams): Product {
  return {
    ...rest,
    name,
    id: makeId(),
    slug: toSlug(name),
    isNew: isNewProduct(new Date()),
  };
}

export function toProductCreateInput(data: unknown): ProductCreateInput {
  return parseSchema(ProductCreateInputSchema, data);
}

export function toProductIdInput(data: unknown): ProductIdInput {
  return parseSchema(ProductIdInputSchema, data);
}

export function toProductSlugInput(data: unknown): ProductSlugInput {
  return parseSchema(ProductSlugInputSchema, data);
}

export function toProductFindManyInput(data: unknown): ProductFindManyInput {
  return parseSchema(ProductFindManyInputSchema, data);
}
