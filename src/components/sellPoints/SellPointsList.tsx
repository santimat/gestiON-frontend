import { SellPointItem } from "@/components/sellPoints/SellPointItem";
import { SellPointItemMobile } from "@/components/sellPoints/SellPointItemMobile";
import { useSellPoint } from "@/hooks/useSellPoint";
import type { AppError, SellPoint } from "@/types";
import { toast } from "sonner";

type SellPointsListProps = {
  sellPoints: SellPoint[];
};

export const SellPointsList = ({ sellPoints }: SellPointsListProps) => {
  const { toggleActive } = useSellPoint();

  const handleChangeSwitch = async (sellPointId: number) => {
    try {
      await toggleActive(sellPointId);
      toast.success("Se cambió el estado del punto de venta correctamente.");
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cambiar el estado.");
    }
  };

  const headers = [
    "Punto de venta",
    "Cajeros",
    "Actualizado",
    "Estado",
    "Acciones",
  ];

  const columns =
    "grid grid-cols-[1fr_1.2fr_0.6fr_0.5fr_0.3fr] items-center gap-x-4";

  return (
    <>
      {/* Escritorio */}
      <section className="bg-background border-border hidden rounded-lg border md:block">
        <ul
          className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {headers.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t text-sm">
          {sellPoints.map((sellPoint) => {
            return (
              <SellPointItem
                key={`sell-point-${sellPoint.id}`}
                sellPoint={sellPoint}
                columns={columns}
                onChangeSwitch={handleChangeSwitch}
              />
            );
          })}
        </ul>
      </section>

      {/* Mobile */}
      <div className="grid gap-3 md:hidden">
        {sellPoints.map((sellPoint) => (
          <SellPointItemMobile
            key={`sell-point-mobile-${sellPoint.id}`}
            sellPoint={sellPoint}
            onChangeSwitch={handleChangeSwitch}
          />
        ))}
      </div>
    </>
  );
};
