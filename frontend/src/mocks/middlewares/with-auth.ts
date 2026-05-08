import { HttpResponse, type HttpResponseResolver } from 'msw';

import { generateUserFromToken } from '../auth-store';
import type { AuthenticatedRequest } from '../types';

export function withAuth(resolver: HttpResponseResolver): HttpResponseResolver {
  return async (info) => {
    const { request } = info;

    const authHeader = request.headers.get('Authorization');

    if (authHeader === null) {
      return HttpResponse.json(undefined, { status: 401 });
    }

    const [, accessToken] = authHeader.split(' ');

    if (!accessToken) {
      return HttpResponse.json(undefined, { status: 401 });
    }

    const foundUser = generateUserFromToken(accessToken);

    if (foundUser === null) {
      return HttpResponse.json(undefined, { status: 401 });
    }

    (info.request as AuthenticatedRequest).authUser = foundUser;

    return resolver(info);
  };
}
