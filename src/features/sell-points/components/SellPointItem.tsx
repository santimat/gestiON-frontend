import { useState } from "react";
import { PenBoxIcon } from "lucide-react";
import { toast } from "sonner";
import { Button, Switch } from "@mantine/core";

import type { SellPoint } from "@features/sell-points/types";
import { useSellPointItem } from "@features/sell-points/hooks/useSellPoint";
import type { AppError } from "@shared/types";

type SellPointItemProps = {
  sellPoint: SellPoint;
  columns: string;
};

export const SellPointItem = ({ sellPoint, columns }: SellPointItemProps) => {
  const { toggleActive, openEdit, openCashiersModal } = useSellPointItem();
  const [isToggling, setIsToggling] = useState(false);

  const handleOnChangeSwitch = async () => {
    setIsToggling(true);
    try {
      await toggleActive(sellPoint.id);
      toast.success("Se cambió el estado del punto de venta correctamente.");
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cambiar el estado.");
    } finally {
      setIsToggling(false);
    }
  };

  const updatedAt = new Date(sellPoint.updatedAt).toLocaleDateString("es-AR");

  return (
    <li className={`p-2 ${columns}`}>
      <p>{sellPoint.name}</p>
      <div>
        <Button
          size="compact-sm"
          aria-label="Ver cajeros del punto de venta"
          title="Ver cajeros del punto de venta"
          onClick={() => openCashiersModal(sellPoint)}
        >
          Ver cajeros
        </Button>
      </div>
      <p>{updatedAt}</p>
      <Switch
        aria-label="Cambiar estado del punto de venta"
        title="Cambiar estado del punto de venta"
        color="green"
        checked={sellPoint.active}
        disabled={isToggling}
        onChange={handleOnChangeSwitch}
      />
      <div className="justify-center">
        <Button
          size="compact-sm"
          aria-label="Editar punto de venta"
          title="Editar punto de venta"
          onClick={() => openEdit(sellPoint)}
        >
          <PenBoxIcon pointerEvents={"none"} size={20} />
        </Button>
      </div>
    </li>
  );
};
