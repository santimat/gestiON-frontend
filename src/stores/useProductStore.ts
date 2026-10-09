import { productService } from "@/services/products/productService";
import type { Product } from "@/types";
import { create } from "zustand";

type UseProductStore = {
  products: Product[];
  totalProducts: number;
  isLoading: boolean;
  createProduct: (product: FormData) => Promise<void>;
  getProducts: () => Promise<void>;
};

export const useProductStore = create<UseProductStore>((set) => ({
  products: [],
  totalProducts: 0,
  isLoading: false,
  createProduct: async (product: FormData) => {
    const newProduct = await productService.createProduct(product);
    set((prevState) => ({
      products: [...prevState.products, newProduct],
    }));
  },
  getProducts: async () => {
    set({ isLoading: true });
    try {
      const data = await productService.getProducts();
      set(() => ({
        products: data?.content,
        totalProducts: data?.page.totalElements,
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },
}));
