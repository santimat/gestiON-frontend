export const parseMultiplier = (value: number | null | undefined): number => {
  if (value == null || Number.isNaN(value)) return 1;
  return 1 + value / 100;
};

export const extractMultiplier = (value: number | null | undefined): number => {
  if (value == null || Number.isNaN(value)) return 0;
  return Math.round((value - 1) * 100);
};
