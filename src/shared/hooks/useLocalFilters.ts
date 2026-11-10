import type { z } from "zod";
import { useState } from "react";

const pruneEmptyValues = (
  values?: Record<string, unknown>,
): Record<string, unknown> => {
  const next: Record<string, unknown> = {};

  if (!values) return next;

  for (const key of Object.keys(values)) {
    const value = values[key];
    if (value === undefined || value === null || value === "") {
      continue;
    }
    next[key] = value;
  }

  return next;
};

export const useLocalFilters = <TSchema extends z.ZodType>(
  schema: TSchema,
  initialFilters?: Partial<z.input<TSchema>>,
) => {
  // `useState` solo consume el valor inicial en el primer render.
  const initialRawFilters = pruneEmptyValues(
    initialFilters as Record<string, unknown> | undefined,
  ) as Partial<z.input<TSchema>>;

  const [rawFilters, setRawFilters] =
    useState<Partial<z.input<TSchema>>>(initialRawFilters);

  const parsed = schema.safeParse(rawFilters);

  const filters = parsed.success
    ? (parsed.data as z.output<TSchema>)
    : ({} as z.output<TSchema>);

  const setFilters = (partial: Partial<z.output<TSchema>>) => {
    setRawFilters((prev) => {
      return pruneEmptyValues({
        ...prev,
        ...partial,
      } as Record<string, unknown>) as Partial<z.input<TSchema>>;
    });
  };

  // Vuelve a los valores iniciales (o a vacío si no se pasaron).
  const resetFilters = () => setRawFilters(initialRawFilters);

  return {
    filters,
    setFilters,
    resetFilters,
  };
};
