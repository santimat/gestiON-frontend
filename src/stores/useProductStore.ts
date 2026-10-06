import { productService } from "@/services/products/productService";
import type { Product } from "@/types";
import { create } from "zustand";

type UseProductStore = {
  products: Product[] | [];
  editingProduct: number | null;
  isEditing: boolean;
  startEditing: (productId: number) => void;
  endEditing: () => void;
  createProduct: (product: FormData) => Promise<void>;
  getProducts: () => Promise<void>;
};

export const useProductStore = create<UseProductStore>((set) => ({
  products: [],
  editingProduct: null,
  isEditing: false,
  startEditing: (productId: number) => {
    set(() => ({ editingProduct: productId, isEditing: true }));
  },
  endEditing: () => set(() => ({ editingProduct: null, isEditing: false })),
  createProduct: async (product: FormData) => {
    const newProduct = await productService.createProduct(product);
    set((prevState) => ({
      products: [...prevState.products, newProduct],
    }));
  },
  getProducts: async () => {
    const products = await productService.getProducts();
    set(() => ({ products }));
  },
}));
