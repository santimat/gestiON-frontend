import { useCategoryStore } from "@/stores/useCategoryStore";
import { useShallow } from "zustand/shallow";

export const useCategory = () => {
  const { categories, getCategories, createCategory } = useCategoryStore(
    useShallow((s) => ({
      categories: s.categories,
      getCategories: s.getCategories,
      createCategory: s.createCategory,
    })),
  );

  return {
    categories,
    getCategories,
    createCategory,
  };
};
