import type { Product, ProductFilters } from "@features/products/types";

export type UseProductStore = {
  formProduct: Product | null;
  isFormModalOpen: boolean;
  openEdit: (product: Product) => void;
  openCreate: () => void;
  closeFormModal: () => void;
  products: Product[];
  totalProducts: number;
  isLoading: boolean;
  error: string | null;
  createProduct: (product: FormData) => Promise<void>;
  getProducts: (filters?: ProductFilters) => Promise<void>;
  updateProduct: (productId: number, product: FormData) => Promise<void>;
  toggleActive: (productId: number) => Promise<void>;
};
