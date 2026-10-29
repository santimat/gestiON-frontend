import { toast } from "sonner";
import { useEffect } from "react";

import type { AppError } from "@/types";
import { SalesFilterSchema } from "@/schemas";
import { useFilters } from "@/hooks/useFilters";
import { useSales } from "@/hooks/sales/useSales";

export const useSalesSearch = () => {
  const { filters, setFilters } = useFilters(SalesFilterSchema);
  const { getSales } = useSales();

  const isFiltered = Object.values(filters).some(
    (value) => value !== undefined && value !== "",
  );

  useEffect(() => {
    getSales(filters).catch((error) => {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudieron cargar las ventas.");
    });
  }, [getSales, filters]);

  return { filters, setFilters, isFiltered };
};
