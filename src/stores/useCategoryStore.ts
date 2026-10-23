import { create } from "zustand";

import type { AppError, Category, CategoryRequest } from "@/types";
import { categoryService } from "@/services/category/categoryService";

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
    const newCategory = await categoryService.createCategory(category);
    set((prevState) => ({
      categories: [...prevState.categories, newCategory],
    }));
    return newCategory;
  },
}));
