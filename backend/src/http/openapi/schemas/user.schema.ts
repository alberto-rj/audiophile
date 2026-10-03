import { ApiUserResponseSchema, ApiUserSchema } from '@/schemas';

import { registry } from '../registry';

registry.register('User', ApiUserSchema);
registry.register('UserResponse', ApiUserResponseSchema);
