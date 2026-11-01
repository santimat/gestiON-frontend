import { Link } from "react-router";
import { Store } from "lucide-react";

import { useAuth } from "@/features/auth";
import { SIDEBAR_ITEMS } from "@shared/config/navigation";
import { getRolesForRoute } from "@shared/config/permissions";
import { SideBarItem } from "@shared/layout/components/sidebar/SiderBarItem";
import { SidebarFooter } from "@shared/layout/components/sidebar/SideBarFooter";

export const SideBar = () => {
  const { authenticatedUser, handleLogout } = useAuth();
  if (!authenticatedUser?.email) return;

  const sidebarItemsToShow = SIDEBAR_ITEMS.filter(({ href }) =>
    getRolesForRoute(href).includes(authenticatedUser.role),
  );

  return (
    <aside className="bg-background border-border hidden h-screen max-w-80 flex-col items-start justify-items-start gap-4 border-r lg:flex lg:w-70">
      <header className="border-border flex h-18 w-full items-center gap-4 border-b px-4">
        <Link to="/">
          <Store className="bg-primary h-10 w-10 rounded-md p-1 text-white" />
        </Link>
        <h3 className="text-2xl font-semibold">GestiON</h3>
      </header>

      <main className="w-full px-4 text-gray-600">
        <ul className="flex flex-col gap-4">
          {sidebarItemsToShow.map((itemProps) => (
            <SideBarItem {...itemProps} key={`item-${itemProps.text}`} />
          ))}
        </ul>
      </main>

      <SidebarFooter
        authenticatedUser={authenticatedUser}
        handleLogout={handleLogout}
      />
    </aside>
  );
};
