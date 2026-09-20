import { useAuthStore } from "@/stores/useAuthStore";
import type { LoginDTO } from "@/types";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { isAxiosError } from "axios";
import { useShallow } from "zustand/shallow";
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
	};

	const checkAuth = async () => {
		try {
			await hydrateUser();
		} catch (err) {
			if (isAxiosError(err)) {
				handleAxiosErrors(err);
			}
		}
	};

	return { handleLogin, checkAuth, authenticatedUser };
}
