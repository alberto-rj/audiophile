import {
  ProductCreateParamsSchema,
  ProductFindManyParamsSchema,
  ProductIdParamsSchema,
  ProductSlugParamsSchema,
} from './product.params.schema';

export const ProductIdInputSchema = ProductIdParamsSchema.extend({});

export const ProductSlugInputSchema = ProductSlugParamsSchema.extend({});

export const ProductCreateInputSchema = ProductCreateParamsSchema.omit({
  slug: true,
});

export const ProductFindManyInputSchema = ProductFindManyParamsSchema.extend(
  {},
);
