import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';

import { env } from '@/config';

import { registry } from './registry';

const { DEV_API_BASE_URL, PROD_API_BASE_URL } = env;

// Register the JWT Bearer authentication scheme.
// Endpoints can reference it using "bearerAuth".
registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'JWT access token obtained from the login endpoint.',
});

export function generateOpenAPISpec() {
  const generator = new OpenApiGeneratorV31(registry.definitions);

  return generator.generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'Audiophile API',
      version: '1.0.0',
      description: 'REST API for the Audiophile e-commerce platform.',
      contact: {
        name: 'Alberto José',
        url: 'https://github.com/alberto-rj',
        email: 'albertorauljose2@gmail.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication and authorization.',
      },
      {
        name: 'Users',
        description: 'User profile management.',
      },
      {
        name: 'Products',
        description: 'Product catalog management.',
      },
      {
        name: 'Categories',
        description: 'Product category management.',
      },
      {
        name: 'Cart',
        description: 'Shopping cart management.',
      },
      {
        name: 'Orders',
        description: 'Order management.',
      },
    ],
    servers: [
      { url: DEV_API_BASE_URL, description: 'Development' },
      { url: PROD_API_BASE_URL, description: 'Production' },
    ],
    // Apply Bearer authentication globally.
    // Public endpoints override this by setting `security: []`.
    security: [{ bearerAuth: [] }],
  });
}
