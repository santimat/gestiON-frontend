import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

import type { UserRole } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { LoadingPage } from "@/components/Loading";

export function ProtectedRoute({ allowedRoles }: { allowedRoles: UserRole[] }) {
  const { checkAuth, authenticatedUser, isCheckingAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingPage />;
  }

  if (!authenticatedUser?.email) {
    return <Navigate to="/" replace />;
  }

  // if (!allowedRoles.includes(authenticatedUser?.role)) {
  // 	return <Navigate to={"/unauthorized"} replace />;
  // }

  return <Outlet />;
}
