import type { AuthUser, LoginDTO, UserRole } from "@/types";

export type UseAuthStore = {
  authenticatedUser: AuthUser | null;
  isCheckingAuth: boolean;
  hasHydrated: boolean;
  login: (loginRequest: LoginDTO) => Promise<UserRole | undefined>;
  logout: () => Promise<void>;
  hydrateUser: () => Promise<void>;
};
