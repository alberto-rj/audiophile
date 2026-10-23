import { z } from '@/config';

import {
  RefreshTokenCreateInputSchema,
  RefreshTokenFindManyInputSchema,
  RefreshTokenIdInputSchema,
  RefreshTokenTokenInputSchema,
} from './refresh-token.input.schema';

export type RefreshTokenCreateInput = z.infer<
  typeof RefreshTokenCreateInputSchema
>;

export type RefreshTokenFindManyInput = z.infer<
  typeof RefreshTokenFindManyInputSchema
>;

export type RefreshTokenIdInput = z.infer<typeof RefreshTokenIdInputSchema>;

export type RefreshTokenTokenInput = z.infer<
  typeof RefreshTokenTokenInputSchema
>;
