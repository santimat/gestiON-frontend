import type { SVGProps } from "react";


export function SideBarItem({text, Icon}: {text:string, Icon: React.ComponentType<SVGProps<SVGSVGElement>>}) {
    return (
            <li className="group flex items-center gap-4 cursor-pointer -mx-2 p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
                <Icon className="group-hover:text-sky-400 transition-colors w-6 h-auto" />
                <p className="group-hover:text-gray-900">{text}</p>
            </li>
    )
}