import { useEffect, useRef } from "react";

import { useFilters } from "@shared/hooks/useFilters";
import { ProductFiltersSchema } from "@features/products/schemas/ProductFiltersSchema";
import { toastAppError } from "@shared/utils/toastAppError";
import type { CartLine } from "@features/sales";
import { useProduct } from "@features/products/hooks/useProduct";

export const useProductSearch = (cart: CartLine[]) => {
  const { filters, setFilters } = useFilters(ProductFiltersSchema);
  const { getProducts } = useProduct();
  const prevCartCountRef = useRef(cart.length);

  useEffect(() => {
    getProducts({ ...filters, active: true }).catch((error) => {
      toastAppError(error, "No se pudieron cargar los productos.");
    });
  }, [getProducts, filters]);

  // para detectar cuándo el carrito se vacía y refrescar el stock
  useEffect(() => {
    if (prevCartCountRef.current > 0 && cart.length === 0) {
      getProducts(filters).catch((error) => {
        toastAppError(error, "No se pudieron cargar los productos.");
      });
    }
    prevCartCountRef.current = cart.length;
  }, [cart.length, getProducts, filters]);

  return {
    filters,
    setFilters,
  };
};
