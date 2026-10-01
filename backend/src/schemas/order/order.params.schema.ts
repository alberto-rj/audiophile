import { z } from '@/config';

import {
  OrderAddressSchema,
  OrderCitySchema,
  OrderCountrySchema,
  OrderGrandTotalSchema,
  OrderIdSchema,
  OrderItemQuantitySchema,
  OrderPaymentMethodSchema,
  OrderShippingSchema,
  OrderSubtotalSchema,
  OrderVatSchema,
  OrderZipSchema,
} from './order.base.schema';
import {
  UserEmailSchema,
  UserIdSchema,
  UserNameSchema,
} from '../user/user.schema';
import {
  ProductIdSchema,
  ProductImageSchema,
  ProductNameSchema,
  ProductPriceSchema,
} from '../product/product.base.schema';
import { LimitSchema, PageSchema } from '../common/common.schema';

export const OrderCreateParamsSchema = z.object({
  userId: UserIdSchema,
  name: UserNameSchema,
  email: UserEmailSchema,
  address: OrderAddressSchema,
  zip: OrderZipSchema,
  city: OrderCitySchema,
  country: OrderCountrySchema,
  paymentMethod: OrderPaymentMethodSchema,
  items: z.array(
    z.object({
      productId: ProductIdSchema,
      image: ProductImageSchema,
      name: ProductNameSchema,
      price: ProductPriceSchema,
      quantity: OrderItemQuantitySchema,
    }),
  ),
  subtotal: OrderSubtotalSchema,
  shipping: OrderShippingSchema,
  vat: OrderVatSchema,
  grandTotal: OrderGrandTotalSchema,
});

export const OrderIdParamsSchema = z.object({
  id: OrderIdSchema,
});

export const OrderFindByIdParamsSchema = OrderIdParamsSchema.extend({
  userId: UserIdSchema,
});

export const OrderFindManyParamsSchema = z.object({
  userId: UserIdSchema,
  limit: LimitSchema,
  page: PageSchema,
});
