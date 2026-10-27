import { create } from "zustand";

import type { AppError, Category, CategoryRequest } from "@/types";
import { categoryService } from "@/services/categoryService";

type CategoryStore = {
  formCategory: Category | null;
  isFormModalOpen: boolean;
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  openCreate: () => void;
  openEdit: (category: Category) => void;
  closeFormModal: () => void;
  getCategories: () => Promise<void>;
  createCategory: (category: CategoryRequest) => Promise<Category>;
  updateCategory: (
    categoryId: number,
    category: CategoryRequest,
  ) => Promise<Category>;
  toggleCategoryActive: (categoryId: number) => Promise<void>;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  formCategory: null,
  isFormModalOpen: false,
  categories: [],
  isLoading: false,
  error: null,
  openCreate: () => set({ formCategory: null, isFormModalOpen: true }),
  openEdit: (category: Category) =>
    set({ formCategory: category, isFormModalOpen: true }),
  closeFormModal: () => set({ formCategory: null, isFormModalOpen: false }),

  getCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const { content: categories } = await categoryService.getCategories();
      set({ categories });
    } catch (error) {
      const appError = error as AppError;
      set({ error: appError.message });
    } finally {
      set({ isLoading: false });
    }
  },

  createCategory: async (category: CategoryRequest) => {
    return categoryService.createCategory(category);
  },

  updateCategory: async (categoryId: number, category: CategoryRequest) => {
    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      category,
    );
    set((prevState) => ({
      categories: prevState.categories.map((cat) =>
        cat.id === updatedCategory.id ? { ...cat, ...updatedCategory } : cat,
      ),
    }));
    return updatedCategory;
  },

  toggleCategoryActive: async (categoryId: number) => {
    const updatedCategory =
      await categoryService.toggleCategoryActive(categoryId);
    set((prevState) => ({
      categories: prevState.categories.map((category) =>
        category.id === updatedCategory?.id
          ? { active: updatedCategory?.active, ...category }
          : category,
      ),
    }));
  },
}));
