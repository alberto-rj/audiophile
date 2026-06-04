import { z } from '@/config';
import { registry } from '@/openapi';

export const CreatedAtSchema = z.string().openapi({
  format: 'datetime',
  title: 'createdAt',
  description: 'Creation date.',
  example: '2025-01-02T10:20:30Z',
  readOnly: true,
});

export const UpdatedAtSchema = z.string().openapi({
  format: 'datetime',
  title: 'updatedAt',
  description: 'Last modified date.',
  example: '2025-01-02T10:20:30Z',
});

export const PageSchema = z.coerce
  .number()
  .int()
  .positive()
  .default(1)
  .openapi({
    description: 'Number of the page',
    example: 1,
    default: 1,
  });

export const LimitSchema = z.coerce
  .number()
  .int()
  .positive()
  .default(20)
  .openapi({
    description: 'Results pear page',
    example: 20,
    default: 20,
    maximum: 100,
  });

export const ApiErrorSchema = registry.register(
  'Error',
  z.object({
    message: z.string().openapi({
      example: 'Something went wrong',
    }),
  }),
);

export const ApiPaginationSchema = registry.register(
  'Pagination',
  z
    .object({
      page: PageSchema,
      limit: LimitSchema,
    })
    .openapi('Pagination'),
);

export const ApiResultListResponse = z
  .object({
    results: z.array(z.unknown()),
  })
  .default({
    results: [],
  });

export const ApiErrorResponseSchema = registry.register(
  'ErrorResponse',
  z
    .object({
      error: ApiErrorSchema,
    })
    .openapi('ErrorResponse'),
);

export const ApiValidationErrorResponseSchema = z
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

export function makeApiResultResponseSchema<T extends z.ZodType>(schema: T) {
  return z.object({
    results: z.array(schema).openapi('ResultResponse'),
  });
}

export function makeApiResultListResponseSchema<T extends z.ZodType>(
  schema: T,
) {
  return z
    .object({
      results: z.array(schema),
    })
    .openapi('ResultListResponse');
}

export function makeApiPaginatedResponseSchema<T extends z.ZodType>(schema: T) {
  return z
    .object({
      results: z.array(schema),
      pagination: ApiPaginationSchema,
    })
    .openapi('PaginatedResponse');
}
