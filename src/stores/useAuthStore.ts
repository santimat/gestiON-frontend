import { authService } from "@/services/authService";
import type { AuthUser, LoginDTO } from "@/types";
import { create } from "zustand";

interface UseAuthStore {
	user: AuthUser | null;
	isLoading: boolean;
	login: (loginRequest: LoginDTO) => Promise<void>;
}

export const useAuthStore = create<UseAuthStore>((set) => ({
	user: null,
	isLoading: false,
	login: async (loginRequest: LoginDTO) => {
		try {
			set({ isLoading: true });
			const user = authService.login(loginRequest);
			console.log("user from authstore", user);
		} catch (err) {
			set({ isLoading: false });
			throw err;
		}
	},
}));
