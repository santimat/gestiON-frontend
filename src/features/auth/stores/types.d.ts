import type { UserRole } from "@shared/types";
import type { AuthUser, LoginDTO } from "@features/auth/types";

export type UseAuthStore = {
  authenticatedUser: AuthUser | null;
  isCheckingAuth: boolean;
  hasHydrated: boolean;
  login: (loginRequest: LoginDTO) => Promise<UserRole | undefined>;
  logout: () => Promise<void>;
  hydrateUser: () => Promise<void>;
};
