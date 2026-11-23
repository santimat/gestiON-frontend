import { lazy, type ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

import { SHELL_QUERY, useMediaQuery } from "@shared/hooks/useMediaQuery";
import { SideBar } from "@shared/layout/components/sidebar/SideBar";
import { useHeaderContent } from "@shared/layout/hooks/usePageHeader";
import { MobileSidebar } from "@shared/layout/components/sidebar/MobileSidebar";
import { EntityFormModal } from "@shared/components/EntityFormModal";
import { useClient } from "@features/clients";

const MobileTopbar = lazy(() =>
  import("@shared/layout/components/sidebar/MobileTopbar").then((module) => ({
    default: module.MobileTopbar,
  })),
);
const PageHeader = lazy(() =>
  import("@shared/layout/PageHeader").then((module) => ({
    default: module.PageHeader,
  })),
);
const ClientForm = lazy(() =>
  import("@features/clients/components/ClientForm").then((module) => ({
    default: module.ClientForm,
  })),
);

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { formClient, isFormModalOpen, closeFormModal } = useClient();
  // cada vista registra su header con usePageHeader
  const header = useHeaderContent();
  // debajo de lg el sidebar está oculto: ahí se muestran topbar y drawer
  const isMobileShell = useMediaQuery(SHELL_QUERY);
  const [menuOpened, { open: openMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <div className="bg-background flex min-h-dvh">
      <SideBar />
      <section className="bg-background flex min-h-dvh flex-1 flex-col md:h-dvh">
        {isMobileShell ? (
          <>
            <MobileTopbar onOpenMenu={openMenu} />
            <MobileSidebar opened={menuOpened} close={closeMenu} />
          </>
        ) : null}

        {header ? (
          <PageHeader
            title={header.title}
            subtitle={header.subtitle}
            actions={header.actions}
          />
        ) : null}
        <div className="flex-1 overflow-y-auto">
          <div className="xl:mx-auto xl:w-[80%] [&>main]:p-4">{children}</div>
        </div>
      <EntityFormModal
          opened={isFormModalOpen}
          closeModal={closeFormModal}
          entityKey={formClient?.id ?? "create"}
        >
          <ClientForm client={formClient} closeModal={closeFormModal} />
        </EntityFormModal>
      </section>
    </div>
  );
};
