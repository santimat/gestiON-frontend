import { PenBoxIcon } from "lucide-react";
import { Button, Switch } from "@mantine/core";

import type { SellPoint } from "@features/sell-points/types";
import { useSellPointItem } from "@features/sell-points/hooks/useSellPoint";
import { ProductItemActions } from "@shared/components/ProductItemActions";
import { useToggleActive } from "@shared/hooks/useToggleActive";
import { formatDate } from "@shared/utils/dates";

type SellPointItemMobileProps = {
  sellPoint: SellPoint;
};

export const SellPointItemMobile = ({
  sellPoint,
}: SellPointItemMobileProps) => {
  const { toggleActive, openEdit, openCashiersModal } = useSellPointItem();
  const { isToggling, handleToggle } = useToggleActive(
    "Se cambió el estado del punto de venta correctamente.",
  );

  const updatedAt = formatDate(sellPoint.updatedAt);

  return (
    <div className="border-background-soft bg-card shadow-card rounded-xl border p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{sellPoint.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <ProductItemActions
            actionsIcons={[
              { Icon: PenBoxIcon, label: "Editar punto de venta" },
            ]}
            onEdit={() => openEdit(sellPoint)}
          />
          <Switch
            aria-label="Cambiar estado del punto de venta"
            title="Cambiar estado del punto de venta"
            color="green"
            checked={sellPoint.active}
            disabled={isToggling}
            onChange={() => handleToggle(() => toggleActive(sellPoint.id))}
          />
        </div>
      </div>
      <div className="mt-3">
        <Button
          size="compact-sm"
          aria-label="Ver cajeros del punto de venta"
          title="Ver cajeros del punto de venta"
          onClick={() => openCashiersModal(sellPoint)}
        >
          Ver cajeros
        </Button>
      </div>
      <div className="border-background-soft mt-3 flex items-center justify-between border-t pt-3">
        <p className="text-secondary-foreground text-xs">
          Actualizado {updatedAt}
        </p>
        <p
          className={
            sellPoint.active
              ? "text-success text-xs font-medium"
              : "text-secondary-foreground text-xs"
          }
        >
          {sellPoint.active ? "Activo" : "Inactivo"}
        </p>
      </div>
    </div>
  );
};
