import { z } from '@/config';

export const ProductIdSchema = z.coerce
  .number({
    error: 'id must be a number.',
  })
  .int()
  .positive();

export const ProductSlugSchema = z.string({
  error: 'slug must be a string.',
});

export const ProductNameSchema = z.string({
  error: 'name must be a string.',
});

export const ProductImageSchema = z.string({
  error: 'image must be a string.',
});

export const ProductDescriptionSchema = z.string({
  error: 'description must be a string.',
});

export const ProductCategorySchema = z
  .string({
    error: 'category must be a string.',
  })
  .openapi({
    description: 'Product category.',
    example: 'Headphones',
  });

export const ProductFeaturesSchema = z.string({
  error: 'features must be a string.',
});

export const ProductIsNewSchema = z
  .enum(['true', 'false'], {
    error: 'isNew must be a "true" or "false".',
  })
  .transform((value) => value === 'true');

export const ProductPriceSchema = z
  .number({
    error: 'price must be a number.',
  })
  .int({ error: 'price must be an integer.' })
  .nonnegative({ error: 'price must be equal or greater than 0.' });
