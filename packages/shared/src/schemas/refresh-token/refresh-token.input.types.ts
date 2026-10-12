import { z } from '@/config';

import {
  RefreshTokenCreateInputSchema,
  RefreshTokenIdInputSchema,
  RefreshTokenTokenInputSchema,
} from './refresh-token.input.schema';

export type RefreshTokenCreateInput = z.infer<
  typeof RefreshTokenCreateInputSchema
>;

export type RefreshTokenIdInput = z.infer<typeof RefreshTokenIdInputSchema>;

export type RefreshTokenTokenInput = z.infer<
  typeof RefreshTokenTokenInputSchema
>;
