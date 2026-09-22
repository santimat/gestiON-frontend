import type { UserRole } from "@/types";
import { ALLOWEDS_ROUTES_BY_ROLE } from "@/utils/constants";

export function getRedirectByRole(role: UserRole | undefined) {
	if (!role) {
		return "/";
	}
	return ALLOWEDS_ROUTES_BY_ROLE[role][0];
}
