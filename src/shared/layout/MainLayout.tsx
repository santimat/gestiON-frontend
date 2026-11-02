import { lazy, Suspense, type ReactNode } from "react";

import { useMediaQuery, SHELL_QUERY } from "@shared/hooks/useMediaQuery";
import { SideBar } from "@shared/layout/components/sidebar/SideBar";
import { BottomNav } from "@shared/layout/components/sidebar/BottomNav";
import { useHeaderContent } from "@shared/layout/hooks/usePageHeader";

// lazy: el topbar mobile y el header de página se cargan sólo cuando se muestran
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
  const isMobileShell = useMediaQuery(SHELL_QUERY);

  return (
    <div className="flex h-screen">
      <SideBar />
      <section className="flex h-screen min-w-0 flex-1 flex-col">
        {/* barra superior con logo y logout, sólo mobile */}
        {isMobileShell ? (
          <Suspense fallback={null}>
            <MobileTopbar />
          </Suspense>
        ) : null}
        {/* header de la página, fijo en el layout */}
        {header ? (
          <Suspense fallback={null}>
            <PageHeader
              title={header.title}
              subtitle={header.subtitle}
              actions={header.actions}
            />
          </Suspense>
        ) : null}
        {children}
        {/* deja espacio para el bottomNav cuando el contenido llega al fondo */}
        <div aria-hidden="true" className="h-20 lg:hidden" />
      </section>
      <BottomNav />
    </div>
  );
};
