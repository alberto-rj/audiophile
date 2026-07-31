import { z } from '@/config';

import {
  RefreshTokenExpiresAtSchema,
  RefreshTokenIdSchema,
  RefreshTokenTokenSchema,
} from './refresh-token.base.schema';
import { CreatedAtSchema } from '../common/common.schema';
import { UserIdSchema } from '../user/user.schema';

export const RefreshTokenSchema = z
  .object({
    id: RefreshTokenIdSchema,
    userId: UserIdSchema,
    token: RefreshTokenTokenSchema,
    expiresAt: RefreshTokenExpiresAtSchema,
    createdAt: CreatedAtSchema,
  })
  .transform(({ expiresAt, ...rest }) => ({
    ...rest,
    expiresAt: expiresAt.toISOString(),
  }));

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
