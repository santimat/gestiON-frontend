import type { CategoryRequest } from "@/types";
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
    updateCategory,
    openCreate,
    openEdit,
    closeFormModal,
    toggleCategoryActive,
  } = useCategoryStore(
    useShallow((s) => ({
      categories: s.categories,
      formCategory: s.formCategory,
      isFormModalOpen: s.isFormModalOpen,
      isLoading: s.isLoading,
      error: s.error,
      getCategories: s.getCategories,
      createCategory: s.createCategory,
      updateCategory: s.updateCategory,
      openCreate: s.openCreate,
      openEdit: s.openEdit,
      closeFormModal: s.closeFormModal,
      toggleCategoryActive: s.toggleCategoryActive,
    })),
  );

  // al crear refrescamos la lista para respetar el orden que devuelve el backend
  const handleCreateCategory = async (category: CategoryRequest) => {
    const newCategory = await createCategory(category);
    await getCategories();
    return newCategory;
  };

  return {
    categories,
    formCategory,
    isFormModalOpen,
    isLoading,
    error,
    getCategories,
    handleCreateCategory,
    updateCategory,
    openCreate,
    openEdit,
    closeFormModal,
    toggleCategoryActive,
  };
};
