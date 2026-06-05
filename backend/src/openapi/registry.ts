import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

// Registry singleton - imported by all schema and route files.
export const registry = new OpenAPIRegistry();
