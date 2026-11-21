import type { ProductWithOffer } from "@features/products";
import type {
  CartLine,
  Sale,
  SaleDraft,
  SaleRequest,
  SalesFilter,
} from "@features/sales/stores/types";

export type UseSaleStore = {
  cart: CartLine[];
  saleDraft: SaleDraft;
  addToCart: (product: ProductWithOffer) => void;
  setQty: (productId: number, qty: number) => void;
  removeLine: (productId: number) => void;
  clearCart: () => void;
  setSaleDraft: (draft: Partial<SaleDraft>) => void;
  createSale: (sale: SaleRequest) => Promise<Sale>;
  resetSale: () => void;
};

export type UseSalesStore = {
  sales: SaleSummary[];
  totalSales: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  getSales: (filters: SalesFilter) => Promise<void>;
};

export type UseSaleDetailsStore = {
  isLoading: boolean;
  error: string | null;
  isDetailModalOpen: boolean;
  isRegisteringPayment: boolean;
  openDetailModal: () => void;
  closeDetailModal: () => void;
  getSaleWithDetails: (saleId: number) => Promise<void>;
  registerPayment: (saleId: number, amount: number) => Promise<TransactionResponse>;
  saleWithDetails: Sale | null;
};

export type UsePendingSalesStore = {
  pendingSales: Sale[];
  pendingSalesCount: number;
  totalPending: number;
  isLoading: boolean;
  error: string | null;
  currentClientId: number | null;
  getPendingSalesWithDetailsByClient: (clientId: number) => Promise<void>;
  registerPayment: (saleId: number, amount: number) => Promise<TransactionResponse>;
};
