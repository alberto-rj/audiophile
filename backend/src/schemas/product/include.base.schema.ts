import { z } from '@/config';

export const IncludeIdSchema = z.coerce.number().int().positive();

export const IncludeQuantitySchema = z.coerce
  .number({
    error: 'quantity must be a number.',
  })
  .int()
  .positive();

export const IncludeItemSchema = z.string({
  error: 'item must be a string.',
});
