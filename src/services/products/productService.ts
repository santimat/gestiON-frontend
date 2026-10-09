import { isAxiosError } from "axios";

import { backendAPI } from "@/services/axios/axiosConfig";
import { createAxiosErrorHandler } from "@/utils/handleAxiosError";
import { ProductSchema } from "@/schemas/product/ProductSchema";
import { handleZodParsingError } from "@/utils/handleZodParseError";
import type { PageableSpringBootResponse } from "@/types";

const handleAxiosErrors = createAxiosErrorHandler({
  409: {
    type: "DUPLICATE_RESOURCE",
    message: "El producto que intentas crear ya existe.",
  },
  404: {
    type: "NOT_FOUND",
    message: "El producto no fue encontrado.",
  },
});

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
      const { data } = (await backendAPI.get("/products")) as {
        data: PageableSpringBootResponse;
      };
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
};
