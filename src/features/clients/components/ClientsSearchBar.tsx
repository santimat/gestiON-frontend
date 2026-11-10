import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import { useFilters } from "@shared/hooks/useFilters";
import { ClientFiltersSchema } from "@features/clients/schemas/ClientFiltersSchema";

const SEARCH_DEBOUNCE_MS = 350;

export const ClientsSearchBar = () => {
  const { filters, setFilters } = useFilters(ClientFiltersSchema);
  const [searchText, setSearchText] = useState(filters.searchText ?? "");
  const [debouncedSearch] = useDebouncedValue(searchText, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedSearch === (filters.searchText ?? "")) return;

    // al cambiar el texto de búsqueda volvemos a la primera página (en el mismo setFilters: un solo request)
    setFilters({ searchText: debouncedSearch, page: 1 });
  }, [debouncedSearch, filters.searchText, setFilters]);

  return (
    <TextInput
      leftSection={<SearchIcon size={18} />}
      label="Buscar cliente"
      placeholder="Nombre, apellido o DNI"
      aria-label="Buscar cliente"
      value={searchText}
      onChange={(event) => setSearchText(event.currentTarget.value)}
    />
  );
};
