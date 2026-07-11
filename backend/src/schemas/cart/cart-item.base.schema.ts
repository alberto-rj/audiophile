import { z } from '@/config';

export const CartItemIdSchema = z.coerce
  .number({
    error: 'id must be a number.',
  })
  .openapi({
    description: 'Unique identifier of the cart item.',
    example: 1,
    readOnly: true,
  });

export const CartItemQuantitySchema = z.coerce
  .number({
    error: 'quantity must be a number.',
  })
  .int({ error: 'quantity must be an integer.' })
  .positive({ error: 'quantity must be greater than 0.' })
  .default(1)
  .openapi({
    readOnly: true,
  });
