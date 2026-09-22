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
    <li>
      <NavLink
        to={href}
        className={({ isActive }) => {
          let classess =
            "hover:bg-background-soft text-foreground flex cursor-pointer items-center gap-4 rounded-lg p-2 font-semibold transition-transform active:scale-95";
          classess += isActive ? "bg-background-soft! text-primary!" : "";
          return classess;
        }}
      >
        <span className="pointer-events-none h-auto w-6">
          <Icon size={20} />
        </span>
        <p>{text}</p>
      </NavLink>
    </li>
  );
}
