import { PenBoxIcon } from "lucide-react";
import { Button, Switch } from "@mantine/core";

import type { SellPoint } from "@/types";
import { useSellPoint } from "@/hooks/useSellPoint";

type SellPointItemProps = {
  sellPoint: SellPoint;
  columns: string;
  onChangeSwitch: (sellPointId: number) => void;
};

export const SellPointItem = ({
  sellPoint,
  columns,
  onChangeSwitch,
}: SellPointItemProps) => {
  const { openEdit, openCashiersModal } = useSellPoint();

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
        onChange={() => onChangeSwitch(sellPoint.id)}
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
