import { useEffect, useState } from "react";
import { UsersIcon } from "lucide-react";

import { ModalHeader } from "@shared/components/ModalHeader";
import { useSellPoint } from "@features/sell-points/hooks/useSellPoint";
import { toastAppError } from "@shared/utils/toastAppError";
import type { User } from "@features/auth";
import type { SellPoint } from "@features/sell-points/types";

type SellPointCashiersProps = {
  sellPoint: SellPoint | null;
  closeModal: () => void;
};

export const SellPointCashiers = ({
  sellPoint,
  closeModal,
}: SellPointCashiersProps) => {
  const { getSellPointCashiers } = useSellPoint();

  const [cashiers, setCashiers] = useState<User[]>([]);
  // arranca en true cuando hay un punto seleccionado: la lista espera el fetch
  const [isLoading, setIsLoading] = useState(() => sellPoint !== null);

  // al abrir el modal cargamos los cajeros asignados al punto de venta
  useEffect(() => {
    if (!sellPoint) return;

    getSellPointCashiers(sellPoint.id)
      .then((assigned) => setCashiers(assigned))
      .catch((error) => {
        toastAppError(
          error,
          "No se pudieron cargar los cajeros del punto de venta.",
        );
        closeModal();
      })
      .finally(() => setIsLoading(false));
  }, [sellPoint, getSellPointCashiers, closeModal]);

  return (
    <div>
      <ModalHeader
        title={sellPoint ? `Cajeros de ${sellPoint.name}` : "Cajeros"}
        Icon={UsersIcon}
      />

      {isLoading ? (
        <p className="text-secondary-foreground p-2 text-sm">
          Cargando cajeros asignados...
        </p>
      ) : cashiers.length === 0 ? (
        <p className="text-secondary-foreground p-2 text-sm">
          No hay cajeros asignados a este punto de venta.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {cashiers.map((cashier) => (
            <li
              key={`sell-point-cashier-${cashier.id}`}
              className="border-background-soft bg-card rounded-lg border p-3"
            >
              <p className="truncate text-sm font-medium">
                {cashier.name}
                {!cashier.active && (
                  <span className="text-secondary-foreground ml-2 text-xs font-normal">
                    Inactivo
                  </span>
                )}
              </p>
              <p className="text-secondary-foreground truncate text-xs">
                {cashier.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
