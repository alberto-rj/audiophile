import { z } from '@/config';

import { CreatedAtSchema } from '../common/common.schema';
import {
  ProductIdSchema,
  ProductImageSchema,
  ProductNameSchema,
  ProductPriceSchema,
} from '../product/product.base.schema';
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

export const OrderItemSchema = z.object({
  id: OrderItemIdSchema,
  productId: ProductIdSchema,
  orderId: OrderIdSchema,
  name: ProductNameSchema,
  image: ProductImageSchema,
  price: ProductPriceSchema,
  quantity: OrderItemQuantitySchema,
});

export const OrderSchema = z.object({
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
  items: z.array(OrderItemSchema),
});
