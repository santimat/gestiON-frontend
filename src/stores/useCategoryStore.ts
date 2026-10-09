import { create } from "zustand";

import type { Category, CategoryRequest } from "@/types";
import { categoryService } from "@/services/category/categoryService";

type CategoryStore = {
  categories: Category[];
  getCategories: () => Promise<void>;
  createCategory: (category: Category) => Promise<void>;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  getCategories: async () => {
    const { content: categories } = await categoryService.getCategories();
    set({ categories });
  },
  createCategory: async (category: CategoryRequest) => {
    const newCategory = await categoryService.createCategory(category);
    set((prevState) => ({
      categories: [...prevState.categories, newCategory],
    }));
  },
}));
