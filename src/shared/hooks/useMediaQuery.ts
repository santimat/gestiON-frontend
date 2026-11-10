import { useSyncExternalStore } from "react";

// corte de las listas: lg de Tailwind
export const MOBILE_QUERY = "(max-width: 1023.98px)";

// corte del shell (colapso del sidebar): xl de Tailwind
export const SHELL_QUERY = "(max-width: 1279.98px)";

// cache de MediaQueryList: getSnapshot no debe crear una por render
const mediaQueryLists = new Map<string, MediaQueryList>();

const getMediaQueryList = (query: string): MediaQueryList => {
  const cached = mediaQueryLists.get(query);
  if (cached) return cached;
  const created = window.matchMedia(query);
  mediaQueryLists.set(query, created);
  return created;
};

/**
 * Flag booleana que se actualiza con el resize del viewport.
 * Uso: render condicional (una variante mobile y otra desktop).
 */
export const useMediaQuery = (query: string): boolean => {
  return useSyncExternalStore(
    (onChange) => {
      const mql = getMediaQueryList(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => getMediaQueryList(query).matches,
  );
};

export const useIsMobile = (): boolean => useMediaQuery(MOBILE_QUERY);
