import { isAxiosError } from "axios";

import { ProductSchema } from "@/schemas";
import { backendAPI } from "@/services/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";
import type { ProductFilters } from "@/types";

export const productService = {
  createProduct: async (product: FormData) => {
    const productToParse = Object.fromEntries(product.entries());
    const parsedData = ProductSchema.safeParse(productToParse);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/products", product);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },

  updateProduct: async (productId: number, product: FormData) => {
    const productToParse = Object.fromEntries(product.entries());
    const parsedData = ProductSchema.safeParse(productToParse);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.put(`/products/${productId}`, product);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },

  toggleActive: async (productId: number) => {
    try {
      const { data } = await backendAPI.patch(
        `/products/${productId}/toggle-active`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },

  getProducts: async (filters?: ProductFilters) => {
    try {
      const { data } = await backendAPI.get("/products", { params: filters });
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
