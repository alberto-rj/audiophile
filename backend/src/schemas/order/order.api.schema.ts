import { z } from '@/config';
import {
  OrderAddressSchema,
  OrderCitySchema,
  OrderCountrySchema,
  OrderGrandTotalSchema,
  OrderIdSchema,
  OrderItemIdSchema,
  OrderItemQuantitySchema,
  OrderPaymentMethodSchema,
  OrderShippingSchema,
  OrderStatusSchema,
  OrderSubtotalSchema,
  OrderVatSchema,
  OrderZipSchema,
} from './order.base.schema';
import {
  OrderCreateParamsSchema,
  OrderFindManyParamsSchema,
  OrderIdParamsSchema,
} from './order.params.schema';

import { CreatedAtSchema } from '../common/common.schema';
import {
  ProductIdSchema,
  ProductImageSchema,
  ProductPriceSchema,
  ProductSlugSchema,
} from '../product/product.base.schema';
import {
  UserEmailSchema,
  UserIdSchema,
  UserNameSchema,
} from '../user/user.schema';

export const ApiOrderIdParamsSchema = OrderIdParamsSchema.extend({});

export const ApiOrderCreateBodySchema = OrderCreateParamsSchema.extend({});

export const ApiOrderListingQuerySchema = OrderFindManyParamsSchema.extend({});

export const ApiOrderItemSchema = z.object({
  id: OrderItemIdSchema,
  productId: ProductIdSchema,
  orderId: OrderIdSchema,
  quantity: OrderItemQuantitySchema,
  name: UserNameSchema,
  price: ProductPriceSchema,
  slug: ProductSlugSchema,
  image: ProductImageSchema,
});

export const ApiOrderSchema = z.object({
  id: OrderIdSchema,
  status: OrderStatusSchema,
  userId: UserIdSchema,
  name: UserNameSchema,
  email: UserEmailSchema,
  address: OrderAddressSchema,
  zip: OrderZipSchema,
  city: OrderCitySchema,
  country: OrderCountrySchema,
  paymentMethod: OrderPaymentMethodSchema,
  subtotal: OrderSubtotalSchema,
  shipping: OrderShippingSchema,
  vat: OrderVatSchema,
  grandTotal: OrderGrandTotalSchema,
  createdAt: CreatedAtSchema,
  items: z.array(ApiOrderItemSchema),
});
