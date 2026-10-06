import { z } from '@/config';

export const CartIdSchema = z.coerce
  .number({
    error: 'id must be a number.',
  })
  .openapi({
    description: 'Unique identifier of the cart.',
    example: 1,
    readOnly: true,
  });

export const CartSubtotalSchema = z.coerce
  .number({
    error: 'subtotal must be a number.',
  })
  .int({ error: 'subtotal must be an integer.' })
  .nonnegative({ error: 'subtotal must be equal or greater than 0.' })
  .openapi({
    readOnly: true,
  });

export const CartVatSchema = z.coerce
  .number({
    error: 'vat must be a number.',
  })
  .int({ error: 'vat must be an integer.' })
  .nonnegative({ error: 'vat must be equal or greater than 0.' })
  .openapi({
    readOnly: true,
  });

export const CartShippingSchema = z.coerce
  .number({
    error: 'shipping must be a number.',
  })
  .int({ error: 'shipping must be an integer.' })
  .nonnegative({ error: 'shipping must be equal or greater than 0.' })
  .openapi({
    readOnly: true,
  });

export const CartGrandTotalSchema = z.coerce
  .number({
    error: 'grandTotal must be a number.',
  })
  .int({ error: 'grandTotal must be an integer.' })
  .nonnegative({ error: 'grandTotal must be equal or greater than 0.' })
  .openapi({
    readOnly: true,
  });
