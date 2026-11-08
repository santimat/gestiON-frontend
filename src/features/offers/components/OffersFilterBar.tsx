import { Select } from "@mantine/core";

import type { OffersFilter } from "@features/offers/types";

const STATUS_OPTIONS: {
  value: NonNullable<OffersFilter["status"]>;
  label: string;
}[] = [
  { value: "ACTIVE", label: "Vigentes" },
  { value: "EXPIRED", label: "Vencidas" },
  { value: "SCHEDULED", label: "Programadas" },
];

const PAYMENT_METHODS_OPTIONS: {
  value: NonNullable<OffersFilter["paymentMethod"]>;
  label: string;
}[] = [
  { value: "CASH", label: "Efectivo" },
  { value: "CARD", label: "Tarjeta" },
  { value: "TRANSFER", label: "Transferencia" },
  { value: "CREDIT_ACCOUNT", label: "Cuenta Corriente" },
];

type OffersFilterBarProps = {
  filters: OffersFilter;
  setFilters: (filters: Partial<OffersFilter>) => void;
};

export const OffersFilterBar = ({
  filters,
  setFilters,
}: OffersFilterBarProps) => {
  return (
    <div className="flex gap-2">
      <Select
        aria-label="Filtrar por estado de la oferta"
        placeholder="Todas"
        label="Estado"
        className="w-full sm:w-44"
        clearable
        value={filters.status ?? null}
        data={STATUS_OPTIONS}
        onChange={(value) =>
          setFilters({
            status: value as OffersFilter["status"],
          })
        }
      />
      <Select
        aria-label="Filtrar por metodos de pagos"
        placeholder="Todas"
        label="Metodos de pago"
        className="w-full sm:w-44"
        clearable
        value={filters.paymentMethod ?? null}
        data={PAYMENT_METHODS_OPTIONS}
        onChange={(value) =>
          setFilters({
            paymentMethod: value as OffersFilter["paymentMethod"],
          })
        }
      />
    </div>
  );
};
