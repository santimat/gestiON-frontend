import type { ReactNode } from "react";

import { PageHeader } from "@/components/PageHeader";
import { SideBar } from "@/components/sidebar/SideBar";
import { BottomNav } from "@/components/sidebar/BottomNav";
import { MobileTopbar } from "@/components/sidebar/MobileTopbar";
import { useHeaderContent } from "@/hooks/usePageHeader";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  // cada vista registra su header con usePageHeader
  const header = useHeaderContent();

  return (
    <div className="flex h-screen">
      <SideBar />
      <section className="flex h-screen min-w-0 flex-1 flex-col">
        {/* barra superior con logo y logout, sólo mobile */}
        <MobileTopbar />
        {/* header de la página, fijo en el layout */}
        {header ? (
          <PageHeader
            title={header.title}
            subtitle={header.subtitle}
            actions={header.actions}
          />
        ) : null}
        {children}
        {/* deja espacio para el bottomNav cuando el contenido llega al fondo */}
        <div aria-hidden="true" className="h-20 lg:hidden" />
      </section>
      <BottomNav />
    </div>
  );
};
