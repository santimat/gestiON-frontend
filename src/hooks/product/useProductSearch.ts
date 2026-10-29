import { toast } from "sonner";
import { useEffect, useRef } from "react";

import { useFilters } from "@/hooks/useFilters";
import { ProductFiltersSchema } from "@/schemas";
import type { AppError, CartLine } from "@/types";
import { useProduct } from "@/hooks/product/useProduct";

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
