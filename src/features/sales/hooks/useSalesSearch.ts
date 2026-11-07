import { useEffect } from "react";

import { SalesFilterSchema } from "@features/sales/schemas/SalesFilterSchema";
import { useFilters } from "@shared/hooks/useFilters";
import { toastAppError } from "@shared/utils/toastAppError";
import { useSales } from "@features/sales/hooks/useSales";

export const useSalesSearch = () => {
  const { filters, setFilters } = useFilters(SalesFilterSchema);
  const { getSales } = useSales();

  const isFiltered = Object.values(filters).some(
    (value) => value !== undefined && value !== "",
  );

  useEffect(() => {
    getSales(filters).catch((error) => {
      toastAppError(error, "No se pudieron cargar las ventas.");
    });
  }, [getSales, filters]);

  return { filters, setFilters, isFiltered };
};
