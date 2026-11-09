import { ProductSchema } from "@features/products/schemas/ProductSchema";
import type { ProductFilters } from "@features/products/types";
import { backendAPI } from "@shared/services/axiosConfig";
import { executeApiCall } from "@shared/utils/apiClient";
import { parseOrThrow } from "@shared/utils/parseOrThrow";

export const productService = {
  createProduct: async (product: FormData) => {
    const productToParse = Object.fromEntries(product.entries());
    parseOrThrow(ProductSchema, productToParse);

    return executeApiCall(() => backendAPI.post("/products", product));
  },

  updateProduct: async (productId: number, product: FormData) => {
    const productToParse = Object.fromEntries(product.entries());
    parseOrThrow(ProductSchema, productToParse);

    return executeApiCall(() =>
      backendAPI.put(`/products/${productId}`, product),
    );
  },

  toggleActive: async (productId: number) => {
    return executeApiCall(() =>
      backendAPI.patch(`/products/${productId}/toggle-active`),
    );
  },

  getProducts: async (filters?: ProductFilters) => {
    return executeApiCall(() =>
      backendAPI.get("/products", { params: filters }),
    );
  },

  getProductsWithOffer: async (filters?: ProductFilters) => {
    return executeApiCall(() =>
      backendAPI.get("/products/with-offer", { params: filters }),
    );
  },
};
