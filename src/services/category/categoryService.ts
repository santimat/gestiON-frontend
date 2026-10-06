import { isAxiosError } from "axios";

import type { CategoryDTO } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { CategorySchema } from "@/schemas/category/CategorySchema";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const categoryService = {
  createCategory: async (category: CategoryDTO) => {
    const parsedData = CategorySchema.safeParse(category);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/categories", parsedData.data);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
  getCategories: async () => {
    try {
      const { data } = await backendAPI.get("/categories");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
};
