import { create } from "zustand";

import type { AuthUser, LoginDTO } from "@/types";
import { authService } from "@/services/auth/authService";

interface UseAuthStore {
	authenticatedUser: AuthUser | null;
	isPending: boolean;
	login: (loginRequest: LoginDTO) => Promise<void>;
	hydrateUser: () => Promise<void>;
}

export const useAuthStore = create<UseAuthStore>((set) => ({
	authenticatedUser: null,
	isPending: true,
	login: async (loginRequest: LoginDTO) => {
		const loggingUser = await authService.login(loginRequest);
		set({ authenticatedUser: loggingUser });
	},
	hydrateUser: async () => {
		const authenticatedUser = await authService.checkAuth();
		set({ authenticatedUser, isPending: false });
	},
}));
