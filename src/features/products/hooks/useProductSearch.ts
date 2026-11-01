import { toast } from "sonner";
import { useEffect, useRef } from "react";

import { useFilters } from "@shared/hooks/useFilters";
import { ProductFiltersSchema } from "../schemas/ProductFiltersSchema";
import type { AppError } from "@shared/types";
import type { CartLine } from "@features/sales";
import { useProduct } from "./useProduct";

export const useProductSearch = (cart: CartLine[]) => {
  const { filters, setFilters } = useFilters(ProductFiltersSchema);
  const { getProducts } = useProduct();
  const prevCartCountRef = useRef(cart.length);

  useEffect(() => {
    getProducts(filters).catch((error) => {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudieron cargar los productos.");
    });
  }, [getProducts, filters]);

  // para detectar cuándo el carrito se vacía y refrescar el stock
  useEffect(() => {
    if (prevCartCountRef.current > 0 && cart.length === 0) {
      getProducts(filters).catch((error) => {
        const appError = error as AppError;
        toast.error(
          appError?.message ?? "No se pudieron cargar los productos.",
        );
      });
    }
    prevCartCountRef.current = cart.length;
  }, [cart.length, getProducts, filters]);

  return {
    filters,
    setFilters,
  };
};
