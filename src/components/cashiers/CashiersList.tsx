import { CashierItem } from "@/components/cashiers/CashierItem";
import { CashierItemMobile } from "@/components/cashiers/CashierItemMobile";
import { useCashier } from "@/hooks/useCashier";
import type { AppError } from "@/types";
import { toast } from "sonner";

export const CashiersList = () => {
  const { cashiers, toggleActive, isPendingToggleActive } = useCashier();

  const headers = ["Cajero", "Email", "Actualizado", "Estado", "Acceso"];

  const columns =
    "grid grid-cols-[1fr_1fr_0.6fr_0.5fr_0.3fr] items-center gap-x-4";

  const handleOnChangeSwitch = async (cashierId: number) => {
    try {
      await toggleActive(cashierId);
      toast.success("Se cambió el estado del cajero correctamente.");
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cambiar el estado.");
    }
  };

  return (
    <>
      {/* Escritorio */}
      <section className="bg-background border-border hidden rounded-lg border md:block">
        <ul
          className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {headers.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t text-sm">
          {cashiers.map((cashier) => {
            return (
              <CashierItem
                key={`cashier-${cashier.id}`}
                cashier={cashier}
                columns={columns}
                onChangeSwitch={handleOnChangeSwitch}
                isPendingToggleActive={isPendingToggleActive}
              />
            );
          })}
        </ul>
      </section>

      {/* Mobile */}
      <div className="grid gap-3 md:hidden">
        {cashiers.map((cashier) => (
          <CashierItemMobile
            key={`cashier-mobile-${cashier.id}`}
            cashier={cashier}
            onChangeSwitch={handleOnChangeSwitch}
            isPendingToggleActive={isPendingToggleActive}
          />
        ))}
      </div>
    </>
  );
};
