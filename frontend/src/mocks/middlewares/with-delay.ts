import { delay, type HttpResponseResolver } from 'msw';

export function withDelay(
  resolver: HttpResponseResolver,
): HttpResponseResolver {
  return async (info) => {
    await delay(6 * 1000);

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
