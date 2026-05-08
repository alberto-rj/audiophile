import { http, HttpResponse } from 'msw';

import type { UpdateProfilePayload } from '@/libs/types';

import { mockUsers } from '../auth-store';
import { withAuth } from '../middlewares/with-auth';
import type { AuthenticatedRequest } from '../types';

export const userHandlers = [
  http.get<never, never>(
    '/api/users/me',

    withAuth(async ({ request }) => {
      const { authUser } = request as AuthenticatedRequest;

      return HttpResponse.json({
        user: {
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
        },
      });
    }),
  ),

  http.put(
    '/api/users/me',

    withAuth(async ({ request }) => {
      const { authUser } = request as AuthenticatedRequest;

      const payload = (await request.json()) as UpdateProfilePayload;

      const updatedUser = {
        ...authUser,
        ...payload,
      };

      const newUsers = [
        ...mockUsers.filter((user) => user.id !== authUser.id),
        updatedUser,
      ];

      mockUsers.splice(0, mockUsers.length);
      newUsers.forEach((user) => mockUsers.push(user));

      return HttpResponse.json({
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    }),
  ),
];
