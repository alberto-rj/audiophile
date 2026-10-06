import { z } from '@/config';

export const AuthAccessTokenSchema = z.string().openapi({
  description: 'Short JWT (15 min). Send via Authorization: Bearer <token>',
  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
});
