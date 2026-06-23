import { z } from '@/config';

import type { RefreshTokenSchema } from './refresh-token.schema';
import type {
  RefreshTokenExpiresAtSchema,
  RefreshTokenIdSchema,
  RefreshTokenTokenSchema,
} from './refresh-token.base.schema';

export type RefreshTokenId = z.infer<typeof RefreshTokenIdSchema>;

export type RefreshTokenToken = z.infer<typeof RefreshTokenTokenSchema>;

export type RefreshTokenExpiresAt = z.infer<typeof RefreshTokenExpiresAtSchema>;

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
