import type { ReactNode } from "react";

import { SideBar } from "@/components/sidebar/SideBar";
import { BottomNav } from "@/components/sidebar/BottomNav";
import { MobileTopbar } from "@/components/sidebar/MobileTopbar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <section className="flex h-screen min-w-0 flex-1 flex-col">
        {/* barra superior con logo y logout, sólo mobile */}
        <MobileTopbar />
        {children}
        {/* deja espacio para el bottomNav cuando el contenido llega al fondo */}
        <div aria-hidden="true" className="h-20 lg:hidden" />
      </section>
      <BottomNav />
    </div>
  );
};
