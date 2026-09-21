import { useShallow } from "zustand/shallow";

import type { LoginDTO } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";

export function useAuth() {
	const { login, hydrateUser, authenticatedUser } = useAuthStore(
		useShallow((s) => ({
			login: s.login,
			hydrateUser: s.hydrateUser,
			authenticatedUser: s.authenticatedUser,
		})),
	);
	const handleLogin = async (rawData: LoginDTO) => {
		await login(rawData);
		console.log(authenticatedUser);
	};

	const checkAuth = async () => {
		await hydrateUser();
	};

	return { handleLogin, checkAuth, authenticatedUser };
}
