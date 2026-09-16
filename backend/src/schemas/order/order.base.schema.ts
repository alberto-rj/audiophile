import { z } from '@/config';

export const OrderIdSchema = z.coerce
  .number({
    error: 'id must be a number.',
  })
  .openapi({
    description: 'Unique identifier of the order.',
    example: 1,
    readOnly: true,
  });

export const OrderAddressSchema = z.string({
  error: 'address must be a string.',
});

export const OrderZipSchema = z.string({
  error: 'zip must be a string.',
});

export const OrderCitySchema = z.string({
  error: 'city must be a string.',
});

export const OrderCountrySchema = z.string({
  error: 'country must be a string.',
});

export const OrderItemIdSchema = z.coerce
  .number({
    error: 'id must be a number.',
  })
  .openapi({
    description: 'Unique identifier of the order item.',
    example: 1,
    readOnly: true,
  });

export const OrderItemQuantitySchema = z.coerce
  .number({
    error: 'quantity must be a number.',
  })
  .int({ error: 'quantity must be an integer.' })
  .nonnegative({ error: 'quantity must be greater or equal to 0.' })
  .openapi({
    example: 1,
  });

export const OrderPaymentMethodSchema = z
  .enum(['e-money', 'cash-on-delivery'])
  .openapi({ description: 'Payment method of the order.' });

export const OrderStatusSchema = z
  .enum(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'])
  .openapi({ description: 'status of the order.' });

export const OrderSubtotalSchema = z
  .int({ error: 'subtotal must be an integer.' })
  .nonnegative({ error: 'subtotal must be greater than or equal to 0.' })
  .openapi({ readOnly: true });

export const OrderShippingSchema = z
  .int({ error: 'shipping must be an integer.' })
  .nonnegative({ error: 'shipping must be greater than or equal to 0.' })
  .openapi({ readOnly: true });

export const OrderVatSchema = z
  .int({ error: 'vat must be an integer.' })
  .nonnegative({ error: 'vat must be greater than or equal to 0.' })
  .openapi({ readOnly: true });

export const OrderGrandTotalSchema = z
  .int({ error: 'grandTotal must be an integer.' })
  .nonnegative({ error: 'grandTotal must be greater than or equal to 0.' })
  .openapi({ readOnly: true });
