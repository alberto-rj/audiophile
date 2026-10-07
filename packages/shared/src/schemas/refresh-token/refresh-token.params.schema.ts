import { z } from '@/config';

import {
  RefreshTokenExpiresAtSchema,
  RefreshTokenIdSchema,
  RefreshTokenTokenSchema,
} from './refresh-token.base.schema';
import { UserIdSchema } from '../user/user.base.schema';

export const RefreshTokenCreateParamsSchema = z.object({
  userId: UserIdSchema,
  token: RefreshTokenTokenSchema,
  expiresAt: RefreshTokenExpiresAtSchema,
});

export const RefreshTokenIdParamsSchema = z.object({
  id: RefreshTokenIdSchema,
});

export const RefreshTokenTokenParamsSchema = z.object({
  token: RefreshTokenTokenSchema,
});
