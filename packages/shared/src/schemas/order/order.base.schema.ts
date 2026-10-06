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

export const OrderAddressSchema = z
  .string({
    error: 'address must be a string.',
  })
  .openapi({
    description: 'Shipping address associated with the order.',
    example: '123 Main Street',
  });

export const OrderZipSchema = z
  .string({
    error: 'zip must be a string.',
  })
  .openapi({
    description: 'Postal code of the shipping address.',
    example: '10001',
  });

export const OrderCitySchema = z
  .string({
    error: 'city must be a string.',
  })
  .openapi({
    description: 'City where the order should be delivered.',
    example: 'New York',
  });

export const OrderCountrySchema = z
  .string({
    error: 'country must be a string.',
  })
  .openapi({
    description: 'Country where the order should be delivered.',
    example: 'United States',
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
  .int({
    error: 'quantity must be an integer.',
  })
  .positive({
    error: 'quantity must be greater than 0.',
  })
  .openapi({
    description: 'Number of units of the product included in the order.',
    example: 1,
  });

export const OrderPaymentMethodSchema = z
  .enum(['e-money', 'cash-on-delivery'])
  .openapi({
    description: 'Payment method selected for the order.',
    example: 'e-money',
  });

export const OrderStatusSchema = z
  .enum(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'])
  .openapi({
    description: 'Current status of the order.',
    example: 'pending',
  });

export const OrderSubtotalSchema = z
  .int({
    error: 'subtotal must be an integer.',
  })
  .nonnegative({
    error: 'subtotal must be greater than or equal to 0.',
  })
  .openapi({
    description:
      'Total price of all items in the order before shipping and VAT, expressed in the smallest currency unit.',
    example: 1099,
    readOnly: true,
  });

export const OrderShippingSchema = z
  .int({
    error: 'shipping must be an integer.',
  })
  .nonnegative({
    error: 'shipping must be greater than or equal to 0.',
  })
  .openapi({
    description:
      'Shipping cost for the order, expressed in the smallest currency unit.',
    example: 50,
    readOnly: true,
  });

export const OrderVatSchema = z
  .int({
    error: 'vat must be an integer.',
  })
  .nonnegative({
    error: 'vat must be greater than or equal to 0.',
  })
  .openapi({
    description:
      'VAT amount applied to the order, expressed in the smallest currency unit.',
    example: 230,
    readOnly: true,
  });

export const OrderGrandTotalSchema = z
  .int({
    error: 'grandTotal must be an integer.',
  })
  .nonnegative({
    error: 'grandTotal must be greater than or equal to 0.',
  })
  .openapi({
    description:
      'Final amount of the order, including item subtotal, shipping, and VAT, expressed in the smallest currency unit.',
    example: 1379,
    readOnly: true,
  });
