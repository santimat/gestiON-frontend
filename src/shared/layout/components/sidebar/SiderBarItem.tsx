import { NavLink } from "react-router";
import type { LucideIcon } from "lucide-react";

export const SideBarItem = ({
  text,
  icon: Icon,
  href,
  onClick,
}: {
  text: string;
  icon: LucideIcon;
  href: string;
  onClick?: () => void;
}) => {
  return (
    <li>
      <NavLink
        to={href}
        onClick={onClick}
        className={({ isActive }) =>
          `hover:bg-background-soft text-secondary-foreground flex cursor-pointer items-center gap-4 rounded-lg p-2 font-semibold transition-transform active:scale-95 ${
            isActive ? "bg-background-soft! text-primary!" : ""
          }`
        }
      >
        <span className="pointer-events-none h-auto w-6">
          <Icon size={20} />
        </span>
        <p>{text}</p>
      </NavLink>
    </li>
  );
};
