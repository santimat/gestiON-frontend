import { useShallow } from "zustand/shallow";

import type { LoginDTO } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";

export const useAuth = () => {
  const { login, logout, hydrateUser, authenticatedUser, isCheckingAuth } =
    useAuthStore(
      useShallow(
        ({
          login,
          logout,
          hydrateUser,
          authenticatedUser,
          isCheckingAuth,
        }) => ({
          login,
          hydrateUser,
          authenticatedUser,
          isCheckingAuth,
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
    await logout();
  };

  return {
    handleLogout,
    handleLogin,
    checkAuth,
    authenticatedUser,
    isCheckingAuth,
  };
};
