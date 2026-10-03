import { z } from '@/config';

import { ApiUserSchema } from '../user/user.api.schema';

import {
  AuthLoginParamsSchema,
  AuthRegisterParamsSchema,
} from './auth.params.schema';
import { AuthAccessTokenSchema } from './auth.base.schema';

export const ApiAuthResponseSchema = z.object({
  accessToken: AuthAccessTokenSchema,
  user: ApiUserSchema,
});

export const ApiAuthLoginBodySchema = AuthLoginParamsSchema.extend({});

export const ApiAuthRegisterBodySchema = AuthRegisterParamsSchema.extend({});
