import { z } from '@/config';

export const CreatedAtSchema = z.string().openapi({
  format: 'datetime',
  title: 'createdAt',
  description: 'Creation date.',
  example: '2025-01-02T10:20:30Z',
});

export const UpdatedAtSchema = z.string().openapi({
  format: 'datetime',
  title: 'updatedAt',
  description: 'Last modified date.',
  example: '2025-01-02T10:20:30Z',
});

export const ApiResultListResponse = z
  .object({
    results: z.array(z.unknown()),
  })
  .default({
    results: [],
  });

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    message: z.string(),
  }),
});

export const ApiValidationErrorResponse = z
  .object({
    error: z.record(
      z.string(),
      z.object({
        errors: z.array(z.string()),
      }),
    ),
  })
  .default({
    error: {
      fieldA: {
        errors: [
          'fieldA is required error message 1.',
          'filedA must be a string.',
        ],
      },
      fieldB: {
        errors: [
          'fieldB is required error message 1.',
          'filedB must be a string.',
        ],
      },
    },
  });

export function createApiResultResponseSchema<T extends z.ZodType>(schema: T) {
  return z.object({
    results: z.array(schema),
  });
}

export function createApiResultListResponseSchema<T extends z.ZodType>(
  schema: T,
) {
  return z.object({
    results: schema,
  });
}
