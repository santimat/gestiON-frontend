import {
  LayoutDashboard,
  LogOut,
  Package,
  ScanBarcode,
  Store,
  UserIcon,
  Users,
} from "lucide-react";
import { SideBarItem } from "@/shared/components/SideBarItem";

export function SideBar() {
  const sidebarItems = [
    { icon: LayoutDashboard, text: "Dashboard" },
    { icon: ScanBarcode, text: "Puntos de venta" },
    { icon: Package, text: "Productos" },
    { icon: Users, text: "Cajeros" },
  ];
  return (
    <aside className="bg-background max-w-64 h-screen gap-4 border-r border-background-soft flex-col flex items-start justify-items-start">
      <header className="flex items-center gap-3 w-full px-6 py-4 border-b border-background-soft ">
        <Store className="w-8 h-8 text-white p-1 bg-primary rounded-md" />
        <h1 className="font-semibold text-xl">GestiON</h1>
      </header>

      <main className="w-full p-4 text-gray-600">
        <ul className="flex flex-col gap-4">
          {sidebarItems.map((itemProps) => (
            <SideBarItem {...itemProps} />
          ))}
        </ul>
      </main>

      <footer className="group flex items-center p-4 gap-2 w-full mt-auto  border-t border-background-soft">
        <UserIcon />
        <div className="flex flex-col text-sm">
          <p className="text-black">Nombre de usuario</p>
          <p className="text-gray-500">Administrador</p>
        </div>
        <LogOut className="ml-auto text-gray-400 cursor-pointer transition-colors hover:bg-gray-200  box-content rounded-md" />
      </footer>
    </aside>
  );
}
