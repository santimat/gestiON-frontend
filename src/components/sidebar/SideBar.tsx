import { Link } from "react-router";
import { Store } from "lucide-react";

import { SIDEBAR_ITEMS } from "@/utils/constants";
import { SideBarItem } from "@/components/sidebar/SiderBarItem";
import { getRedirectByRole } from "@/utils/getRedirectByRole";
import { useAuth } from "@/hooks/useAuth";
import { SidebarFooter } from "./SideBarFooter";

export function SideBar() {
  const { authenticatedUser, handleLogout } = useAuth();

  if (!authenticatedUser?.email) return;

  const sidebarItemsToShow = SIDEBAR_ITEMS.filter(({ href }) =>
    getRedirectByRole(authenticatedUser?.role).includes(href),
  );

  return (
    <aside className="bg-background border-border flex h-screen max-w-70 flex-col items-start justify-items-start gap-4 border-r">
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
}
