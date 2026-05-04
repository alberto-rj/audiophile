import type { AuthResponse, LoginPayload, RegisterPayload } from '@/libs/types';
import { http, HttpResponse } from 'msw';

import { generateMockToken, mockSessions, mockUsers } from '../auth-store';

export const authHandlers = [
  http.post<never, RegisterPayload>(
    '/api/auth/register',
    async ({ request }) => {
      const { name, email, password } = await request.json();

      const foundUser = mockUsers.find((user) => user.email === email);

      if (typeof foundUser === 'object') {
        return HttpResponse.json(
          { error: 'Email already in use.' },
          { status: 409 },
        );
      }

      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        password,
      };

      mockUsers.push(newUser);

      const accessToken = generateMockToken(newUser.id);

      const response: AuthResponse = {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        accessToken,
      };

      return HttpResponse.json(response, { status: 201 });
    },
  ),

  http.post<never, LoginPayload>('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();

    const foundUser = mockUsers.find((user) => user.email === email);

    if (typeof foundUser === 'undefined') {
      return HttpResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 },
      );
    }

    if (foundUser.password !== password) {
      return HttpResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 },
      );
    }

    const accessToken = generateMockToken(foundUser.id);

    const response: AuthResponse = {
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      },
      accessToken,
    };

    return HttpResponse.json(response);
  }),

  http.post('/api/auth/logout', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const accessToken = authHeader?.replace('Bearer', '');

    if (typeof accessToken === 'string') {
      mockSessions.delete(accessToken);
    }

    return HttpResponse.json(null, { status: 204 });
  }),
];
