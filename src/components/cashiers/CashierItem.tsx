import { Switch } from "@mantine/core";

import type { User } from "@/types";
import { useUser } from "@/hooks/useUser";

type CashierItemProps = {
  cashier: User;
  columns: string;
};

export const CashierItem = ({ cashier, columns }: CashierItemProps) => {
  const { isPendingToggleActive, toggleActive } = useUser();

  const handleOnChangeSwitch = async () => {
    await toggleActive(cashier.id);
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
