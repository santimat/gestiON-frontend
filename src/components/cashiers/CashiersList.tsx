import { BuildingComplexIcon } from "lucide-react";

import { CashierItem } from "@/components/cashiers/CashierItem";
import { useUser } from "@/hooks/useUser";
import { LoadingPage } from "../Loading";

export const CashiersList = () => {
  const { cashiers, isLoading } = useUser();

  const headers = ["Cajero", "Email", "Alta", "Estado", "Acceso"];

  const columns =
    "grid grid-cols-[1fr_1fr_0.6fr_0.5fr_0.3fr] items-center gap-x-4";

  if (isLoading) {
    return <LoadingPage />;
  }

  if (cashiers.length === 0) {
    return (
      <div className="border-border text-secondary-foreground flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border p-10">
        <BuildingComplexIcon size={40} strokeWidth={1.5} />
        <p className="text-foreground font-medium">
          No hay cajeros para mostrar
        </p>
        <p className="text-sm">Agregá uno nuevo para empezar.</p>
      </div>
    );
  }

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <ul
        className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
      >
        {headers.map((header) => (
          <li key={header}>{header}</li>
        ))}
      </ul>
      <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t">
        {cashiers.map((cashier) => {
          return (
            <CashierItem
              key={`cashier-${cashier.id}`}
              cashier={cashier}
              columns={columns}
            />
          );
        })}
      </ul>
    </section>
  );
};
