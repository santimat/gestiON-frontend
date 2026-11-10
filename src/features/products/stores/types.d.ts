import type {
  LowStockProduct,
  Product,
  ProductFilters,
  ProductWithOffer,
} from "@features/products/types";

export type UseProductStore = {
  formProduct: Product | null;
  isFormModalOpen: boolean;
  openEdit: (product: Product) => void;
  openCreate: () => void;
  closeFormModal: () => void;
  products: Product[];
  totalProducts: number;
  totalPages: number;
  // filtros de la última búsqueda: al crear refrescamos con los mismos
  lastFilters: ProductFilters;
  isLoading: boolean;
  error: string | null;
  createProduct: (product: FormData) => Promise<void>;
  getProducts: (filters?: ProductFilters) => Promise<void>;
  updateProduct: (productId: number, product: FormData) => Promise<void>;
  toggleActive: (productId: number) => Promise<void>;
};

export type UseProductWithOfferStore = {
  products: ProductWithOffer[];
  totalProducts: number;
  isLoading: boolean;
  error: string | null;
  getProductsWithOffer: (filters?: ProductFilters) => Promise<void>;
};

export type UseProductStatsStore = {
  lowStockProducts: LowStockProduct[];
  isLoading: boolean;
  error: string | null;
  getLowStockProducts: () => Promise<void>;
};
