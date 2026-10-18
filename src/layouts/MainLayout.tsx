import type { ReactNode } from "react";

import { SideBar } from "@/components/sidebar/SideBar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <section className="flex h-screen flex-1 flex-col">{children}</section>
    </div>
  );
};
