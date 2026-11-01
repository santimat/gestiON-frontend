import { useSearchParams } from "react-router";
import type { z } from "zod";

export const useFilters = <TSchema extends z.ZodType>(schema: TSchema) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawParams = Object.fromEntries(searchParams.entries());

  // descartamos params vacíos: "?searchText=" no es un filtro
  const cleanedParams = Object.fromEntries(
    Object.entries(rawParams).filter(([, value]) => value !== ""),
  );

  const parsedFilters = schema.safeParse(cleanedParams);
  const filters = parsedFilters.success
    ? parsedFilters.data
    : ({} as z.output<TSchema>);

  const setFilters = (partial: Partial<z.output<TSchema>>) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(partial)) {
          if (value === undefined || value === null || value === "") {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        }
        return next;
      },
      // replace para no llenar el historial con cada tecla del buscador
      { replace: true },
    );
  };

  const resetFilters = () => setSearchParams({}, { replace: true });

  return {
    filters,
    setFilters,
    resetFilters,
    hasFilters: [...searchParams.keys()].length > 0,
  };
};
