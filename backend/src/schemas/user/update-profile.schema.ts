import { z } from '@/config';

import { UserEmailSchema, UserNameSchema } from './user.schema';

export const ApiUpdateProfileBodySchema = z.object({
  name: UserNameSchema,
  email: UserEmailSchema,
});

export type ApiUpdateProfileBody = z.infer<typeof ApiUpdateProfileBodySchema>;
