import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { getRedirectByRole } from "@/utils/getRedirectByRole";

export const GuestRoute = () => {
  const { checkAuth, authenticatedUser, hasHydrated } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // mientras no sepamos si hay sesión dejamos pasar (landing y login públicos)
  if (hasHydrated && authenticatedUser) {
    return <Navigate to={getRedirectByRole(authenticatedUser.role)} replace />;
  }

  return <Outlet />;
};
