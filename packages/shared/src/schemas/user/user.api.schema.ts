import { z } from '@/config';

import { UserSchema } from './user.schema';
import { UserUpdateParamsSchema } from './user.params.schema';

export const ApiUserSchema = UserSchema.omit({ password: true });

export const ApiUserUpdateProfileBodySchema = UserUpdateParamsSchema.omit({
  id: true,
});

export const ApiUserResponseSchema = z.object({
  user: ApiUserSchema,
});
