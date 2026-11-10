import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";

import type { Theme } from "@shared/types";

/**
 * Tema claro/oscuro de la aplicación.
 *
 * El atributo `data-mantine-color-scheme` es la única fuente de verdad: lo
 * escribe Mantine en `<html>` y tanto los tokens de Tailwind
 * (`:root[data-mantine-color-scheme="dark"]`) como los componentes de Mantine
 * reaccionan a él, así que no hay dos estados que puedan desincronizarse.
 */
export const useTheme = () => {
  const { setColorScheme, toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: false,
  });

  const setTheme = (theme: Theme) => setColorScheme(theme);

  return {
    theme: colorScheme,
    setTheme,
    toggleTheme: toggleColorScheme,
  };
};
