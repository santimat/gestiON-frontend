import { useSyncExternalStore } from "react";

// corte de las listas: md de Tailwind = 48rem = 768px (isMobile = width < 768px)
export const MOBILE_QUERY = "(max-width: 767.98px)";

// corte del shell (colapso del sidebar): lg de Tailwind = 64rem = 1024px
export const SHELL_QUERY = "(max-width: 1023.98px)";

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
