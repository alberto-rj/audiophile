import type { ZodObject } from 'zod';

import { z } from '@/config';
import { ValidationError } from '@/helpers';

export function parseSchema<T>(schema: ZodObject, data: unknown) {
  const result = schema.safeParse(data);

  if (result.success) {
    return result.data as T;
  }

  const properties = z.treeifyError(result.error).properties;
  throw new ValidationError(properties);
}
