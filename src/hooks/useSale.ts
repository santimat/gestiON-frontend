import { useShallow } from "zustand/shallow";

import { useSaleStore } from "@/stores/sale/useSaleStore";

export const useSale = () => {
  const {
    cart,
    addToCart,
    setQty,
    removeLine,
    clearCart,
    saleDraft,
    setSaleDraft,
    createSale,
    resetSale,
  } = useSaleStore(
    useShallow((s) => ({
      cart: s.cart,
      addToCart: s.addToCart,
      setQty: s.setQty,
      removeLine: s.removeLine,
      clearCart: s.clearCart,
      saleDraft: s.saleDraft,
      setSaleDraft: s.setSaleDraft,
      createSale: s.createSale,
      resetSale: s.resetSale,
    })),
  );

  return {
    cart,
    addToCart,
    setQty,
    removeLine,
    clearCart,
    saleDraft,
    setSaleDraft,
    createSale,
    resetSale,
  };
};
