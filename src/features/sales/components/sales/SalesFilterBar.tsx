import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import type {
  PaymentMethod,
  SalesFilter,
  SaleStatus,
} from "@features/sales/types";
import {
  PAYMENT_METHODS_LABELS,
  STATUS_PAYMENT,
} from "@features/sales/dictionary";

const STATUS_OPTIONS: { value: SaleStatus | ""; label: string }[] = [
  { value: "PAYED", label: STATUS_PAYMENT.PAYED },
  { value: "PENDING", label: STATUS_PAYMENT.PENDING },
];

const PAYMENT_METHOD_OPTIONS: { value: PaymentMethod; label: string }[] =
  Object.entries(PAYMENT_METHODS_LABELS).map(([value, label]) => ({
    value: value as PaymentMethod,
    label,
  }));

type SalesFilterBarProps = {
  filters: SalesFilter;
  setFilters: (filters: SalesFilter) => void;
};

export const SalesFilterBar = ({
  filters,
  setFilters,
}: SalesFilterBarProps) => {
  // el buscador arranca como "" (no undefined): así el input siempre es controlado
  // y el valor debounced se puede comparar contra el filtro sin comparar undefined contra ""
  const [searchText, setSearchText] = useState(filters.searchText ?? "");
  const [debouncedSearch] = useDebouncedValue(searchText, 350);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchText(value);
  };

  useEffect(() => {
    if (debouncedSearch === (filters.searchText ?? "")) return;

    // al cambiar el texto de búsqueda volvemos a la primera página (en el mismo setFilters: un solo request)
    setFilters({ searchText: debouncedSearch, page: 1 });
  }, [debouncedSearch, filters.searchText, setFilters]);

  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <TextInput
        aria-label="Buscar ventas"
        placeholder="Buscar por cliente"
        leftSection={<Search size={16} strokeWidth={1.75} />}
        value={searchText}
        onChange={handleChange}
      />
      <Select
        aria-label="Filtrar por método de pago"
        placeholder="Todos los métodos"
        className="sm:w-44"
        clearable
        value={filters.paymentMethod ?? null}
        data={PAYMENT_METHOD_OPTIONS}
        onChange={(value) =>
          setFilters({ paymentMethod: value as PaymentMethod, page: 1 })
        }
      />
      <Select
        aria-label="Filtrar por estado de pago"
        placeholder="Pago o pendiente"
        className="sm:w-40"
        clearable
        value={filters.status ?? null}
        data={STATUS_OPTIONS}
        onChange={(value) =>
          setFilters({ status: value as SaleStatus, page: 1 })
        }
      />
    </div>
  );
};
