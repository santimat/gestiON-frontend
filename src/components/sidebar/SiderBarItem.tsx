import { NavLink } from "react-router";
import type { LucideIcon } from "lucide-react";

export function SideBarItem({
	text,
	icon: Icon,
	href,
}: {
	text: string;
	icon: LucideIcon;
	href: string;
}) {
	return (
		<li className=" ">
			<NavLink
				to={href}
				className={({ isActive }) => {
					let classess =
						"flex items-center gap-4 p-2 hover:bg-background-soft cursor-pointer rounded-lg text-foreground font-semibold active:scale-95 transition-transform";
					classess += isActive ? " bg-background-soft! text-primary!" : "";
					return classess;
				}}
			>
				<span className="w-6 h-auto pointer-events-none">
					<Icon size={20} />
				</span>
				<p>{text}</p>
			</NavLink>
		</li>
	);
}
