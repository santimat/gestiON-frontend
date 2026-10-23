import { Switch } from "@mantine/core";
import { toast } from "sonner";

import type { User } from "@/types";
import { useCashier } from "@/hooks/useCashier";
import type { AppError } from "@/types";

type CashierItemMobileProps = {
  cashier: User;
};

export const CashierItemMobile = ({ cashier }: CashierItemMobileProps) => {
  const { isPendingToggleActive, toggleActive } = useCashier();

  const handleOnChangeSwitch = async () => {
    try {
      await toggleActive(cashier.id);
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cambiar el estado.");
    }
  };

  const createdAt = new Date(cashier.createdAt).toLocaleDateString("es-AR");
  const initials = cashier.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="border-border bg-card shadow-card rounded-xl border p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="bg-primary/40 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{cashier.name}</p>
            <p className="text-secondary-foreground truncate text-xs">
              {cashier.email}
            </p>
          </div>
        </div>
        <Switch
          aria-label="Cambiar acceso del cajero"
          title="Cambiar acceso del cajero"
          color="green"
          checked={cashier.active}
          disabled={isPendingToggleActive}
          onChange={handleOnChangeSwitch}
        />
      </div>
      <div className="border-background-soft mt-3 flex items-center justify-between border-t pt-3">
        <p className="text-secondary-foreground text-xs">Alta {createdAt}</p>
        <p
          className={
            cashier.active
              ? "text-success text-xs font-medium"
              : "text-secondary-foreground text-xs"
          }
        >
          {cashier.active ? "Acceso habilitado" : "Sin acceso"}
        </p>
      </div>
    </div>
  );
};
