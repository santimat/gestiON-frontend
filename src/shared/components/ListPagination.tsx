import { useEffect } from "react";
import { Pagination, Select } from "@mantine/core";
import { usePagination } from "@mantine/hooks";

import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@shared/utils/pagination";

type PaginationFilters = {
  page?: number;
  size?: number;
};

type ListPaginationProps = {
  // filtros de la URL: la página es 1-based (la que ve el usuario)
  filters: PaginationFilters;
  setFilters: (partial: PaginationFilters) => void;
  totalItems: number;
  totalPages: number;
  // nombre del recurso para el resumen: "ventas", "productos", "cajeros"...
  itemLabel?: string;
};

export const ListPagination = ({
  filters,
  setFilters,
  totalItems,
  totalPages,
  itemLabel = "elementos",
}: ListPaginationProps) => {
  const size = filters.size ?? DEFAULT_PAGE_SIZE;
  const page = Math.max(filters.page ?? 1, 1);
  // si la URL quedó fuera de rango, mostramos la última página válida mientras se corrige
  const activePage = totalPages > 0 ? Math.min(page, totalPages) : page;

  const { active, setPage } = usePagination({
    total: totalPages,
    page: activePage,
    siblings: 1,
    boundaries: 1,
    onChange: (nextPage) => setFilters({ page: nextPage }),
  });

  // página fuera de rango (URL editada a mano): volvemos a la última válida
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setFilters({ page: totalPages });
    }
  }, [page, totalPages, setFilters]);

  if (totalItems === 0) return null;

  const firstItem = Math.min((activePage - 1) * size + 1, totalItems);
  const lastItem = Math.min(activePage * size, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-secondary-foreground text-sm tabular-nums">
        Mostrando {firstItem}–{lastItem} de {totalItems} {itemLabel}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-secondary-foreground text-sm">Por página</span>
          <Select
            aria-label={`Elementos por página (${itemLabel})`}
            allowDeselect={false}
            data={PAGE_SIZE_OPTIONS.map(String)}
            value={String(size)}
            onChange={(value) => {
              if (!value) return;
              setFilters({ size: Number(value), page: 1 });
            }}
            w={80}
          />
        </div>

        <Pagination
          total={totalPages}
          value={active}
          onChange={setPage}
          hideWithOnePage
        />
      </div>
    </div>
  );
};
