import { NavLink } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { SIDEBAR_ITEMS } from "@/utils/constants";
import { getRolesForRoute } from "@/utils/getRolesForRoute";

export const BottomNav = () => {
  const { authenticatedUser } = useAuth();

  if (!authenticatedUser?.email) return null;

  // misma lógica de roles que el sidebar para que nunca se desincronicen
  const sidebarItemsToShow = SIDEBAR_ITEMS.filter(({ href }) =>
    getRolesForRoute(href).includes(authenticatedUser.role),
  );

  return (
    <nav
      aria-label="Navegación principal"
      className="bg-background border-border fixed inset-x-0 bottom-0 z-30 border-t lg:hidden"
    >
      <ul className="flex items-stretch">
        {sidebarItemsToShow.map(({ icon: Icon, text, short, href }) => (
          <li key={`bottom-${text}`} className="min-w-0 flex-1">
            <NavLink
              to={href}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-1 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-secondary-foreground hover:bg-background-soft"
                }`
              }
            >
              <Icon className="pointer-events-none" size={20} />
              <span className="w-full truncate text-center">{short}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
