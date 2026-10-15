import { create } from "zustand";

import type { AuthUser, LoginDTO, UserRole } from "@/types";
import { authService } from "@/services/auth/authService";

interface UseAuthStore {
  authenticatedUser: AuthUser | null;
  isCheckingAuth: boolean;
  hasHydrated: boolean;
  login: (loginRequest: LoginDTO) => Promise<UserRole | undefined>;
  logout: () => Promise<void>;
  hydrateUser: () => Promise<void>;
}

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
