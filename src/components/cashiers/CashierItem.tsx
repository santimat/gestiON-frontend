import { Switch } from "@mantine/core";
import { toast } from "sonner";

import type { AppError, User } from "@/types";
import { useCashier } from "@/hooks/useCashier";

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
      <p className={cashier.active ? "text-success" : "text-warning"}>
        {cashier.active ? "Activo" : "Inactivo"}
      </p>
      <Switch
        aria-label="Cambiar acceso del cajero"
        title="Cambiar acceso del cajero"
        color="green"
        checked={cashier.active}
        disabled={isPendingToggleActive}
        onChange={handleOnChangeSwitch}
      />
    </li>
  );
};
