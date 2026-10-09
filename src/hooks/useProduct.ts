import { useProductStore } from "@/stores/useProductStore";
import { useShallow } from "zustand/shallow";

export const useProduct = () => {
  const { products, totalProducts, isLoading, createProduct, getProducts } =
    useProductStore(
      useShallow(
        ({
          products,
          totalProducts,
          isLoading,
          createProduct,
          getProducts,
        }) => ({
          products,
          totalProducts,
          isLoading,
          createProduct,
          getProducts,
        }),
      ),
    );

  return { isLoading, products, totalProducts, createProduct, getProducts };
};
