import { useState } from "react";
import { Search } from "lucide-react";
import { Select, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";

import { useSales } from "@/hooks/useSales";
import type { SaleStatus } from "@/types";

const STATUS_OPTIONS: { value: SaleStatus; label: string }[] = [
  { value: "PAY", label: "Pagas" },
  { value: "PENDING", label: "Pendientes" },
];

export const SalesFilterBar = () => {
  const { salesFilter, setSalesFilter } = useSales();

  // el texto viaja con debounce para no pegarle al backend por cada letra
  const [query, setQuery] = useState(salesFilter.searchText);
  const debouncedSearch = useDebouncedCallback<(value: string) => void>(
    (value) => {
      void setSalesFilter({ searchText: value });
    },
    300,
  );

  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
      <TextInput
        aria-label="Buscar ventas"
        placeholder="Buscar por número, cliente o producto"
        leftSection={<Search size={16} strokeWidth={1.75} />}
        value={query}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setQuery(value);
          debouncedSearch(value);
        }}
      />
      <Select
        aria-label="Filtrar por estado"
        placeholder="Pagas y pendientes"
        clearable
        className="sm:w-40"
        value={salesFilter.status}
        data={STATUS_OPTIONS}
        onChange={(value) =>
          void setSalesFilter({ status: (value as SaleStatus) ?? null })
        }
      />
    </div>
  );
};
