import type { z } from "zod";
import { useCallback, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "react-router";

export const useFilters = <TSchema extends z.ZodType>(schema: TSchema) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawParams = Object.fromEntries(searchParams.entries());

  // descartamos params vacios: "?searchText=" no es un filtro
  const cleanedParams = Object.fromEntries(
    Object.entries(rawParams).filter(([, value]) => value !== ""),
  );

  const parsedFilters = schema.safeParse(cleanedParams);
  const filters = parsedFilters.success
    ? parsedFilters.data
    : ({} as z.output<TSchema>);

  // El setter de useSearchParams cambia de identidad en cada navegación, así que
  // si lo usáramos tal cual, setFilters también cambiaría y cualquier efecto que
  // lo tenga como dependencia se volvería a disparar en cada cambio de query
  // (y a escribir en la URL otra vez, en loop).
  // Lo guardamos en un ref sincronizado en layout effect (antes de que corran
  // los efectos hijos) para que setFilters sea estable y siempre use la URL actual.
  const setSearchParamsRef = useRef(setSearchParams);

  useLayoutEffect(() => {
    setSearchParamsRef.current = setSearchParams;
  }, [setSearchParams]);

  const setFilters = useCallback((partial: Partial<z.output<TSchema>>) => {
    setSearchParamsRef.current(
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
      { replace: true },
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSearchParamsRef.current({}, { replace: true });
  }, []);

  return {
    filters,
    setFilters,
    resetFilters,
    hasFilters: [...searchParams.keys()].length > 0,
  };
};
