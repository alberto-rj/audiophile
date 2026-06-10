import { z } from '@/config';
import { registry } from '@/http/openapi';

export const CreatedAtSchema = z.string().openapi({
  format: 'date-time',
  title: 'createdAt',
  description: 'Timestamp indicating when the resource was created.',
  example: '2025-01-02T10:20:30Z',
  readOnly: true,
});

export const UpdatedAtSchema = z.string().openapi({
  format: 'date-time',
  title: 'updatedAt',
  description: 'Timestamp indicating when the resource was last updated.',
  example: '2025-01-02T10:20:30Z',
  readOnly: true,
});

export const PageSchema = z.coerce
  .number()
  .int()
  .positive()
  .default(1)
  .openapi({
    description: 'The page number of the paginated results.',
    example: 1,
    default: 1,
  });

export const LimitSchema = z.coerce
  .number()
  .int()
  .positive()
  .default(20)
  .openapi({
    description: 'Maximum number of results returned per page.',
    example: 20,
    default: 20,
    maximum: 100,
  });

export const ImageSchema = z
  .url({
    error: 'image must be a url.',
  })
  .openapi({
    description: 'Absolute URL of an image resource.',
    example: 'https://cdn.audiophile.com/images/product-xx99-mark-two.jpg',
  });

export const ResponsiveImageSchema = registry.register(
  'ResponsiveImage',
  z
    .object({
      mobile: ImageSchema,
      tablet: ImageSchema,
      desktop: ImageSchema,
    })
    .openapi({
      description:
        'Responsive image URLs optimized for different screen sizes.',
    }),
);

export const ApiErrorSchema = z.object({
  message: z.string().openapi({
    description: 'Human-readable error message.',
  }),
});

export const ApiPaginationQuerySchema = z.object({
  page: PageSchema,
  limit: LimitSchema,
});

export const ApiPaginationResponseSchema = registry.register(
  'PaginationMetadata',
  z
    .object({
      page: PageSchema,
      totalPages: z.number().openapi({
        description: 'Total number of available pages.',
        example: 10,
        readOnly: true,
      }),
      hasPrev: z.boolean().openapi({
        description: 'Whether a previous page is available.',
        example: false,
        readOnly: true,
      }),
      hasNext: z.boolean().openapi({
        description: 'Whether a next page is available.',
        example: true,
        readOnly: true,
      }),
    })
    .openapi({
      description: 'Pagination metadata.',
    }),
);

export const ApiResultListResponse = z
  .object({
    results: z.array(z.unknown()),
  })
  .openapi({
    description: 'Collection of returned resources.',
  });

export const ApiErrorResponseSchema = z
  .object({
    error: ApiErrorSchema,
  })
  .openapi({
    description: 'Standard API error response.',
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
    results: z.array(schema).openapi({
      description: 'List of returned resources.',
    }),
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
