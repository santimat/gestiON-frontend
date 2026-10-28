import { create } from "zustand";

import { saleService } from "@/services/saleService";
import type { SaleDraft, SaleRequest } from "@/types";
import type { UseSaleStore } from "@/stores/sale/types";

const DEFAULT_SALE_DRAFT: SaleDraft = {
  discount: 0,
  discountType: "FIXED_AMOUNT",
  paymentMethod: "CASH",
  // consumidor final
  clientId: null,
};

export const useSaleStore = create<UseSaleStore>((set) => ({
  cart: [],
  saleDraft: DEFAULT_SALE_DRAFT,

  // guardamos un snapshot de la línea: el refetch del buscador no muta el carrito
  addToCart: (product) =>
    set((prevState) => {
      if (product.currentStock === 0) return prevState;

      const existingLine = prevState.cart.find(
        (line) => line.productId === product.id,
      );
      if (existingLine) {
        // cap: nunca superamos el stock disponible
        const qty = Math.min(existingLine.qty + 1, product.currentStock);
        if (qty === existingLine.qty) return prevState;
        return {
          cart: prevState.cart.map((line) =>
            line.productId === product.id ? { ...line, qty } : line,
          ),
        };
      }

      return {
        cart: [
          ...prevState.cart,
          {
            productId: product.id,
            name: product.name,
            salePrice: product.salePrice,
            currentStock: product.currentStock,
            qty: 1,
          },
        ],
      };
    }),

  setQty: (productId, qty) =>
    set((prevState) => {
      if (qty <= 0) {
        // el botón menos puede vaciar la línea por completo
        return {
          cart: prevState.cart.filter((line) => line.productId !== productId),
        };
      }
      return {
        cart: prevState.cart.map((line) =>
          line.productId === productId
            ? // cap en el stock del snapshot
              { ...line, qty: Math.min(qty, line.currentStock) }
            : line,
        ),
      };
    }),

  removeLine: (productId) =>
    set((prevState) => ({
      cart: prevState.cart.filter((line) => line.productId !== productId),
    })),

  clearCart: () => set({ cart: [] }),

  setSaleDraft: (draft) =>
    set((prevState) => ({
      saleDraft: { ...prevState.saleDraft, ...draft },
    })),

  createSale: async (sale: SaleRequest) => {
    return saleService.createSale(sale);
  },

  resetSale: () =>
    set({
      cart: [],
      saleDraft: DEFAULT_SALE_DRAFT,
    }),
}));
