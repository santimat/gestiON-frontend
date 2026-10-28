import { Avatar } from "@mantine/core";
import { useNavigate } from "react-router";

import type { AuthUser } from "@/types";
import { ROLE_DICTIONARY } from "@/utils/constants";
import { getAvatarColor } from "@/utils/getAvatarColor";
import { LogOut } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useCommerce } from "@/hooks/useCommerce";
import { ImageViewer } from "../ImageViewer";

type SidebarFooterProps = {
  authenticatedUser: AuthUser | null;
  handleLogout: () => Promise<void>;
};

export const SidebarFooter = ({
  authenticatedUser,
  handleLogout,
}: SidebarFooterProps) => {
  // los hooks van antes de cualquier return condicional
  const navigate = useNavigate();
  const [opened, { open: openAvatar, close: closeAvatar }] =
    useDisclosure(false);
  const { currentCommerce, getCurrentCommerce } = useCommerce();

  useEffect(() => {
    if (authenticatedUser?.email) getCurrentCommerce();
  }, [authenticatedUser, getCurrentCommerce]);

  if (!authenticatedUser?.email) return;

  const handleClick = async () => {
    await handleLogout();
    navigate("/");
  };

  const roleToShow = ROLE_DICTIONARY[authenticatedUser?.role];
  const avatarColor = getAvatarColor(authenticatedUser?.id);

  return (
    <>
      <ImageViewer
        opened={opened}
        closeImageViewer={closeAvatar}
        title={`Comercio: ${currentCommerce?.name}`}
        imageUrl={currentCommerce?.businessLogoUrl}
        key={currentCommerce?.name}
      />
      <footer className="border-background-soft mt-auto flex w-full items-center gap-3 border-t p-4">
        <Avatar
          alt="Me"
          color={avatarColor}
          src={currentCommerce?.businessLogoUrl}
          onClick={openAvatar}
          className={
            currentCommerce?.businessLogoUrl ? "hover:cursor-pointer" : ""
          }
        />
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
    </>
  );
};
