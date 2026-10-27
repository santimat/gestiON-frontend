import { Button, Switch } from "@mantine/core";
import { PenBoxIcon } from "lucide-react";

import type { SellPoint } from "@/types";
import { useSellPoint } from "@/hooks/useSellPoint";

type SellPointItemMobileProps = {
  sellPoint: SellPoint;
  onChangeSwitch: (sellPointId: number) => void;
};

export const SellPointItemMobile = ({
  sellPoint,
  onChangeSwitch,
}: SellPointItemMobileProps) => {
  const { openEdit } = useSellPoint();

  const updatedAt = new Date(sellPoint.updatedAt).toLocaleDateString("es-AR");

  return (
    <div className="border-border bg-card shadow-card rounded-xl border p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{sellPoint.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Editar punto de venta"
            title="Editar punto de venta"
            onClick={() => openEdit(sellPoint)}
            className="text-secondary-foreground hover:bg-background-soft hover:text-foreground rounded-md p-1.5 transition-colors"
          >
            <PenBoxIcon pointerEvents="none" size={18} />
          </button>
          <Switch
            aria-label="Cambiar estado del punto de venta"
            title="Cambiar estado del punto de venta"
            color="green"
            checked={sellPoint.active}
            onChange={() => onChangeSwitch(sellPoint.id)}
          />
        </div>
      </div>
      <div className="mt-3">
        {/* TODO: va a disparar el fetch de cajeros del punto de venta cuando exista el endpoint */}
        <Button
          size="compact-sm"
          disabled
          aria-label="Ver cajeros del punto de venta"
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
