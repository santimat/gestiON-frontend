import { useEffect } from "react";

import { SalesFilterSchema } from "@features/sales/schemas/SalesFilterSchema";
import { useFilters } from "@shared/hooks/useFilters";
import { toastAppError } from "@shared/utils/toastAppError";
import { useSales } from "@features/sales/hooks/useSales";

// la paginación no cuenta como "filtro aplicado": solo cambia cómo se muestran los resultados
const PAGINATION_FILTER_KEYS = ["page", "size"];

export const useSalesSearch = () => {
  const { filters, setFilters } = useFilters(SalesFilterSchema);
  const { getSales } = useSales();

  const isFiltered = Object.entries(filters).some(
    ([key, value]) =>
      !PAGINATION_FILTER_KEYS.includes(key) &&
      value !== undefined &&
      value !== "",
  );

  useEffect(() => {
    getSales(filters).catch((error) => {
      toastAppError(error, "No se pudieron cargar las ventas.");
    });
  }, [getSales, filters]);

  return { filters, setFilters, isFiltered };
};
