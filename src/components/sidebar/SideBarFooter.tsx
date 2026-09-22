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
		<footer className="group flex items-center p-4 gap-2 w-full mt-auto  border-t border-background-soft">
			<Avatar alt="Me" color={avatarColor} />
			<div className="flex flex-col text-sm">
				<p className="text-black capitalize font-bold">
					{authenticatedUser?.name}
				</p>
				<p className="text-gray-500 line-clamp-1" title={roleToShow}>
					{roleToShow}
				</p>
			</div>
			<button
				onClick={handleClick}
				className=" text-gray-400 cursor-pointer hover:bg-background-soft box-content rounded-md p-1 active:scale-95 transition-transform"
			>
				<LogOut />
			</button>
		</footer>
	);
}
