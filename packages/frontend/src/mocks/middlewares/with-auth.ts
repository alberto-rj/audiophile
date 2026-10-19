import { HttpResponse, type HttpResponseResolver } from 'msw';

import { extractTokenFromHeader, generateUserFromToken } from '../auth-store';
import type { AuthenticatedRequest } from '../types';

export function withAuth(resolver: HttpResponseResolver): HttpResponseResolver {
  return async (info) => {
    const { request } = info;

    const accessToken = extractTokenFromHeader(
      request.headers.get('Authorization'),
    );

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
