import { lazy, type ReactNode } from "react";

import { useIsMobile } from "@shared/hooks/useMediaQuery";
import { SideBar } from "@shared/layout/components/sidebar/SideBar";
import { useHeaderContent } from "@shared/layout/hooks/usePageHeader";
import { BottomNav } from "@shared/layout/components/sidebar/BottomNav";

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

export const MainLayout = ({ children }: { children: ReactNode }) => {
  // cada vista registra su header con usePageHeader
  const header = useHeaderContent();
  // debajo de lg el sidebar está oculto: ahí se muestran topbar y bottom nav
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen">
      <SideBar />
      <section className="bg-background flex h-screen flex-1 flex-col">
        {isMobile ? <MobileTopbar /> : null}

        {header ? (
          <PageHeader
            title={header.title}
            subtitle={header.subtitle}
            actions={header.actions}
          />
        ) : null}
        <div className="overflow-y-auto">{children}</div>
        <div aria-hidden="true" className="h-20 lg:hidden" />
      </section>
      <BottomNav />
    </div>
  );
};
