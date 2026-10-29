import type {
  CartLine,
  Product,
  Sale,
  SaleDraft,
  SaleRequest,
  SalesFilter,
} from "@/types";

export type UseSaleStore = {
  cart: CartLine[];
  saleDraft: SaleDraft;
  addToCart: (product: Product) => void;
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
  salesFilter: SalesFilter;
  setSalesFilter: (filter: Partial<SalesFilter>) => Promise<void>;
  getSales: () => Promise<void>;
};
