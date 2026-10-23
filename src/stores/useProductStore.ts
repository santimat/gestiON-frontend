import { create } from "zustand";

import type { AppError, Product } from "@/types";
import { productService } from "@/services/products/productService";

type UseProductStore = {
  // Estado de UI: modal de alta/edición de producto
  formProduct: Product | null;
  isFormModalOpen: boolean;
  openEdit: (product: Product) => void;
  openCreate: () => void;
  closeFormModal: () => void;

  products: Product[];
  totalProducts: number;
  isLoading: boolean;
  error: string | null;
  isPendingToggleActive: boolean;
  createProduct: (product: FormData) => Promise<void>;
  getProducts: () => Promise<void>;
  updateProduct: (productId: number, product: FormData) => Promise<void>;
  toggleActive: (productId: number) => Promise<void>;
};

export const useProductStore = create<UseProductStore>((set) => ({
  formProduct: null,
  isFormModalOpen: false,
  openEdit: (product) =>
    set(() => ({ formProduct: product, isFormModalOpen: true })),
  openCreate: () => set(() => ({ formProduct: null, isFormModalOpen: true })),
  closeFormModal: () =>
    set(() => ({ formProduct: null, isFormModalOpen: false })),

  products: [],
  totalProducts: 0,
  isLoading: false,
  error: null,
  isPendingToggleActive: false,
  createProduct: async (product: FormData) => {
    const newProduct = await productService.createProduct(product);
    set((prevState) => ({
      products: [...prevState.products, newProduct],
    }));
  },
  updateProduct: async (productId: number, product: FormData) => {
    const updatedProduct = await productService.updateProduct(
      productId,
      product,
    );
    set((prevState) => ({
      products: prevState.products.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product,
      ),
    }));
  },
  toggleActive: async (productId: number) => {
    set({ isPendingToggleActive: true });
    try {
      const newStatus = await productService.toggleActive(productId);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product.id === newStatus.id ? { ...product, ...newStatus } : product,
        ),
        isPendingToggleActive: false,
      }));
    } catch (error) {
      set({ isPendingToggleActive: false });
      throw error;
    }
  },
  getProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await productService.getProducts();
      set(() => ({
        products: data?.content,
        totalProducts: data?.page.totalElements,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const appError = error as AppError;
      set({ isLoading: false, error: appError.message });
      throw error;
    }
  },
}));
