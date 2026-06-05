import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';

import { env } from '@/config';

import { registry } from './registry';

const { DEV_API_BASE_URL, PROD_API_BASE_URL } = env;

// Register the Bearer security scheme (JWT)
// Done here once - all endpoints can reference 'bearerAuth'
registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'Access token obtained via POST /auth/login',
});

export function generateOpenAPISpec() {
  const generator = new OpenApiGeneratorV31(registry.definitions);

  return generator.generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'audiophile API',
      version: '1.0.0',
      description: 'A complete audiophile API documentation.',
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
        description: 'User authentication management',
      },
      {
        name: 'Users',
        description: 'Users management',
      },
      {
        name: 'Orders',
        description: 'Orders management',
      },
      {
        name: 'Cart',
        description: 'Cart management',
      },
      {
        name: 'Products',
        description: 'Products management',
      },
      {
        name: 'Categories',
        description: 'Categories management',
      },
    ],
    servers: [
      { url: DEV_API_BASE_URL, description: 'Development' },
      { url: PROD_API_BASE_URL, description: 'Production' },
    ],
    // Global security - all endpoints require Bearer by default
    // Public endpoints override with security: [] in its definition
    security: [{ bearerAuth: [] }],
  });
}
