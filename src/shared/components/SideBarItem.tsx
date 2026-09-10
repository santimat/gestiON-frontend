import type { LucideIcon } from "lucide-react";

export function SideBarItem({
  text,
  icon: Icon,
}: {
  text: string;
  icon: LucideIcon;
}) {
  return (
    <li className="group flex items-center gap-4 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
      <span className="group-hover:text-sky-400 transition-colors w-6 h-auto pointer-events-none">
        <Icon size={20} />
      </span>
      <p className="group-hover:text-gray-900">{text}</p>
    </li>
  );
}
