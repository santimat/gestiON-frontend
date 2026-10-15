import { Link } from "react-router";
import { Store } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { SIDEBAR_ITEMS } from "@/utils/constants";
import { getRolesForRoute } from "@/utils/getRolesForRoute";
import { SideBarItem } from "@/components/sidebar/SiderBarItem";
import { SidebarFooter } from "@/components/sidebar/SideBarFooter";

export const SideBar = () => {
  const { authenticatedUser, handleLogout } = useAuth();

  if (!authenticatedUser?.email) return;

  const sidebarItemsToShow = SIDEBAR_ITEMS.filter(({ href }) =>
    getRolesForRoute(href).includes(authenticatedUser.role),
  );

  return (
    <aside className="bg-background border-border flex h-screen max-w-80 flex-col items-start justify-items-start gap-4 border-r lg:w-70">
      <header className="border-border flex w-full items-center gap-4 border-b p-4">
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
