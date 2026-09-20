import { useAuthStore } from "@/stores/useAuthStore";
import type { LoginDTO } from "@/types";

export function useAuth() {
	const login = useAuthStore((s) => s.login);

	const handleLogin = async (rawData: LoginDTO) => {
		await login(rawData);
	};

	return { handleLogin };
}
