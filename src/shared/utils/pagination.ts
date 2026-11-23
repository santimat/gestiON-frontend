export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

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
