import { SideBar } from "@/components/sidebar/SideBar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-2">
      <SideBar />
      <section>{children}</section>
    </div>
  );
};
