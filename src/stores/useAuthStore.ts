import { create } from "zustand";
import type { AuthUser, LoginDTO } from "@/types";
import { authService } from "@/services/auth/authService";

interface UseAuthStore {
	user: AuthUser | null;
	login: (loginRequest: LoginDTO) => Promise<void>;
}

export const useAuthStore = create<UseAuthStore>((set) => ({
	user: null,
	login: async (loginRequest: LoginDTO) => {
		const user = await authService.login(loginRequest);
		set({ user });
	},
}));
