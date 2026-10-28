import type { CartLine, Product, Sale, SaleDraft, SaleRequest } from "@/types";

export type UseSaleStore = {
  cart: CartLine[];
  addToCart: (product: Product) => void;
  setQty: (productId: number, qty: number) => void;
  removeLine: (productId: number) => void;
  clearCart: () => void;
  // datos del resumen que acompañan la venta a confirmar
  saleDraft: SaleDraft;
  setSaleDraft: (draft: Partial<SaleDraft>) => void;
  createSale: (sale: SaleRequest) => Promise<Sale>;
  resetSale: () => void;
};
