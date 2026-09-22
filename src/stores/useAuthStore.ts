import { create } from "zustand";

import type { AuthUser, LoginDTO, UserRole } from "@/types";
import { authService } from "@/services/auth/authService";

interface UseAuthStore {
	authenticatedUser: AuthUser | null;
	isCheckingAuth: boolean;
	login: (loginRequest: LoginDTO) => Promise<UserRole | undefined>;
	logout: () => Promise<void>;
	hydrateUser: () => Promise<void>;
}

export const useAuthStore = create<UseAuthStore>((set, get) => ({
	authenticatedUser: null,
	isCheckingAuth: true,
	login: async (loginRequest: LoginDTO) => {
		const loggingUser = await authService.login(loginRequest);
		set({ authenticatedUser: loggingUser });
		return get().authenticatedUser?.role;
	},
	logout: async () => {
		try {
			await authService.logout();
			set({ authenticatedUser: null });
		} catch (err) {
			console.log(err);
		}
	},
	hydrateUser: async () => {
		try {
			const authenticatedUser = await authService.checkAuth();
			set({ authenticatedUser, isCheckingAuth: false });
		} catch {
			set({ isCheckingAuth: false });
		}
	},
}));
