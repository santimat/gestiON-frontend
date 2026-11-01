import { Link, useNavigate } from "react-router";
import { LogOut, StoreIcon } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export const MobileTopbar = () => {
  const { authenticatedUser, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    await handleLogout();
    navigate("/");
  };

  if (!authenticatedUser?.email) return null;

  return (
    <header className="bg-background border-border sticky top-0 z-20 flex items-center justify-between border-b p-4 lg:hidden">
      <Link to="/" className="flex items-center gap-3">
        <StoreIcon className="bg-primary h-8 w-8 rounded-md p-1 text-white" />
        <span className="text-lg font-semibold">GestiON</span>
      </Link>
      <button
        onClick={handleClick}
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
        className="hover:bg-background-soft cursor-pointer rounded-lg p-1 text-gray-400 transition-transform active:scale-95"
      >
        <LogOut className="pointer-events-none" size={22} />
      </button>
    </header>
  );
};
