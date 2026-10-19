import type {
  ApiUser,
  ApiUserResultListResponse,
  ApiUserUpdateProfileBody,
} from '@audiophile/shared';
import { http, HttpResponse } from 'msw';

import { mockUsers } from '../auth-store';
import { withAuth } from '../middlewares/with-auth';
import { withDelay, withInfiniteDelay } from '../middlewares/with-delay';
import type { AuthenticatedRequest, MockUser } from '../types';

function toApiUser(user: MockUser): ApiUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export function makeGetMeHandler(
  options: { type?: 'error' | 'infinite' | 'default' } = {},
) {
  const { type = 'default' } = options;

  const endpoint = '/api/users/me';

  if (type === 'infinite') {
    return http.get(
      endpoint,
      withAuth(
        withInfiniteDelay(async () => {
          return HttpResponse.json(undefined);
        }),
      ),
    );
  }

  if (type === 'error') {
    return http.get(
      endpoint,
      withAuth(
        withDelay(async () => {
          return HttpResponse.json(undefined, { status: 500 });
        }),
      ),
    );
  }

  return http.get(
    endpoint,
    withDelay(
      withAuth(async ({ request }) => {
        const { authUser } = request as AuthenticatedRequest;

        const response: ApiUserResultListResponse = {
          results: [toApiUser(authUser)],
        };

        return HttpResponse.json(response);
      }),
    ),
  );
}

export function makeUpdateMeHandler(
  options: { type?: 'error' | 'infinite' | 'default' } = {},
) {
  const { type = 'default' } = options;

  const endpoint = '/api/users/me';

  if (type === 'infinite') {
    return http.put(
      endpoint,
      withAuth(
        withInfiniteDelay(async () => {
          return HttpResponse.json(undefined);
        }),
      ),
    );
  }

  if (type === 'error') {
    return http.put(
      endpoint,
      withAuth(
        withDelay(async () => {
          return HttpResponse.json(undefined, { status: 500 });
        }),
      ),
    );
  }

  return http.put(
    endpoint,

    withDelay(
      withAuth(async ({ request }) => {
        const { authUser } = request as AuthenticatedRequest;

        const payload = (await request.json()) as ApiUserUpdateProfileBody;

        const foundUser = mockUsers.find((user) => user.id === authUser.id);

        if (!foundUser) {
          return HttpResponse.json(undefined, { status: 401 });
        }

        const isExistingEmail = mockUsers.some(
          (user) =>
            user.id !== authUser.id &&
            user.email.toLowerCase() === payload.email.toLowerCase(),
        );

        if (isExistingEmail) {
          return HttpResponse.json(undefined, { status: 409 });
        }

        const updatedUser: MockUser = {
          ...authUser,
          ...payload,
        };

        const newUsers = [
          ...mockUsers.filter((user) => user.id !== authUser.id),
          updatedUser,
        ];

        mockUsers.splice(0, mockUsers.length);
        newUsers.forEach((user) => mockUsers.push(user));

        const response: ApiUserResultListResponse = {
          results: [toApiUser(updatedUser)],
        };

        return HttpResponse.json(response);
      }),
    ),
  );
}

export const userHandlers = [makeGetMeHandler(), makeUpdateMeHandler()];
