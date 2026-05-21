import { delay, type HttpResponseResolver } from 'msw';

export function withDelay(
  resolver: HttpResponseResolver,
): HttpResponseResolver {
  return async (info) => {
    await delay(500);

    return resolver(info);
  };
}

export function withInfiniteDelay(
  resolver: HttpResponseResolver,
): HttpResponseResolver {
  return async (info) => {
    await delay('infinite');

    return resolver(info);
  };
}
