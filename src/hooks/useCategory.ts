import { useCategoryStore } from "@/stores/useCategoryStore";
import { useShallow } from "zustand/shallow";

export const useCategory = () => {
  const {
    categories,
    formCategory,
    isFormModalOpen,
    error,
    isLoading,
    getCategories,
    createCategory,
    openCreate,
    openEdit,
    closeFormModal,
  } = useCategoryStore(
    useShallow((s) => ({
      categories: s.categories,
      formCategory: s.formCategory,
      isFormModalOpen: s.isFormModalOpen,
      isLoading: s.isLoading,
      error: s.error,
      getCategories: s.getCategories,
      createCategory: s.createCategory,
      openCreate: s.openCreate,
      openEdit: s.openEdit,
      closeFormModal: s.closeFormModal,
    })),
  );

  return {
    categories,
    formCategory,
    isFormModalOpen,
    isLoading,
    error,
    getCategories,
    createCategory,
    openCreate,
    openEdit,
    closeFormModal,
  };
};
