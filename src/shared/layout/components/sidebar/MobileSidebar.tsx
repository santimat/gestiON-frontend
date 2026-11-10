import { Drawer } from "@mantine/core";
import { Link } from "react-router";

import { useAuth } from "@features/auth";
import { SIDEBAR_ITEMS } from "@shared/config/navigation";
import { GestiONLogo } from "@shared/components/GestiONLogo";
import { getRolesForRoute } from "@shared/config/permissions";
import { SideBarItem } from "@shared/layout/components/sidebar/SiderBarItem";
import { SidebarFooter } from "@shared/layout/components/sidebar/SideBarFooter";

type MobileSidebarProps = {
  opened: boolean;
  close: () => void;
};

export const MobileSidebar = ({ opened, close }: MobileSidebarProps) => {
  const { authenticatedUser, handleLogout } = useAuth();

  if (!authenticatedUser?.email) return null;

  // misma lógica de roles que el sidebar para que nunca se desincronicen
  const sidebarItemsToShow = SIDEBAR_ITEMS.filter(({ href }) =>
    getRolesForRoute(href).includes(authenticatedUser.role),
  );

  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="left"
      size={288}
      withCloseButton={false}
      classNames={{
        content: "bg-background",
        header: "bg-background",
        body: "flex flex-col p-0",
      }}
    >
      <header className="border-background-soft flex h-18 w-full items-center gap-4 border-b px-4">
        <Link to="/" onClick={close} className="flex items-center gap-4">
          <GestiONLogo className="h-auto w-10" />
          <h3 className="text-2xl font-semibold">GestiON</h3>
        </Link>
      </header>

      <main className="w-full flex-1 overflow-y-auto px-4 py-4 text-gray-600">
        <ul className="flex flex-col gap-4">
          {sidebarItemsToShow.map((itemProps) => (
            <SideBarItem
              {...itemProps}
              onClick={close}
              key={`mobile-${itemProps.text}`}
            />
          ))}
        </ul>
      </main>

      <SidebarFooter
        authenticatedUser={authenticatedUser}
        handleLogout={handleLogout}
      />
    </Drawer>
  );
};
