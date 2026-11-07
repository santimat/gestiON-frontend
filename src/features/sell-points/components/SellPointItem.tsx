import { PenBoxIcon } from "lucide-react";
import { Button, Switch } from "@mantine/core";

import type { SellPoint } from "@features/sell-points/types";
import { useSellPointItem } from "@features/sell-points/hooks/useSellPoint";
import { ProductItemActions } from "@shared/components/ProductItemActions";
import { useToggleActive } from "@shared/hooks/useToggleActive";
import { formatDate } from "@shared/utils/dates";

type SellPointItemProps = {
  sellPoint: SellPoint;
  columns: string;
};

export const SellPointItem = ({ sellPoint, columns }: SellPointItemProps) => {
  const { toggleActive, openEdit, openCashiersModal } = useSellPointItem();
  const { isToggling, handleToggle } = useToggleActive(
    "Se cambió el estado del punto de venta correctamente.",
  );

  const updatedAt = formatDate(sellPoint.updatedAt);

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
        onChange={() => handleToggle(() => toggleActive(sellPoint.id))}
      />
      <div className="justify-center">
        <ProductItemActions
          actionsIcons={[{ Icon: PenBoxIcon, label: "Editar punto de venta" }]}
          onEdit={() => openEdit(sellPoint)}
        />
      </div>
    </li>
  );
};
