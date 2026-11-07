import { useShallow } from "zustand/shallow";

import type { LoginDTO } from "@features/auth/types";
import { toastAppError } from "@shared/utils/toastAppError";
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
      toastAppError(error, "No se pudo cerrar la sesión.");
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
