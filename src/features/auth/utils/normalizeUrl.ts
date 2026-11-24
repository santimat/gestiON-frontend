export const normalizeUrl = (url?: string): string => {
  if (!url) return "";
  return url.startsWith("/") ? url : `/${url}`;
};