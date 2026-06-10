import { z } from '@/config';

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
