import { z } from '@/config';

import type { ApiUserCreateBodySchema, ApiUserSchema } from './user.schema';

export type UserCreateParams = z.infer<typeof ApiUserCreateBodySchema>;

export type SafeUser = z.infer<typeof ApiUserSchema>;

export type BaseUser = {
  id: number;
  name: string;
  email: string;
};

export type User = BaseUser & {
  password: string;
  createdAt: string;
};
