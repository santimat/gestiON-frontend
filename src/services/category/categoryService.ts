import { isAxiosError } from "axios";

import type { CategoryDTO } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
import { createAxiosErrorHandler } from "@/utils/handleAxiosError";
import { CategorySchema } from "@/schemas/category/CategorySchema";
import { handleZodParsingError } from "@/utils/handleZodParseError";

const handleAxiosErrors = createAxiosErrorHandler({
  409: {
    type: "DUPLICATE_RESOURCE",
    message: "La categoría que intentas crear ya existe.",
  },
  404: {
    type: "NOT_FOUND",
    message: "La categoría no fue encontrada.",
  },
});

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
