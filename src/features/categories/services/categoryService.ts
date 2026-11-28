import { executeApiCall } from "@shared/utils/apiClient";
import { backendAPI } from "@shared/services/axiosConfig";
import { parseOrThrow } from "@shared/utils/parseOrThrow";
import { toPageParams } from "@shared/utils/pagination";
import type {
  CategoryRequest,
  CategorySearchParams,
} from "@features/categories/types";
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

  // sin parámetros mantiene el comportamiento de siempre (paginado por defecto
  // del backend) para no alterar la página de Categorías
  getCategories: async (params?: CategorySearchParams) => {
    const categoryName = params?.categoryName?.trim();
    return executeApiCall(() =>
      backendAPI.get(
        "/categories",
        params
          ? {
              params: toPageParams({
                ...params,
                categoryName: categoryName || undefined,
              }),
            }
          : undefined,
      ),
    );
  },
};
