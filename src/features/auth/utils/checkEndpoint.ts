export const isAuthEndpoint = (url: string): boolean =>
  url.startsWith(AUTH_ENDPOINT_PREFIX) || url === "/auth";