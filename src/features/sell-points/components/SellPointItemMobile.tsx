import { useState } from "react";
import { Button, Switch } from "@mantine/core";
import { PenBoxIcon } from "lucide-react";
import { toast } from "sonner";

import type { SellPoint } from "@features/sell-points/types";
import { useSellPointItem } from "@features/sell-points/hooks/useSellPoint";
import type { AppError } from "@shared/types";

type SellPointItemMobileProps = {
  sellPoint: SellPoint;
};

export const SellPointItemMobile = ({
  sellPoint,
}: SellPointItemMobileProps) => {
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
    <div className="border-background-soft bg-card shadow-card rounded-xl border p-4">
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
            disabled={isToggling}
            onChange={handleOnChangeSwitch}
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
