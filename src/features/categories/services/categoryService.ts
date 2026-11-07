import { executeApiCall } from "@shared/utils/apiClient";
import { backendAPI } from "@shared/services/axiosConfig";
import { parseOrThrow } from "@shared/utils/parseOrThrow";
import type { CategoryRequest } from "@features/categories/types";
import { CategorySchema } from "@features/categories/schemas/CategorySchema";

export const categoryService = {
  createCategory: async (category: CategoryRequest) => {
    const parsedData = parseOrThrow(CategorySchema, category);
    return executeApiCall(() => backendAPI.post("/categories", parsedData));
  },

  updateCategory: async (categoryId: number, category: CategoryRequest) => {
    const parsedData = parseOrThrow(CategorySchema, category);
    return executeApiCall(() =>
      backendAPI.put(`/categories/${categoryId}`, parsedData),
    );
  },

  toggleCategoryActive: async (categoryId: number) => {
    return executeApiCall(() =>
      backendAPI.patch(`/categories/${categoryId}/toggle-active`),
    );
  },

  getCategories: async () => {
    return executeApiCall(() => backendAPI.get("/categories"));
  },
};
