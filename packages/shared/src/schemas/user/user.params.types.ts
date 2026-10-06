import type { z } from '@/config';

import type {
  UserCreateParamsSchema,
  UserFindByEmailParamsSchema,
  UserFindByIdParamsSchema,
  UserIdParamsSchema,
  UserUpdateParamsSchema,
} from './user.params.schema';

export type UserIdParams = z.infer<typeof UserIdParamsSchema>;

export type UserCreateParams = z.infer<typeof UserCreateParamsSchema>;

export type UserUpdateParams = z.infer<typeof UserUpdateParamsSchema>;

export type UserFindByIdParams = z.infer<typeof UserFindByIdParamsSchema>;

export type UserFindByEmailParams = z.infer<typeof UserFindByEmailParamsSchema>;
