import { z } from '@/config';

import { UserBasicSchema, UserSafeSchema, UserSchema } from './user.schema';

export type User = z.infer<typeof UserSchema>;

export type UserSafe = z.infer<typeof UserSafeSchema>;

export type UserBasic = z.infer<typeof UserBasicSchema>;
