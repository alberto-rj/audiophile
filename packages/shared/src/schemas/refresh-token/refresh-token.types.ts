import { z } from '@/config';

import type { RefreshTokenSchema } from './refresh-token.schema';

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
