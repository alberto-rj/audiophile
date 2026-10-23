import { z } from '@/config';

import {
  RefreshTokenCreateParamsSchema,
  RefreshTokenFindManyParamsSchema,
  RefreshTokenIdParamsSchema,
  RefreshTokenTokenParamsSchema,
} from './refresh-token.params.schema';

export type RefreshTokenCreateParams = z.infer<
  typeof RefreshTokenCreateParamsSchema
>;

export type RefreshTokenIdParams = z.infer<typeof RefreshTokenIdParamsSchema>;

export type RefreshTokenTokenParams = z.infer<
  typeof RefreshTokenTokenParamsSchema
>;

export type RefreshTokenFindManyParams = z.infer<
  typeof RefreshTokenFindManyParamsSchema
>;
