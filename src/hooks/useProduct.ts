import { useProductStore } from "@/stores/useProductStore";
import { useShallow } from "zustand/shallow";

export const useProduct = () => {
  const { products, totalProducts, isLoading, createProduct, getProducts } =
    useProductStore(
      useShallow((s) => ({
        products: s.products,
        totalProducts: s.totalProducts,
        isLoading: s.isLoading,
        createProduct: s.createProduct,
        getProducts: s.getProducts,
      })),
    );

  return { isLoading, products, totalProducts, createProduct, getProducts };
};
