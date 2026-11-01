import type { Category, CategoryRequest } from "@/types";

export type UseCategoryStore = {
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
