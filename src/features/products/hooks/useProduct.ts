import { useProductStore } from "@features/products/stores/useProductStore";
import { useShallow } from "zustand/shallow";

export const useProduct = () => {
  const {
    products,
    totalProducts,
    totalPages,
    isLoading,
    error,
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
      totalPages: s.totalPages,
      isLoading: s.isLoading,
      error: s.error,
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
    totalProducts,
    totalPages,
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

/**
 * Acciones estables para las filas de la lista: el producto llega por props y
 * acá solo se suscribe a las acciones, así que el toggle no re-renderiza
 * todas las filas — solo la fila cuyo producto cambió.
 */
export const useProductItem = () => {
  const { toggleActive, openEdit } = useProductStore(
    useShallow((s) => ({
      toggleActive: s.toggleActive,
      openEdit: s.openEdit,
    })),
  );

  return { toggleActive, openEdit };
};
