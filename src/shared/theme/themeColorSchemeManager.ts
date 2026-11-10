import type { MantineColorSchemeManager } from "@mantine/core";

import type { Theme } from "@shared/types";

/** Clave de localStorage donde se persiste el tema elegido. */
export const THEME_STORAGE_KEY = "gestiON-theme";

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

let storageListener: ((event: StorageEvent) => void) | null = null;

/**
 * Manager de color scheme de Mantine respaldado por la clave de la app:
 * si el usuario nunca eligió un tema se devuelve "auto" y se sigue la
 * preferencia del sistema, igual que hace Mantine por defecto.
 */
export const themeColorSchemeManager: MantineColorSchemeManager = {
  get: (defaultValue) => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (isTheme(stored)) return stored;
    } catch {
      // storage bloqueado: se usa el valor por defecto
    }
    return defaultValue;
  },
  set: (value) => {
    if (value !== "light" && value !== "dark") return;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      // storage bloqueado: el tema solo vive en esta sesión
    }
  },
  subscribe: (onUpdate) => {
    storageListener = (event) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const next = event.newValue;
      if (next === "light" || next === "dark") onUpdate(next);
    };
    window.addEventListener("storage", storageListener);
  },
  unsubscribe: () => {
    if (!storageListener) return;
    window.removeEventListener("storage", storageListener);
    storageListener = null;
  },
  clear: () => {
    try {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {
      // storage bloqueado: el tema solo vive en esta sesión
    }
  },
};
