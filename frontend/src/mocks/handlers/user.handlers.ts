import { http, HttpResponse } from 'msw';

import { generateUserFromToken } from '../auth-store';

export const userHandlers = [
  http.post('/api/users/me', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const accessToken = authHeader?.replace('Bearer', '');

    if (typeof accessToken === 'undefined') {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const foundUser = generateUserFromToken(accessToken);

    if (foundUser === null) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      },
    });
  }),
];
