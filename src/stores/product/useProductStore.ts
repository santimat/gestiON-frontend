import { create } from "zustand";

import type { AppError } from "@/types";
import { productService } from "@/services/productService";
import type { UseProductStore } from "@/stores/product/types";

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
    await productService.createProduct(product);
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
  getProducts: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const data = await productService.getProducts(filters);
      set(() => ({
        products: data?.content,
        totalProducts: data?.page.totalElements,
        error: null,
      }));
    } catch (error) {
      const appError = error as AppError;
      set({ error: appError.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
