// Acá tenes importa el Icono de la tiendita
// el "@" se usa como un alias para la ruta ./src/
import { StoreIcon } from "@/shared/icons/StoreIcon";
import { PeopleIcon } from "../icons/PeopleIcon";
import { DashboardIcon } from "../icons/DashboardIcon";
import { BarcodeIcon } from "../icons/BarcodeIcon";
import { BoxIcon } from "../icons/BoxIcon";
import { DesignIcon } from "../icons/DesignIcon";
import { ExitIcon } from "../icons/ExitIcon";
import { UserIcon } from "../icons/UserIcon";

export function SideBar() {
	return (
		<aside className="bg-background w-64 h-screen py-4 gap-4 border-r border-background-soft flex-col flex items-start justify-items-start ">

			<header className="flex items-center gap-3 w-full px-4 pb-6 border-b border-background-soft ">
				<div className="bg-primary text-white p-2 rounded-md flex items-center justify-center" >
						<StoreIcon className="w-5 h-5" />
				</div>
				<p className="font-semibold">GestiON</p>
			</header>

			<main className="w-full pt-4 px-6 text-gray-600">
				<ul className="flex flex-col gap-4">
					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<DashboardIcon className="group-hover:text-sky-400 transition-colors" />
						<p className="group-hover:text-gray-900">Dashboard</p>
					</li>

					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<BarcodeIcon className="group-hover:text-sky-400 transition-colors"/>
						<p className="group-hover:text-gray-900">Puntos de venta</p>
					</li>

					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<BoxIcon className="group-hover:text-sky-400 transition-colors"/>
						<p className="group-hover:text-gray-900">Productos</p>
					</li>

					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<PeopleIcon className="group-hover:text-sky-400 transition-colors"/>
						<p className="group-hover:text-gray-900">Cajeros</p>
					</li>

					<li className="group flex items-center gap-4 cursor-pointer -mx-2 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-150">
						<DesignIcon className="group-hover:text-sky-400 transition-colors"/>
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


