import { z } from '@/config';

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

export const ImageSchema = z.url({
  error: 'image must be a url.',
});

export const ResponsiveImageSchema = z.object({
  mobile: ImageSchema,
  tablet: ImageSchema,
  desktop: ImageSchema,
});

export const ApiErrorSchema = z.object({
  message: z.string().openapi({
    example: 'Something went wrong',
  }),
});

export const ApiPaginationQuerySchema = z.object({
  page: PageSchema,
  limit: LimitSchema,
});

export const ApiPaginationResponseSchema = z.object({
  page: PageSchema,
  totalPages: z.number().openapi({
    description: 'Number of the pages.',
    example: 10,
    readOnly: true,
  }),
  hasPrev: z.boolean().openapi({
    description: 'Has previous page or not.',
    example: false,
    readOnly: true,
  }),
  hasNext: z.boolean().openapi({
    description: 'Has next page or not.',
    example: true,
    readOnly: true,
  }),
});

export const ApiResultListResponse = z
  .object({
    results: z.array(z.unknown()),
  })
  .default({
    results: [],
  });

export const ApiErrorResponseSchema = z.object({
  error: ApiErrorSchema,
});

export const ApiValidationErrorResponseSchema = z
  .object({
    error: z.record(z.string(), z.array(z.string())),
  })
  .default({
    error: {
      fieldA: ['fieldA is required.', 'filedA must be a string.'],
      fieldB: ['fieldB is required.', 'filedB must be a string.'],
    },
  });

export function makeApiResultResponseSchema<T extends z.ZodType>(schema: T) {
  return z.object({
    results: z.array(schema),
  });
}

export function makeApiResultListResponseSchema<T extends z.ZodType>(
  schema: T,
) {
  return z.object({
    results: z.array(schema),
  });
}

export function makeApiPaginationResponseSchema<T extends z.ZodType>(
  schema: T,
) {
  return z.object({
    results: z.array(schema),
    pagination: ApiPaginationResponseSchema,
  });
}

export function makeApiValidationErrorResponseSchema<T extends z.ZodType>(
  schema: T,
) {
  return z.object({
    error: schema,
  });
}
