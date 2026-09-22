import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { LoadingPage } from "@/components/Loading";
import { getRedirectByRole } from "@/utils/getRedirectByRole";

export function GuestRoute() {
	const { checkAuth, authenticatedUser, isCheckingAuth } = useAuth();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingPage />;

	if (authenticatedUser?.email) {
		const routeToRedirect = getRedirectByRole(authenticatedUser?.role);
		return <Navigate to={routeToRedirect} replace />;
	}

	return <Outlet />;
}
