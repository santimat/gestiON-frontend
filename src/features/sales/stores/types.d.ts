import type { Client } from "@features/clients/types";
import type { ProductWithOffer } from "@features/products";
import type { SaleStatus } from "@features/sales/types";
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
  isLoading: boolean;
  error: string | null;
  getSales: (filters: SalesFilter) => Promise<void>;
  markSalePaid: (
    saleId: number,
  ) => Promise<{ id: number; status: SaleStatus }>;
};

export type UseSaleDetailsStore = {
  isLoading: boolean;
  error: string | null;
  isDetailModalOpen: boolean;
  openDetailModal: () => void;
  closeDetailModal: () => void;
  getSaleWithDetails: (saleId: number) => Promise<void>;
  saleWithDetails: Sale | null;
};

export type UsePendingSalesStore = {
  pendingSales: Sale[];
  pendingSalesCount: number;
  totalPending: number;
  isLoading: boolean;
  error: string | null;
  selectedPendingSale: Sale | null;
  isDetailModalOpen: boolean;
  pendingSalesClient: Client | null;
  setPendingSalesClient: (client: Client | null) => void;
  getPendingSalesWithDetailsByClient: (clientId: number) => Promise<void>;
  openDetailModal: (sale: Sale) => void;
  closeDetailModal: () => void;
};
