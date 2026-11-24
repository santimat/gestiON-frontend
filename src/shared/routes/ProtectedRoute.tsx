import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

import type { UserRole } from "@shared/types";
import { useAuth } from "@features/auth";
import { LoadingPage } from "@shared/components/Loading";

export const ProtectedRoute = ({
  allowedRoles,
}: {
  allowedRoles: UserRole[];
}) => {
  const { checkAuth, authenticatedUser, hasHydrated } = useAuth();

  useEffect(() => {
    if (!hasHydrated) {
      checkAuth();
    }
  }, [hasHydrated, checkAuth]);

  if (!hasHydrated) {
    return <LoadingPage />;
  }

  if (!authenticatedUser?.email) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(authenticatedUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
