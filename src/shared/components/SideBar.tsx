// Acá tenes importa el Icono de la tiendita
// el "@" se usa como un alias para la ruta ./src/
import { StoreIcon } from "@/shared/icons/StoreIcon";

export function SideBar() {
	return (
		// acá solo limité el ancho, agregué un poco de padding e hice que se estire a la altura de la pantalla
		<section className="max-w-70 p-4 h-screen bg-background">
			<h1>Aca tenés que crear el sidebar</h1>
		</section>
	);
}
