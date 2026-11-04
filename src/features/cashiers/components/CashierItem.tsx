import { useState } from "react";
import { PenBoxIcon } from "lucide-react";
import { toast } from "sonner";
import { Button, Switch } from "@mantine/core";

import type { User } from "@features/auth";
import { useCashierItem } from "@features/cashiers/hooks/useCashier";
import type { AppError } from "@shared/types";

type CashierItemProps = {
  cashier: User;
  columns: string;
};

export const CashierItem = ({ cashier, columns }: CashierItemProps) => {
  const { toggleActive, openEdit } = useCashierItem();
  const [isToggling, setIsToggling] = useState(false);

  const handleOnChangeSwitch = async () => {
    setIsToggling(true);
    try {
      await toggleActive(cashier.id);
      toast.success("Se cambió el estado del cajero correctamente.");
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cambiar el estado.");
    } finally {
      setIsToggling(false);
    }
  };

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
        disabled={isToggling}
        onChange={handleOnChangeSwitch}
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
