import {
  CategoryCreateInputSchema,
  CategoryFindBySlugInputSchema,
  CategoryFindManyInputSchema,
  CategoryIdInputSchema,
  CategorySlugInputSchema,
  CategoryUpdateInputSchema,
  type CategoryCreateInput,
  type CategoryFindBySlugInput,
  type CategoryFindManyInput,
  type CategoryIdInput,
  type CategorySlugInput,
  type CategoryUpdateInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toCategoryCreateInput(data: unknown): CategoryCreateInput {
  return parseSchema(CategoryCreateInputSchema, data);
}

export function toCategoryFindBySlugInput(
  data: unknown,
): CategoryFindBySlugInput {
  return parseSchema(CategoryFindBySlugInputSchema, data);
}

export function toCategoryFindManyInput(data: unknown): CategoryFindManyInput {
  return parseSchema(CategoryFindManyInputSchema, data);
}

export function toCategoryIdInput(data: unknown): CategoryIdInput {
  return parseSchema(CategoryIdInputSchema, data);
}

export function toCategorySlugInput(data: unknown): CategorySlugInput {
  return parseSchema(CategorySlugInputSchema, data);
}

export function toCategoryUpdateInput(data: unknown): CategoryUpdateInput {
  return parseSchema(CategoryUpdateInputSchema, data);
}
