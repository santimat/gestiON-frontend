import { useEffect, useRef } from "react";

import type { CartLine } from "@features/sales";
import { useFilters } from "@shared/hooks/useFilters";
import { toastAppError } from "@shared/utils/toastAppError";
import { useProductWithOffer } from "@features/products/hooks/useProductWithOffer";
import { ProductFiltersSchema } from "@features/products/schemas/ProductFiltersSchema";

export const useProductWithOfferSearch = (cart: CartLine[]) => {
  const { filters, setFilters } = useFilters(ProductFiltersSchema);
  const { getProductsWithOffer } = useProductWithOffer();
  const prevCartCountRef = useRef(cart.length);

  useEffect(() => {
    getProductsWithOffer({ ...filters, active: true }).catch((error) => {
      toastAppError(error, "No se pudieron cargar los productos.");
    });
  }, [getProductsWithOffer, filters]);

  useEffect(() => {
    if (prevCartCountRef.current > 0 && cart.length === 0) {
      getProductsWithOffer(filters).catch((error) => {
        toastAppError(error, "No se pudieron cargar los productos.");
      });
    }
    prevCartCountRef.current = cart.length;
  }, [cart.length, getProductsWithOffer, filters]);

  return {
    filters,
    setFilters,
  };
};
