import { create } from "zustand";

import type { LoginDTO } from "@features/auth/types";
import { authService } from "@features/auth/services/authService";
import type { UseAuthStore } from "@features/auth/stores/types";

export const useAuthStore = create<UseAuthStore>((set, get) => ({
  authenticatedUser: null,
  isCheckingAuth: false,
  hasHydrated: false,
  login: async (loginRequest: LoginDTO) => {
    const loggingUser = await authService.login(loginRequest);
    set({ authenticatedUser: loggingUser, hasHydrated: true });
    return get().authenticatedUser?.role;
  },
  logout: async () => {
    try {
      await authService.logout();
    } finally {
      // si el backend falla igual cerramos la sesión en el cliente
      set({ authenticatedUser: null, hasHydrated: false });
    }
  },
  hydrateUser: async () => {
    // la bandera evita repetir el GET /auth/me en cada navegación
    if (get().hasHydrated) return;

    set({ isCheckingAuth: true });
    try {
      const authenticatedUser = await authService.checkAuth();
      set({ authenticatedUser, isCheckingAuth: false, hasHydrated: true });
    } catch {
      set({ isCheckingAuth: false, hasHydrated: true });
    }
  },
}));
