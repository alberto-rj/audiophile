import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from '@asteasolutions/zod-to-openapi';

// Registry singleton - imported by all schema and route files.
export const registry = new OpenAPIRegistry();

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
      description: 'Api complete documentation',
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
    ],
    servers: [
      { url: 'http://localhost:4224', description: 'Development' },
      { url: 'https://api.example.com', description: 'Production' },
    ],
    // Global security - all endpoints require Bearer by default
    // Public endpoints override with security: [] in its definition
    security: [{ bearerAuth: [] }],
  });
}
