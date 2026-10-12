import { Building2, ScanBarcode, Smartphone } from "lucide-react";

import { RoleCard } from "@/components/landing/RoleCard";

export const RolesSection = () => {
  const ROLE_ADMIN_ITEMS = [
    "Gestiona productos, categorías y cajeros",
    "Vé el panel de ganancias y las ventas del día",
    "También puede vender desde el punto de venta",
    "Controla qué comercio está activo",
  ];

  const ROLE_CASHIER_ITEMS = [
    "Entra directo al punto de venta",
    "Escanea o busca productos y arma el carrito",
    "Cobra en efectivo, tarjeta, transferencia o Mercado Pago",
    "Emite el ticket al terminar",
  ];
  return (
    <section id="roles" className="border-border scroll-mt-20 border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Dos accesos, cada uno con lo suyo
          </h2>
          <p className="text-secondary-foreground mt-3 text-sm sm:text-base">
            El menú se arma según quién entra: nadie ve opciones que no le
            sirven.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <RoleCard
            icon={Building2}
            title="Administrador"
            subtitle="El dueño del comercio"
            items={ROLE_ADMIN_ITEMS}
          />
          <RoleCard
            icon={ScanBarcode}
            title="Cajero"
            subtitle="Quien está en el mostrador"
            items={ROLE_CASHIER_ITEMS}
          />
        </div>

        <div className="bg-card text-secondary-foreground border-border mt-6 flex items-center gap-2.5 rounded-xl border p-4 text-sm">
          <Smartphone className="text-primary h-4 w-4" strokeWidth={2} />
          Los mismos módulos funcionan en la PC del mostrador y en el celular:
          no hay que aprender dos formas de trabajar.
        </div>
      </div>
    </section>
  );
};
