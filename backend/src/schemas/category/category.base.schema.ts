import { z } from '@/config';

export const CategoryIdSchema = z.coerce
  .number({
    error: 'id must be a number.',
  })
  .openapi({
    description: 'Unique identifier of the category.',
    example: 1,
    readOnly: true,
  });

export const CategorySlugSchema = z
  .string({
    error: 'slug must be a string.',
  })
  .min(1, { error: 'slug is required' })
  .openapi({
    description: 'Human-readable unique identifier used in URLs.',
    example: 'headphones',
  });

export const CategoryImageSchema = z
  .url({
    error: 'image must be a url.',
  })
  .openapi({
    description: 'URL of the category image.',
    example: 'https://cdn.audiophile.com/images/categories/headphones.png',
  });

export const CategoryNameSchema = z
  .string({
    error: 'name must be a string.',
  })
  .min(1, { error: 'name is required.' })
  .max(50, { error: 'name cannot exceed 50 characters.' })
  .openapi({
    description: 'Display name of the category.',
    example: 'Headphones',
  });

export const CategoryDescriptionSchema = z
  .string({
    error: 'description must be a string.',
  })
  .max(255, { error: 'description cannot exceed 255 characters.' })
  .nullable()
  .openapi({
    description: 'Short description of the category.',
    example:
      'Explore our collection of premium headphones designed for exceptional sound quality.',
  });
