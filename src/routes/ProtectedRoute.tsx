import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute({ allowedRoles }: { allowedRoles: UserRole[] }) {
	const { checkAuth, authenticatedUser } = useAuth();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (!authenticatedUser?.email) {
		return <Navigate to="/" />;
	}

	if (!allowedRoles.includes(authenticatedUser?.role || "")) {
		return <Navigate to={"/unauthorized"} replace />;
	}

	return <Outlet />;
}
