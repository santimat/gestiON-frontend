import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import type { CashierFilters } from "@features/cashiers/types";

const SEARCH_DEBOUNCE_MS = 350;

type CashiersFilterBarProps = {
  filters: CashierFilters;
  setFilters: (filters: Partial<CashierFilters>) => void;
};

export const CashiersFilterBar = ({
  filters,
  setFilters,
}: CashiersFilterBarProps) => {
  // el buscador arranca como "" (no undefined): así el input siempre es controlado
  const [searchText, setSearchText] = useState(filters.searchText ?? "");
  const [debouncedSearch] = useDebouncedValue(searchText, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedSearch === (filters.searchText ?? "")) return;

    // al cambiar el texto de búsqueda volvemos a la primera página (en el mismo setFilters: un solo request)
    setFilters({ searchText: debouncedSearch, page: 1 });
  }, [debouncedSearch, filters.searchText, setFilters]);

  return (
    <div className="grid gap-2 sm:max-w-md">
      <TextInput
        aria-label="Buscar cajeros"
        placeholder="Buscar por nombre o email"
        leftSection={<Search size={16} strokeWidth={1.75} />}
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)}
      />
    </div>
  );
};
