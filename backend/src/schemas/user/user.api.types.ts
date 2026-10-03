import type { z } from '@/config';

import type {
  ApiUserResponseSchema,
  ApiUserSchema,
  ApiUserUpdateProfileBodySchema,
} from './user.api.schema';

export type ApiUserUpdateProfileBody = z.infer<
  typeof ApiUserUpdateProfileBodySchema
>;

export type ApiUser = z.infer<typeof ApiUserSchema>;

export type ApiUserResponse = z.infer<typeof ApiUserResponseSchema>;
