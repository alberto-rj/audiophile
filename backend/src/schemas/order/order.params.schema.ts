import { z } from '@/config';

import {
  OrderAddressSchema,
  OrderCitySchema,
  OrderCountrySchema,
  OrderGrandTotalSchema,
  OrderIdSchema,
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

export const OrderCreateParamsSchema = z.object({
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
});

export const OrderFindByIdParamsSchema = z.object({
  id: OrderIdSchema,
});

export const OrderFindManyParamsSchema = z.object({
  userId: UserIdSchema,
});
