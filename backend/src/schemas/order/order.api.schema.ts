import { z } from '@/config';
import {
  UserEmailSchema,
  UserIdSchema,
  UserNameSchema,
} from '../user/user.schema';
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
import { CreatedAtSchema } from '../common/common.schema';
import {
  ProductIdSchema,
  ProductPriceSchema,
  ProductSlugSchema,
} from '../product/product.base.schema';

export const ApiOrderIdParamsSchema = z.object({
  id: OrderIdSchema,
});

export const ApiOrderCreateBodySchema = z.object({
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
});

export const ApiOrderItemSchema = z.object({
  id: OrderItemIdSchema,
  productId: ProductIdSchema,
  orderId: OrderIdSchema,
  quantity: OrderItemQuantitySchema,
  name: UserNameSchema,
  price: ProductPriceSchema,
  slug: ProductSlugSchema,
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
