import { Select } from "@mantine/core";

import type { OffersFilter } from "@features/offers/types";

// "false" = no vencidas (el backend no distingue las programadas, eso se
// calcula en el cliente con la fecha de inicio)
const STATUS_OPTIONS: { value: "true" | "false"; label: string }[] = [
  { value: "false", label: "Vigentes" },
  { value: "true", label: "Vencidas" },
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
    <div className="flex justify-end">
      <Select
        aria-label="Filtrar por estado de la oferta"
        placeholder="Todas"
        className="w-full sm:w-44"
        clearable
        value={filters.expired ?? null}
        data={STATUS_OPTIONS}
        onChange={(value) =>
          setFilters({
            expired: (value ?? undefined) as OffersFilter["expired"],
          })
        }
      />
    </div>
  );
};
