import { Button, Switch } from "@mantine/core";
import { toast } from "sonner";

import type { AppError, User } from "@/types";
import { useCashier } from "@/hooks/useCashier";
import { PenBoxIcon } from "lucide-react";

type CashierItemProps = {
  cashier: User;
  columns: string;
};

export const CashierItem = ({ cashier, columns }: CashierItemProps) => {
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

  return (
    <li className={`p-2 ${columns}`}>
      <p>{cashier.name}</p>
      <p>{cashier.email}</p>
      <p>{createdAt}</p>
      <Switch
        aria-label="Cambiar acceso del cajero"
        title="Cambiar acceso del cajero"
        color="green"
        checked={cashier.active}
        disabled={isPendingToggleActive}
        onChange={handleOnChangeSwitch}
      />
      <div className="justify-center">
        <Button
          size="compact-sm"
          aria-label="Editar cajero"
          title="Editar cajero"
          onClick={() => onEdit(cashier)}
        >
          <PenBoxIcon pointerEvents={"none"} size={20} />
        </Button>
      </div>
    </li>
  );
};
