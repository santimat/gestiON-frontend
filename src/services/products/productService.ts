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
      const { data } = await backendAPI.post("/products", product);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
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
