import { Avatar } from "@mantine/core";
import { useNavigate } from "react-router";

import type { AuthUser } from "@/types";
import { ROLE_DICTIONARY } from "@/utils/constants";
import { getAvatarColor } from "@/utils/getAvatarColor";
import { email } from "zod";
import { LogOut } from "lucide-react";

type SidebarFooterProps = {
  authenticatedUser: AuthUser | null;
  handleLogout: () => void;
};

export function SidebarFooter({
  authenticatedUser,
  handleLogout,
}: SidebarFooterProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    handleLogout();
    navigate("/");
  };

  if (!authenticatedUser?.email) return;

  const roleToShow = ROLE_DICTIONARY[authenticatedUser?.role];
  const avatarColor = getAvatarColor(authenticatedUser?.id);

  return (
    <footer className="border-background-soft mt-auto flex w-full items-center gap-3 border-t p-4">
      <Avatar alt="Me" color={avatarColor} />
      <div className="flex flex-1 flex-col text-sm">
        <p className="font-bold text-black capitalize">
          {authenticatedUser?.name}
        </p>
        <p className="line-clamp-1 text-gray-500" title={roleToShow}>
          {roleToShow}
        </p>
      </div>
      <button
        onClick={handleClick}
        className="hover:bg-background-soft cursor-pointer rounded-lg p-1 text-gray-400 transition-transform active:scale-95"
      >
        <LogOut />
      </button>
    </footer>
  );
}
