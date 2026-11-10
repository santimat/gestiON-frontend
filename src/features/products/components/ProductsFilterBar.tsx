import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Select, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import type { ProductFilters } from "@features/products/types";
import { useCategory } from "@features/categories";

const SEARCH_DEBOUNCE_MS = 350;

type ProductsFilterBarProps = {
  filters: ProductFilters;
  setFilters: (filters: Partial<ProductFilters>) => void;
};

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
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
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
    </div>
  );
};
