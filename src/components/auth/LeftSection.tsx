import {
  BanknoteArrowUp,
  ChartNoAxesColumnIncreasing,
  Package,
  Store,
} from "lucide-react";

export const LeftSection = () => {
  return (
    <section className="bg-card flex max-w-140 flex-col justify-between p-12">
      <header className="flex items-center gap-2">
        <Store className="bg-primary text-card h-10 w-10 rounded-lg p-1" />
        <h1 className="text-foreground font-semibold">GestiON</h1>
      </header>
      <div>
        <div>
          <h2 className="text-4xl font-bold">
            Controlá tu stock y tus ventas en un solo lugar.
          </h2>
          <p className="text-secondary-foreground mt-4">
            Pensado para comercios chicos: cargá productos, sumá cajeros y vendé
            rápido desde el mostrador o el celular.
          </p>
        </div>
        <ul className="mt-8 flex flex-col gap-6">
          <li className="flex gap-2">
            <BanknoteArrowUp className="text-primary bg-primary-soft h-10 w-10 rounded-lg p-2" />
            <div>
              <h4 className="font-semibold">Registro de ventas</h4>
              <p className="text-secondary-foreground text-sm">
                Registrá tus ventas de forma facil y rápida.
              </p>
            </div>
          </li>
          <li className="flex gap-2">
            <Package className="text-primary bg-primary-soft h-10 w-10 rounded-lg p-2" />
            <div>
              <h4 className="font-semibold">Control de stock</h4>
              <p className="text-secondary-foreground text-sm">
                Visualizá, controlá y cargá stock fácil.
              </p>
            </div>
          </li>
          <li className="flex gap-2">
            <ChartNoAxesColumnIncreasing className="text-primary bg-primary-soft h-10 w-10 rounded-lg p-2" />
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
};
