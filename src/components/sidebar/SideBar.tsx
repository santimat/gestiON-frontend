import { Link, useNavigate } from "react-router";
import { Store } from "lucide-react";

import { SIDEBAR_ITEMS } from "@/utils/constants";
import { SideBarItem } from "@/components/sidebar/SiderBarItem";
import { getRedirectByRole } from "@/utils/getRedirectByRole";
import { useAuth } from "@/hooks/useAuth";
import { SidebarFooter } from "./SideBarFooter";

export function SideBar() {
	const { authenticatedUser, handleLogout } = useAuth();

	if (!authenticatedUser?.email) return;

	const sidebarItemsToShow = SIDEBAR_ITEMS.filter(({ href }) =>
		getRedirectByRole(authenticatedUser?.role).includes(href),
	);

	return (
		<aside className="bg-background max-w-70 h-screen gap-4 border-r border-background-soft flex-col flex items-start justify-items-start">
			<header className="flex items-center gap-3 w-full px-6 py-4 border-b border-background-soft ">
				<Link to="/">
					<Store className="w-8 h-8 text-white p-1 bg-primary rounded-md" />
				</Link>
				<h1 className="font-semibold text-xl">GestiON</h1>
			</header>

			<main className="w-full px-4 text-gray-600">
				<ul className="flex flex-col gap-4">
					{sidebarItemsToShow.map((itemProps) => (
						<SideBarItem {...itemProps} key={`item-${itemProps.text}`} />
					))}
				</ul>
			</main>

			<SidebarFooter
				authenticatedUser={authenticatedUser}
				handleLogout={handleLogout}
			/>
		</aside>
	);
}
