import {
  Building2,
  Package,
  ScanBarcode,
  Tags,
  TrendingUp,
  Users,
} from "lucide-react";

export const FeaturesSection = () => {
  const FEATURES = [
    {
      icon: Package,
      title: "Inventario sin planillas",
      description:
        "Cada producto con precio, stock, stock mínimo y código. Se marca solo cuando está por agotarse.",
    },
    {
      icon: ScanBarcode,
      title: "Punto de venta rápido",
      description:
        "Buscá o escaneá el código, armá el carrito, elegí cómo te pagan y emití el ticket en segundos.",
    },
    {
      icon: Tags,
      title: "Categorías que ordenan",
      description:
        "Creá y renombrá categorías cuando hace falta, incluso mientras cargás un producto nuevo.",
    },
    {
      icon: Users,
      title: "Cajeros con su lugar",
      description:
        "Altas, bajas y permisos: cada cajero entra directo a vender, sin menús de más.",
    },
    {
      icon: TrendingUp,
      title: "Panel de ganancias",
      description:
        "Ventas del día, ticket promedio y qué productos se están yendo más, en una sola pantalla.",
    },
    {
      icon: Building2,
      title: "Pensado para varios comercios",
      description:
        "Cada comercio trabaja con lo suyo. El alta lo administra el equipo de GestiON.",
    },
  ];

  return (
    <section id="features" className="border-border scroll-mt-20 border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="max-w-2.5xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Todo lo que un comercio necesita, sin nada de más
          </h2>
          <p className="text-secondary-foreground mt-3 text-sm sm:text-base">
            Seis módulos que cubren el día a día: de la carga del producto al
            ticket que sale del mostrador.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ title, icon: Icon, description }) => (
            <li
              key={title}
              className="bg-card shadow-card hover:border-input border-border rounded-xl border p-5 transition-colors"
            >
              <span className="bg-primary-soft text-primary grid h-9 w-9 place-items-center rounded-lg">
                <Icon className="h-auto w-5" />
              </span>
              <h3 className="mt-2 text-lg font-semibold">{title}</h3>
              <p className="text-secondary-foreground mt-1.5 text-sm leading-relaxed">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
