// Acá tenes importa el Icono de la tiendita
// el "@" se usa como un alias para la ruta ./src/
import { StoreIcon } from "@/shared/icons/StoreIcon";
import { PeopleIcon } from "../icons/PeopleIcon";
import { DashboardIcon } from "../icons/DashboardIcon";
import { Group, NavLink } from '@mantine/core';
import { BarcodeIcon } from "../icons/BarcodeIcon";
import { BoxIcon } from "../icons/BoxIcon";
import { DesignIcon } from "../icons/DesignIcon";
import { ExitIcon } from "../icons/ExitIcon";
import { UserIcon } from "../icons/UserIcon";

export function SideBar() {
	return (
		// acá solo limité el ancho, agregué un poco de padding e hice que se estire a la altura de la pantalla
		<aside className="max-w-70 p-4 h-screen bg-background">
			<section className="bg-background justify-items-start" >
				<Group>
					<div className="bg-blue-500 rounded-2xl p-2 text-white ">
						<StoreIcon />
					</div>
					<div className="text black font-semibold">
						<h1>GestiON</h1>
					</div>
				</Group>
			</section>

			<section className="max-w-70 p-4 h-screen bg-background">
				<>
					<NavLink
						href="#required-for-focus"
						label="Dashboard"
						leftSection={<DashboardIcon />}
					/>
					<NavLink
						href="#required-for-focus"
						label="Puntos de venta"
						leftSection={<BarcodeIcon />}
					/>
					<NavLink
						href="#required-for-focus"
						label="Productos"
						leftSection={<BoxIcon />}

					/>
					<NavLink
						href="#required-for-focus"
						label="Cajeros"
						leftSection={<PeopleIcon />}
					/>
					<NavLink
						href="#required-for-focus"
						label="Sistema de Diseño"
						leftSection={<DesignIcon />}
					/>
				</>
			</section>
			<Group className="bg-background justify-center flex flex-row" >
				<div className="bg-background-soft text-black p-2 rounded-b-full">
					<UserIcon />
				</div>
				<div>
					<h1>Nombre de Usuario</h1>
					<p>Administrador</p>
				</div>
				<div className="ml-auto text-gray-400 rounded-full">
					<ExitIcon />
				</div>

			</Group>
		</aside>
	);
}
