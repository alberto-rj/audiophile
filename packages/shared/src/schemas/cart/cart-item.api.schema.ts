import { z } from '@/config';
import {
  CartItemIdSchema,
  CartItemQuantitySchema,
} from './cart-item.base.schema';
import {
  ProductIdSchema,
  ProductNameSchema,
  ProductPriceSchema,
  ProductSlugSchema,
} from '../product/product.base.schema';
import { ResponsiveImageSchema } from '../common/common.schema';

export const ApiCartItemSchema = z.object({
  id: CartItemIdSchema,
  quantity: CartItemQuantitySchema,
  productId: ProductIdSchema,
  name: ProductNameSchema,
  price: ProductPriceSchema,
  slug: ProductSlugSchema,
  image: ResponsiveImageSchema,
});
