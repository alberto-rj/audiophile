import {
  ApiAuthLoginBodySchema,
  ApiAuthRegisterBodySchema,
  ApiAuthResponseSchema,
} from '@audiophile/shared';

import { registry } from '../registry';

registry.register('LoginBody', ApiAuthLoginBodySchema);
registry.register('RegisterBody', ApiAuthRegisterBodySchema);
registry.register('AuthResponse', ApiAuthResponseSchema);
