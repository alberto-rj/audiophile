import { z } from '@/config';

import type {
  ApiAuthLoginBodySchema,
  ApiAuthRegisterBodySchema,
  ApiAuthResponseSchema,
} from './auth.api.schema';

export type ApiAuthResponse = z.infer<typeof ApiAuthResponseSchema>;

export type ApiAuthRegisterBody = z.infer<typeof ApiAuthRegisterBodySchema>;

export type ApiAuthLoginBody = z.infer<typeof ApiAuthLoginBodySchema>;
