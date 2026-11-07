import { PenBoxIcon } from "lucide-react";
import { Switch } from "@mantine/core";

import type { User } from "@features/auth";
import { useCashierItem } from "@features/cashiers/hooks/useCashier";
import { ProductItemActions } from "@shared/components/ProductItemActions";
import { useToggleActive } from "@shared/hooks/useToggleActive";
import { formatDate } from "@shared/utils/dates";

type CashierItemMobileProps = {
  cashier: User;
};

export const CashierItemMobile = ({ cashier }: CashierItemMobileProps) => {
  const { toggleActive, openEdit } = useCashierItem();
  const { isToggling, handleToggle } = useToggleActive(
    "Se cambió el estado del cajero correctamente.",
  );

  const updatedAt = formatDate(cashier.updatedAt);
  const initials = cashier.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="border-background-soft bg-card shadow-card rounded-xl border p-4">
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
        <div className="flex items-center gap-3">
          <ProductItemActions
            actionsIcons={[{ Icon: PenBoxIcon, label: "Editar cajero" }]}
            onEdit={() => openEdit(cashier)}
          />
          <Switch
            aria-label="Cambiar acceso del cajero"
            title="Cambiar acceso del cajero"
            color="green"
            checked={cashier.active}
            disabled={isToggling}
            onChange={() => handleToggle(() => toggleActive(cashier.id))}
          />
        </div>
      </div>
      <div className="border-background-soft mt-3 flex items-center justify-between border-t pt-3">
        <p className="text-secondary-foreground text-xs">
          Actualizado {updatedAt}
        </p>
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
