import type { z } from '@/config';

import {
  ApiProductSchema,
  ProductBaseSchema,
  ProductDescriptionSchema,
  ProductFeaturesSchema,
  ProductIdSchema,
  ProductIsNewSchema,
  ProductNameSchema,
  ProductPriceSchema,
  ProductSchema,
  ProductSlugSchema,
} from './product.schema';

export type ProductId = z.infer<typeof ProductIdSchema>;

export type ProductSlug = z.infer<typeof ProductSlugSchema>;

export type ProductName = z.infer<typeof ProductNameSchema>;

export type ProductDescription = z.infer<typeof ProductDescriptionSchema>;

export type ProductFeatures = z.infer<typeof ProductFeaturesSchema>;

export type ProductIsNew = z.infer<typeof ProductIsNewSchema>;

export type ProductPrice = z.infer<typeof ProductPriceSchema>;

export type ProductBase = z.infer<typeof ProductBaseSchema>;

export type Product = z.infer<typeof ProductSchema>;

export type ApiProduct = z.infer<typeof ApiProductSchema>;
