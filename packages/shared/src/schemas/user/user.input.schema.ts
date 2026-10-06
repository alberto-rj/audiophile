import { UserIdSchema } from './user.base.schema';
import {
  UserCreateParamsSchema,
  UserFindByIdParamsSchema,
  UserUpdateParamsSchema,
} from './user.params.schema';

export const UserCreateInputSchema = UserCreateParamsSchema.extend({});

export const UserUpdateProfileInputSchema = UserUpdateParamsSchema.extend({
  id: UserIdSchema,
});

export const UserFindByIdInputSchema = UserFindByIdParamsSchema.extend({});
