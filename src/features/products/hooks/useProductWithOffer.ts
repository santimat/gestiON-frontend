import { useShallow } from "zustand/shallow";

import { useProductWithOfferStore } from "@features/products/stores/useProductWithOfferStore";

export const useProductWithOffer = () => {
  const { products, totalProducts, isLoading, error, getProductsWithOffer } =
    useProductWithOfferStore(
      useShallow((s) => ({
        products: s.products,
        totalProducts: s.totalProducts,
        isLoading: s.isLoading,
        error: s.error,
        getProductsWithOffer: s.getProductsWithOffer,
      })),
    );

  return {
    products,
    totalProducts,
    isLoading,
    error,
    getProductsWithOffer,
  };
};
