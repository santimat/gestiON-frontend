import { useProductStore } from "@/stores/useProductStore";
import { useShallow } from "zustand/shallow";

export const useProduct = () => {
  const {
    products,
    totalProducts,
    isLoading,
    isPendingToggleActive,
    createProduct,
    getProducts,
    updateProduct,
    toggleActive,
  } = useProductStore(
    useShallow((s) => ({
      products: s.products,
      totalProducts: s.totalProducts,
      isLoading: s.isLoading,
      createProduct: s.createProduct,
      updateProduct: s.updateProduct,
      getProducts: s.getProducts,
      toggleActive: s.toggleActive,
      isPendingToggleActive: s.isPendingToggleActive,
    })),
  );

  return {
    isLoading,
    products,
    isPendingToggleActive,
    totalProducts,
    createProduct,
    updateProduct,
    getProducts,
    toggleActive,
  };
};
