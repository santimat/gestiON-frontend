/**
 * Convierte un margen de ganancia ingresado como porcentaje (0-100)
 * al factor multiplicador correspondiente para calcular el precio sugerido.
 *
 * Ejemplo: 10% -> 1.1
 */
export const parseMultiplier = (
  value: number | null | undefined,
): number => {
  if (value == null || Number.isNaN(value)) return 1;
  return 1 + value / 100;
};

export default parseMultiplier;