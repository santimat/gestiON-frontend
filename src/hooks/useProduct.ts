import { useProductStore } from "@/stores/product/useProductStore";
import { useShallow } from "zustand/shallow";

export const useProduct = () => {
  const {
    products,
    totalProducts,
    isLoading,
    error,
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
      error: s.error,
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

  // al crear refrescamos la lista para respetar el orden y el total que devuelve el backend
  const handleCreateProduct = async (product: FormData) => {
    await createProduct(product);
    await getProducts();
  };

  return {
    isLoading,
    error,
    products,
    isPendingToggleActive,
    totalProducts,
    formProduct,
    isFormModalOpen,
    handleCreateProduct,
    updateProduct,
    getProducts,
    toggleActive,
    openEdit,
    openCreate,
    closeFormModal,
  };
};
