import { ApiUserResponseSchema, ApiUserSchema } from '@audiophile/shared';

import { registry } from '../registry';

registry.register('User', ApiUserSchema);
registry.register('UserResponse', ApiUserResponseSchema);
