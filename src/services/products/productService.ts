import { isAxiosError } from "axios";

import { ProductSchema } from "@/schemas";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const productService = {
  createProduct: async (product: FormData) => {
    const productToParse = Object.fromEntries(product.entries());
    const parsedData = ProductSchema.safeParse(productToParse);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/products", parsedData.data);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
  getProducts: async () => {
    try {
      const { data } = await backendAPI.get("/products");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
};
