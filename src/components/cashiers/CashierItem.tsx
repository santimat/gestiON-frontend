import { PenBoxIcon } from "lucide-react";
import { Button, Switch } from "@mantine/core";

import type { User } from "@/types";
import { useCashier } from "@/hooks/useCashier";

type CashierItemProps = {
  cashier: User;
  columns: string;
  onChangeSwitch?: (cashierId: number) => Promise<void>;
  isPendingToggleActive?: boolean;
};

export const CashierItem = ({
  cashier,
  columns,
  isPendingToggleActive,
  onChangeSwitch,
}: CashierItemProps) => {
  const { openEdit } = useCashier();

  const updatedAt = new Date(cashier.updatedAt).toLocaleDateString("es-AR");

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
        disabled={isPendingToggleActive}
        onChange={() => onChangeSwitch && onChangeSwitch(cashier.id)}
      />
      <div className="justify-center">
        <Button
          size="compact-sm"
          aria-label="Editar cajero"
          title="Editar cajero"
          onClick={() => openEdit(cashier)}
        >
          <PenBoxIcon pointerEvents={"none"} size={20} />
        </Button>
      </div>
    </li>
  );
};
