import { useEffect, useState } from "react";
import { Search, PackageMinus } from "lucide-react";
import { Select, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import type { ProductFilters } from "@features/products/types";
import { useCategory } from "@features/categories";
import { STOCK_STATUS } from "@features/products/constants";

const SEARCH_DEBOUNCE_MS = 350;

type ProductsFilterBarProps = {
  filters: ProductFilters;
  setFilters: (filters: Partial<ProductFilters>) => void;
};

const STOCK_STATUS_LABELS: Record<(typeof STOCK_STATUS)[number], string> = {
  LOW_STOCK: "Stock bajo",
  WITHOUT_STOCK: "Sin stock",
};

const STOCK_STATUS_OPTIONS = STOCK_STATUS.map((status) => ({
  value: status,
  label: STOCK_STATUS_LABELS[status],
}));

export const ProductsFilterBar = ({
  filters,
  setFilters,
}: ProductsFilterBarProps) => {
  const { categories, getCategories } = useCategory();
  // el buscador arranca como "" (no undefined): así el input siempre es controlado
  const [searchText, setSearchText] = useState(filters.searchText ?? "");
  const [debouncedSearch] = useDebouncedValue(searchText, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (debouncedSearch === (filters.searchText ?? "")) return;

    // al cambiar un filtro volvemos a la primera página (en el mismo setFilters: un solo request)
    setFilters({ searchText: debouncedSearch, page: 1 });
  }, [debouncedSearch, filters.searchText, setFilters]);

  const categoryOptions = categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <TextInput
        aria-label="Buscar productos"
        placeholder="Buscar por nombre"
        leftSection={<Search size={16} strokeWidth={1.75} />}
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)}
      />
      <Select
        aria-label="Filtrar por categoría"
        placeholder="Todas las categorías"
        className="sm:w-48"
        clearable
        searchable
        nothingFoundMessage="No se encontraron categorías"
        value={filters.categoryId ? String(filters.categoryId) : null}
        data={categoryOptions}
        onChange={(value) =>
          setFilters({
            categoryId: value ? Number(value) : undefined,
            page: 1,
          })
        }
      />
      <Select
        aria-label="Filtrar por estado de stock"
        placeholder="Todo el stock"
        className="sm:w-40"
        clearable
        nothingFoundMessage="No se encontraron estados"
        value={filters.stockStatus ?? null}
        data={STOCK_STATUS_OPTIONS}
        leftSection={<PackageMinus size={16} strokeWidth={1.75} />}
        onChange={(value) =>
          setFilters({
            stockStatus: value ?? undefined,
            page: 1,
          })
        }
      />
    </div>
  );
};
