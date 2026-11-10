export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

/**
 * Convierte los filtros de la URL en query params para el backend.
 *
 * En la URL la página es 1-based (la que ve el usuario: ?page=1 es la primera),
 * pero el backend la espera 0-based (?page=0 es la primera).
 */
export const toPageParams = <T extends { page?: number; size?: number }>(
  filters: T,
  defaultSize: number = DEFAULT_PAGE_SIZE,
) => {
  const { page, size, ...rest } = filters;

  return {
    ...rest,
    size: size ?? defaultSize,
    page: Math.max((page ?? 1) - 1, 0),
  };
};
