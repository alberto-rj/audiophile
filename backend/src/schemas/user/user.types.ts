import { z } from '@/config';

import type {
  ApiUserCreateBodySchema,
  ApiUserSchema,
  UserEmailSchema,
  UserIdSchema,
  UserNameSchema,
  UserPasswordSchema,
  UserCreatedAtSchema,
} from './user.schema';
import type { ApiUpdateProfileBodySchema } from './update-profile.schema';

export type UserId = z.infer<typeof UserIdSchema>;

export type UserName = z.infer<typeof UserNameSchema>;

export type UserEmail = z.infer<typeof UserEmailSchema>;

export type UserPassword = z.infer<typeof UserPasswordSchema>;

export type UserCreatedAt = z.infer<typeof UserCreatedAtSchema>;

export type SafeUser = z.infer<typeof ApiUserSchema>;

export type BaseUser = {
  id: UserId;
  name: UserName;
  email: UserEmail;
};

export type User = BaseUser & {
  password: UserPassword;
  createdAt: UserCreatedAt;
};

export type UserCreateParams = z.infer<typeof ApiUserCreateBodySchema>;

export type UserUpdateParams = z.infer<typeof ApiUpdateProfileBodySchema> & {
  id: UserId;
};

export type UserFindByIdParams = {
  id: UserId;
};

export type UserFindByEmailParams = {
  email: UserEmail;
};
