import { StoreIcon } from "@/shared/icons/StoreIcon";
import { DashboardIcon } from "@/shared/icons/DashboardIcon";
import { BarcodeIcon } from "@/shared/icons/BarcodeIcon";
import { BoxIcon } from "@/shared/icons/BoxIcon";
import { DesignIcon } from "@/shared/icons/DesignIcon";
import { ExitIcon } from "@/shared/icons/ExitIcon";
import { UserIcon } from "@/shared/icons/UserIcon";
import { PeopleIcon } from "@/shared/icons/PeopleIcon";

export function SideBar() {
	return (
		<aside className="bg-background max-w-64 h-screen gap-4 border-r border-background-soft flex-col flex items-start justify-items-start">
			<header className="flex items-center gap-3 w-full p-4 border-b border-background-soft ">
				<StoreIcon className="w-8 h-8 text-white p-1 bg-primary rounded-md" />
				<h1 className="font-semibold text-xl">GestiON</h1>
			</header>

			<main className="w-full p-4 text-gray-600">
				<ul className="flex flex-col gap-4">
					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<DashboardIcon className="group-hover:text-sky-400 transition-colors w-6 h-auto" />
						<p className="group-hover:text-gray-900">Dashboard</p>
					</li>

					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<BarcodeIcon className="group-hover:text-sky-400 transition-colors w-6 h-auto" />
						<p className="group-hover:text-gray-900">Puntos de venta</p>
					</li>

					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<BoxIcon className="group-hover:text-sky-400 transition-colors w-6 h-auto" />
						<p className="group-hover:text-gray-900">Productos</p>
					</li>

					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<PeopleIcon className="group-hover:text-sky-400 transition-colors w-6 h-auto" />
						<p className="group-hover:text-gray-900">Cajeros</p>
					</li>

					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<DesignIcon className="group-hover:text-sky-400 transition-colors w-6 h-auto" />
						<p className="group-hover:text-gray-900">Sistema de diseño</p>
					</li>
				</ul>
			</main>

			<footer className="group flex items-center px-4 gap-2 w-full mt-auto pt-4 border-t border-background-soft">
				<UserIcon />
				<div className="flex flex-col text-sm">
					<p className="text-black">Nombre de usuario</p>
					<p className="text-gray-500">Administrador</p>
				</div>
				<ExitIcon className="ml-auto text-gray-400 cursor-pointer transition-colors hover:bg-gray-200  box-content rounded-md" />
			</footer>
		</aside>
	);
}
