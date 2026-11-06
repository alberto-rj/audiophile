import {
  ProductCreateInputSchema,
  ProductIdInputSchema,
  ProductFindManyInputSchema,
  ProductSlugInputSchema,
} from '@audiophile/shared';
import type {
  ProductCreateInput,
  ProductFindManyInput,
  ProductIdInput,
  ProductSlugInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

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
