import { z } from '@/config';
import { ApiProductSchema } from '../product/product.schema';

export const CategoryIdSchema = z.coerce.number({
  error: 'id must be a number.',
});

export const CategorySlugSchema = z.string({
  error: 'slug must be a string.',
});

export const CategoryImageSchema = z.url({
  error: 'image must be a url.',
});

export const CategoryNameSchema = z.string({
  error: 'image must be a string.',
});

export const CategoryDescriptionSchema = z.string({
  error: 'description must be a string.',
});

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  slug: CategorySlugSchema,
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});

export const ApiCategorySchema = z.object({
  id: CategoryIdSchema,
  slug: CategorySlugSchema,
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
  products: z.array(ApiProductSchema).optional(),
});

export const CategoryCreateParamsSchema = z.object({
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});

export const CategoryUpdateParamsSchema = z.object({
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});

export const CategoryFindByIdParamsSchema = z.object({
  id: CategoryIdSchema,
});

export const CategoryFindBySlugParamsSchema = z.object({
  slug: CategorySlugSchema,
});

export const CategoryDeleteByIdParamsSchema = z.object({
  id: CategoryIdSchema,
});

export const CategoryDeleteBySlugParamsSchema = z.object({
  slug: CategorySlugSchema,
});
