import { useProductStore } from "@/stores/useProductStore";
import { useShallow } from "zustand/shallow";

export const useProduct = () => {
  const {
    products,
    totalProducts,
    isLoading,
    isPendingToggleActive,
    formProduct,
    isFormModalOpen,
    createProduct,
    getProducts,
    updateProduct,
    toggleActive,
    openEdit,
    openCreate,
    closeFormModal,
  } = useProductStore(
    useShallow((s) => ({
      products: s.products,
      totalProducts: s.totalProducts,
      isLoading: s.isLoading,
      isPendingToggleActive: s.isPendingToggleActive,
      formProduct: s.formProduct,
      isFormModalOpen: s.isFormModalOpen,
      createProduct: s.createProduct,
      updateProduct: s.updateProduct,
      getProducts: s.getProducts,
      toggleActive: s.toggleActive,
      openEdit: s.openEdit,
      openCreate: s.openCreate,
      closeFormModal: s.closeFormModal,
    })),
  );

  return {
    isLoading,
    products,
    isPendingToggleActive,
    totalProducts,
    formProduct,
    isFormModalOpen,
    createProduct,
    updateProduct,
    getProducts,
    toggleActive,
    openEdit,
    openCreate,
    closeFormModal,
  };
};
