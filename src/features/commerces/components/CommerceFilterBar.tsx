import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Select, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import type { CommerceFilters } from "@features/commerces/types";

const SEARCH_DEBOUNCE_MS = 350;

const STATUS_OPTIONS = [
  { value: "true", label: "Activos" },
  { value: "false", label: "Inactivos" },
];

type CommerceFilterBarProps = {
  filters: CommerceFilters;
  setFilters: (filters: Partial<CommerceFilters>) => void;
};

export const CommerceFilterBar = ({
  filters,
  setFilters,
}: CommerceFilterBarProps) => {
  // el buscador arranca como "" (no undefined): así el input siempre es controlado
  const [searchText, setSearchText] = useState(filters.searchText ?? "");
  const [debouncedSearch] = useDebouncedValue(searchText, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedSearch === (filters.searchText ?? "")) return;

    setFilters({ searchText: debouncedSearch });
  }, [debouncedSearch, filters.searchText, setFilters]);

  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
      <TextInput
        aria-label="Buscar comercios"
        placeholder="Buscar por nombre, dueño, email o CUIT"
        leftSection={<Search size={16} strokeWidth={1.75} />}
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)}
      />
      <Select
        aria-label="Filtrar por estado"
        placeholder="Todos los estados"
        className="sm:w-44"
        clearable
        value={filters.active === undefined ? null : String(filters.active)}
        data={STATUS_OPTIONS}
        onChange={(value) =>
          setFilters({
            active: value === null ? undefined : value === "true",
          })
        }
      />
    </div>
  );
};
