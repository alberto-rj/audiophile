import { z } from '@/config';

import { UserEmailSchema, UserPasswordSchema } from '../user/user.schema';

export const ApiLoginBodySchema = z.object({
  email: UserEmailSchema,
  password: UserPasswordSchema,
});

export type ApiLoginBody = z.infer<typeof ApiLoginBodySchema>;
