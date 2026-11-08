import type { z } from "zod";
import { useState } from "react";

export const useLocalFilters = <TSchema extends z.ZodType>(schema: TSchema) => {
  const [rawFilters, setRawFilters] = useState<Partial<z.input<TSchema>>>({});

  const parsed = schema.safeParse(rawFilters);

  const filters = parsed.success
    ? (parsed.data as z.output<TSchema>)
    : ({} as z.output<TSchema>);

  const setFilters = (partial: Partial<z.output<TSchema>>) => {
    setRawFilters((prev) => {
      const next: Record<string, unknown> = { ...prev, ...partial };

      for (const key of Object.keys(next)) {
        const value = next[key];
        if (value === undefined || value === null || value === "") {
          delete next[key];
        }
      }

      return next as Partial<z.input<TSchema>>;
    });
  };

  const resetFilters = () => setRawFilters({});

  return {
    filters,
    setFilters,
    resetFilters,
  };
};
