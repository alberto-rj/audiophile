import { z } from '@/config';

import {
  AuthLoginParamsSchema,
  AuthRegisterParamsSchema,
} from './auth.params.schema';

export type AuthRegisterParams = z.infer<typeof AuthRegisterParamsSchema>;

export type AuthLoginParams = z.infer<typeof AuthLoginParamsSchema>;
