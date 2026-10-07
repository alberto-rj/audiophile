import { z } from '@/config';

import {
  RefreshTokenExpiresAtSchema,
  RefreshTokenIdSchema,
  RefreshTokenTokenSchema,
} from './refresh-token.base.schema';
import { CreatedAtSchema } from '../common/common.schema';
import { UserIdSchema } from '../user/user.base.schema';

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
