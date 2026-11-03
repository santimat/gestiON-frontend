import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import type { AppError } from "@shared/types";
import type { LoginDTO } from "@features/auth/types";
import { useAuthStore } from "@features/auth/stores/useAuthStore";

export const useAuth = () => {
  const {
    login,
    logout,
    hydrateUser,
    authenticatedUser,
    isCheckingAuth,
    hasHydrated,
  } = useAuthStore(
    useShallow(
      ({
        login,
        logout,
        hydrateUser,
        authenticatedUser,
        isCheckingAuth,
        hasHydrated,
      }) => ({
        login,
        hydrateUser,
        authenticatedUser,
        isCheckingAuth,
        hasHydrated,
        logout,
      }),
    ),
  );

  const handleLogin = async (rawData: LoginDTO) => {
    const userRole = await login(rawData);
    return userRole;
  };

  const checkAuth = async () => {
    await hydrateUser();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cerrar la sesión.");
    }
  };

  return {
    handleLogout,
    handleLogin,
    checkAuth,
    authenticatedUser,
    isCheckingAuth,
    hasHydrated,
  };
};
