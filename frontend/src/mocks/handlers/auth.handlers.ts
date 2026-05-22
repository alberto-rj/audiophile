import { http, HttpResponse } from 'msw';

import type { AuthResponse, LoginPayload, RegisterPayload } from '@/libs/types';

import {
  extractTokenFromHeader,
  generateMockRefreshToken,
  generateMockToken,
  generateUserFromRefreshToken,
  invalidateRefreshToken,
  mockSessions,
  mockUsers,
} from '../auth-store';
import { withAuth } from '../middlewares/with-auth';
import { withDelay, withInfiniteDelay } from '../middlewares/with-delay';

const REFRESH_TOKEN_COOKIE = 'refreshToken';

function buildAuthResponse(user: { id: number; name: string; email: string }): {
  response: AuthResponse;
  refreshToken: string;
} {
  const accessToken = generateMockToken(user.id);
  const refreshToken = generateMockRefreshToken(user.id);

  return {
    response: {
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
    },
    refreshToken,
  };
}

function setRefreshCookie(httpResponse: Response, token: string): Response {
  httpResponse.headers.append(
    'Set-Cookie',
    `${REFRESH_TOKEN_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Strict`,
  );
  return httpResponse;
}

export function makeRegisterHandler(
  options: {
    type?: 'error' | 'infinite' | 'default';
  } = {},
) {
  const { type = 'default' } = options;

  const endpoint = '/api/auth/register';

  if (type === 'infinite') {
    return http.post(
      endpoint,
      withInfiniteDelay(async () => {
        return HttpResponse.json(undefined, { status: 201 });
      }),
    );
  }

  if (type === 'error') {
    return http.post(
      endpoint,
      withDelay(async () => {
        return HttpResponse.json(undefined, { status: 500 });
      }),
    );
  }

  return http.post(
    endpoint,

    withDelay(async ({ request }) => {
      const { name, email, password } =
        (await request.json()) as RegisterPayload;

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

      const { response, refreshToken } = buildAuthResponse(newUser);

      const httpResponse = HttpResponse.json(response, { status: 201 });

      return setRefreshCookie(httpResponse, refreshToken);
    }),
  );
}

export function makeLoginHandler(
  options: {
    type?: 'error' | 'infinite' | 'default';
  } = {},
) {
  const { type = 'default' } = options;

  const endpoint = '/api/auth/login';

  if (type === 'infinite') {
    return http.post(
      endpoint,
      withInfiniteDelay(async () => {
        return HttpResponse.json(undefined, { status: 200 });
      }),
    );
  }

  if (type === 'error') {
    return http.post(
      endpoint,
      withDelay(async () => {
        return HttpResponse.json(undefined, { status: 500 });
      }),
    );
  }

  return http.post(
    endpoint,
    withDelay(async ({ request }) => {
      const { email, password } = (await request.json()) as LoginPayload;

      const foundUser = mockUsers.find((user) => user.email === email);

      if (typeof foundUser === 'undefined') {
        return HttpResponse.json(undefined, { status: 401 });
      }
      if (foundUser.password !== password) {
        return HttpResponse.json(undefined, { status: 401 });
      }

      const { response, refreshToken } = buildAuthResponse(foundUser);
      const httpResponse = HttpResponse.json(response);

      return setRefreshCookie(httpResponse, refreshToken);
    }),
  );
}

export function makeLogoutHandler(
  options: {
    type?: 'error' | 'infinite' | 'default';
  } = {},
) {
  const { type = 'default' } = options;

  const endpoint = '/api/auth/logout';

  if (type === 'infinite') {
    return http.post(
      endpoint,
      withInfiniteDelay(async () => {
        return HttpResponse.json(undefined, { status: 204 });
      }),
    );
  }

  if (type === 'error') {
    return http.post(
      endpoint,
      withDelay(async () => {
        return HttpResponse.json(undefined, { status: 500 });
      }),
    );
  }

  return http.post(
    endpoint,
    withDelay(
      withAuth(async ({ request }) => {
        const authHeader = request.headers.get('Authorization');
        const accessToken = extractTokenFromHeader(authHeader);

        if (typeof accessToken === 'string') {
          mockSessions.delete(accessToken);
        }

        const cookieHeader = request.headers.get('Cookie') ?? '';
        const refreshToken = cookieHeader
          .split(';')
          .map((c) => c.trim())
          .find((c) => c.startsWith(`${REFRESH_TOKEN_COOKIE}=`))
          ?.split('=')[1];

        if (typeof refreshToken === 'string') {
          invalidateRefreshToken(refreshToken);
        }

        const httpResponse = HttpResponse.json(undefined, { status: 204 });
        httpResponse.headers.append(
          'Set-Cookie',
          `${REFRESH_TOKEN_COOKIE}=; HttpOnly; Path=/; Max-Age=0`,
        );

        return httpResponse;
      }),
    ),
  );
}

export function makeRefreshHandler(
  options: {
    type?: 'error' | 'infinite' | 'default';
  } = {},
) {
  const { type = 'default' } = options;

  const endpoint = '/api/auth/refresh';

  if (type === 'infinite') {
    return http.post(
      endpoint,
      withInfiniteDelay(async () => {
        return HttpResponse.json(undefined, { status: 204 });
      }),
    );
  }

  if (type === 'error') {
    return http.post(
      endpoint,
      withDelay(async () => {
        return HttpResponse.json(undefined, { status: 500 });
      }),
    );
  }

  return http.post(
    endpoint,
    withDelay(async ({ request }) => {
      const cookieHeader = request.headers.get('Cookie') ?? '';

      const refreshToken = cookieHeader
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith(`${REFRESH_TOKEN_COOKIE}=`))
        ?.split('=')[1];

      if (typeof refreshToken === 'undefined') {
        return HttpResponse.json(undefined, { status: 401 });
      }

      const foundUser = generateUserFromRefreshToken(refreshToken);

      if (foundUser === null) {
        return HttpResponse.json(undefined, { status: 401 });
      }

      invalidateRefreshToken(refreshToken);
      const { response, refreshToken: newRefreshToken } =
        buildAuthResponse(foundUser);

      const httpResponse = HttpResponse.json(response);
      return setRefreshCookie(httpResponse, newRefreshToken);
    }),
  );
}

export const authHandlers = [
  makeRefreshHandler(),
  makeRegisterHandler(),
  makeLoginHandler(),
  makeLogoutHandler(),
];
