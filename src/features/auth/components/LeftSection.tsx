import { StatsIcon } from "@/shared/icons/StatsIcon";
import { PackageIcon } from "@/shared/icons/PackageIcon";
import { StoreIcon } from "@/shared/icons/StoreIcon";
import { CashRegister } from "@/shared/icons/CashRegister";

export function LeftSection() {
	return (
		<section className="bg-card max-w-140 flex flex-col justify-between p-12">
			<header className="flex gap-2 items-center">
				<StoreIcon className="w-10 h-10 bg-primary text-card p-1 rounded-lg" />
				<h1 className="text-foreground font-semibold">GestiON</h1>
			</header>
			<div>
				<div>
					<h2 className="font-bold text-4xl">
						Controlá tu stock y tus ventas en un solo lugar.
					</h2>
					<p className="text-secondary-foreground mt-4">
						Pensado para comercios chicos: cargá productos, sumá cajeros y vendé
						rápido desde el mostrador o el celular.
					</p>
				</div>
				<ul className="flex flex-col gap-6 mt-8">
					<li className="flex gap-2 ">
						<CashRegister className="w-10 h-10 text-primary bg-primary-soft p-2 rounded-lg" />
						<div>
							<h4 className="font-semibold">Registro de ventas</h4>
							<p className="text-secondary-foreground text-sm">
								Registrá tus ventas de forma facil y rápida.
							</p>
						</div>
					</li>
					<li className="flex gap-2 ">
						<PackageIcon className="w-10 h-10 text-primary bg-primary-soft p-2 rounded-lg" />
						<div>
							<h4 className="font-semibold">Control de stock</h4>
							<p className="text-secondary-foreground text-sm">
								Visualizá, controlá y cargá stock fácil.
							</p>
						</div>
					</li>
					<li className="flex gap-2 ">
						<StatsIcon className="w-10 h-10 text-primary bg-primary-soft p-2 rounded-lg" />
						<div>
							<h4 className="font-semibold">Visualización de reportes</h4>
							<p className="text-secondary-foreground text-sm">
								Métricas, graficos y avisos.
							</p>
						</div>
					</li>
				</ul>
			</div>
			<footer>
				<p className="text-secondary-foreground text-xs">
					Sistema de gestión para pymes
				</p>
			</footer>
		</section>
	);
}
