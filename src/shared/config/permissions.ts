import type { UserRole } from "@shared/types";

export const ALLOWEDS_ROUTES_BY_ROLE = {
  SUDO: ["/commerces"],
  OWNER: [
    "/dashboard",
    "/cashiers",
    "/sell-point",
    "/products",
    "/categories",
    "/offers",
    "/sell",
    "/sales",
    "/clients",
    "/settings",
  ],
  CASHIER: ["/sell", "/sales", "/products", "/clients", "/offers"],
};

export const ROLE_DICTIONARY = {
  OWNER: "Dueño",
  CASHIER: "Cajero",
  SUDO: "Administrador general",
};

// Roles que pueden entrar a una ruta. Si la ruta no figura en ningún rol, no la ve nadie.
export const getRolesForRoute = (href: string): UserRole[] => {
  const roles = Object.keys(ALLOWEDS_ROUTES_BY_ROLE) as UserRole[];

  return roles.filter((role) => ALLOWEDS_ROUTES_BY_ROLE[role].includes(href));
};

export const getRedirectByRole = (role: UserRole | undefined) => {
  if (!role) {
    return "/";
  }
  return ALLOWEDS_ROUTES_BY_ROLE[role][0];
};
