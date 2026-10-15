import type { UserRole } from "@/types";
import { ALLOWEDS_ROUTES_BY_ROLE } from "@/utils/constants";

// Roles que pueden entrar a una ruta. Si la ruta no figura en ningún rol, no la ve nadie.

export const getRolesForRoute = (href: string): UserRole[] => {
  const roles = Object.keys(ALLOWEDS_ROUTES_BY_ROLE) as UserRole[];

  return roles.filter((role) => ALLOWEDS_ROUTES_BY_ROLE[role].includes(href));
};
