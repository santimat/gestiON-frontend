import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, TextInput } from "@mantine/core";

import type { SalesFilter, SaleStatus } from "@/types";

const STATUS_OPTIONS: { value: SaleStatus; label: string }[] = [
  { value: "PAY", label: "Pagas" },
  { value: "PENDING", label: "Pendientes" },
];

type SalesFilterBarProps = {
  filters: SalesFilter;
  setFilters: (filters: SalesFilter) => void;
};

export const SalesFilterBar = ({
  filters,
  setFilters,
}: SalesFilterBarProps) => {
  const [searchText, setSearchText] = useState(filters.searchText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchText(value);
  };

  useEffect(() => {
    if (searchText === (filters.searchText ?? "")) return;

    const timeoutId = setTimeout(() => {
      setFilters({ searchText: searchText });
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchText, filters.searchText, setFilters]);

  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
      <TextInput
        aria-label="Buscar ventas"
        placeholder="Buscar por número, cliente o producto"
        leftSection={<Search size={16} strokeWidth={1.75} />}
        value={searchText}
        onChange={handleChange}
      />
      <Select
        aria-label="Filtrar por estado"
        placeholder="Pagas y pendientes"
        clearable
        className="sm:w-40"
        value={filters.status}
        data={STATUS_OPTIONS}
        onChange={(value) => setFilters({ status: value as SaleStatus })}
      />
    </div>
  );
};
