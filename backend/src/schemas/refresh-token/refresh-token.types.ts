import { z } from '@/config';

import type {
  RefreshTokenCreateParamsSchema,
  RefreshTokenIdParamsSchema,
  RefreshTokenSchema,
  RefreshTokenTokenParamsSchema,
} from './refresh-token.schema';
import type {
  RefreshTokenExpiresAtSchema,
  RefreshTokenIdSchema,
  RefreshTokenTokenSchema,
} from './refresh-token.base.schema';

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;

export type RefreshTokenId = z.infer<typeof RefreshTokenIdSchema>;

export type RefreshTokenToken = z.infer<typeof RefreshTokenTokenSchema>;

export type RefreshTokenExpiresAt = z.infer<typeof RefreshTokenExpiresAtSchema>;

export type RefreshTokenCreateParams = z.infer<
  typeof RefreshTokenCreateParamsSchema
>;

export type RefreshTokenFindByIdParams = z.infer<
  typeof RefreshTokenIdParamsSchema
>;

export type RefreshTokenFindParams = z.infer<
  typeof RefreshTokenTokenParamsSchema
>;

export type RefreshTokenDeleteParams = z.infer<
  typeof RefreshTokenTokenParamsSchema
>;
