import { isAxiosError } from "axios";

import { CategorySchema } from "@/schemas";
import type { CategoryRequest } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const categoryService = {
  createCategory: async (category: CategoryRequest) => {
    const parsedData = CategorySchema.safeParse(category);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/categories", parsedData.data);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  updateCategory: async (categoryId: number, category: CategoryRequest) => {
    const parsedData = CategorySchema.safeParse(category);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.put(
        `/categories/${categoryId}`,
        parsedData.data,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  toggleCategoryActive: async (categoryId: number) => {
    try {
      const { data } = await backendAPI.patch(
        `/categories/${categoryId}/toggle`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  getCategories: async () => {
    try {
      const { data } = await backendAPI.get("/categories");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
