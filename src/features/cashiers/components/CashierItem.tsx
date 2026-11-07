import { PenBoxIcon } from "lucide-react";
import { Switch } from "@mantine/core";

import type { User } from "@features/auth";
import { useCashierItem } from "@features/cashiers/hooks/useCashier";
import { ProductItemActions } from "@shared/components/ProductItemActions";
import { useToggleActive } from "@shared/hooks/useToggleActive";
import { formatDate } from "@shared/utils/dates";

type CashierItemProps = {
  cashier: User;
  columns: string;
};

export const CashierItem = ({ cashier, columns }: CashierItemProps) => {
  const { toggleActive, openEdit } = useCashierItem();
  const { isToggling, handleToggle } = useToggleActive(
    "Se cambió el estado del cajero correctamente.",
  );

  const updatedAt = formatDate(cashier.updatedAt);

  return (
    <li className={`p-2 ${columns}`}>
      <p>{cashier.name}</p>
      <p>{cashier.email}</p>
      <p>{updatedAt}</p>
      <Switch
        aria-label="Cambiar acceso del cajero"
        title="Cambiar acceso del cajero"
        color="green"
        checked={cashier.active}
        disabled={isToggling}
        onChange={() => handleToggle(() => toggleActive(cashier.id))}
      />
      <div className="justify-center">
        <ProductItemActions
          actionsIcons={[{ Icon: PenBoxIcon, label: "Editar cajero" }]}
          onEdit={() => openEdit(cashier)}
        />
      </div>
    </li>
  );
};
