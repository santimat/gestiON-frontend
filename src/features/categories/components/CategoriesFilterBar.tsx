import { Select } from "@mantine/core";

import type { Category, CategoryFilters } from "@features/categories/types";

type CategoriesFilterBarProps = {
  filters: CategoryFilters;
  setFilters: (filters: Partial<CategoryFilters>) => void;
  categories: Category[];
};

export const CategoriesFilterBar = ({
  filters,
  setFilters,
  categories,
}: CategoriesFilterBarProps) => {
  const categoryOptions = categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  return (
    <div className="grid gap-2 sm:max-w-xs">
      <Select
        aria-label="Filtrar por categoría"
        placeholder="Todas las categorías"
        clearable
        searchable
        nothingFoundMessage="No se encontraron categorías"
        value={filters.categoryId ? String(filters.categoryId) : null}
        data={categoryOptions}
        onChange={(value) =>
          setFilters({ categoryId: value ? Number(value) : undefined })
        }
      />
    </div>
  );
};
