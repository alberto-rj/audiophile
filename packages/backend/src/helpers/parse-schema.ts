import type { ZodObject } from 'zod';

import { ValidationError } from '@/helpers';

export function parseSchema<T>(schema: ZodObject, data: unknown) {
  const result = schema.safeParse(data);

  if (result.success) {
    return result.data as T;
  }

  const errorMap = result.error.issues
    .map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))
    .reduce(
      (errorMap, { field, message }) => {
        if (!(field in errorMap)) {
          errorMap[field] = [];
        }

        errorMap[field]?.push(message);

        return errorMap;
      },
      {} as { [key: string]: string[] },
    );

  throw new ValidationError(errorMap);
}
