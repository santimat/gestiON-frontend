import { Link, useNavigate } from "react-router";
import { LogOut, Menu, StoreIcon } from "lucide-react";

import { useAuth } from "@features/auth";

type MobileTopbarProps = {
  onOpenMenu: () => void;
};

export const MobileTopbar = ({ onOpenMenu }: MobileTopbarProps) => {
  const { authenticatedUser, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    await handleLogout();
    navigate("/");
  };

  if (!authenticatedUser?.email) return null;

  return (
    <header className="bg-background border-border flex items-center justify-between border-b p-4 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          aria-label="Abrir menú"
          title="Abrir menú"
          className="hover:bg-background-soft cursor-pointer rounded-lg p-1 text-gray-600 transition-transform active:scale-95"
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-3">
          <StoreIcon className="bg-primary h-8 w-8 rounded-md p-1 text-white" />
          <span className="text-lg font-semibold">GestiON</span>
        </Link>
      </div>
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
