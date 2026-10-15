import type { ReactNode } from "react";

import { SideBar } from "@/components/sidebar/SideBar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <section className="flex-1">{children}</section>
    </div>
  );
};
