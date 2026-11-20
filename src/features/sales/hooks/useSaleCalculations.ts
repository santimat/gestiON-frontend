import { useMemo } from "react";
import type { DiscountType, PaymentMethod } from "@features/sales/types";
import type { CartLine } from "@features/sales/types";

type OfferPaymentMethod = {
  paymentMethod: PaymentMethod;
  discountType: DiscountType;
  value: string | number;
};

type SaleDraft = {
  discount: number;
  discountType: DiscountType;
  paymentMethod: PaymentMethod;
  clientId: number | null;
};

type UseSaleCalculationsInput = {
  cart: CartLine[];
  saleDraft: SaleDraft;
  offerPaymentMethods: OfferPaymentMethod[];
};

export type UseSaleCalculationsOutput = {
  subtotal: number;
  discountValue: number;
  total: number;
  hasPaymentOffer: boolean;
  selectedPaymentOffer: OfferPaymentMethod | undefined;
  clientId: number | null;
  paymentMethod: PaymentMethod;
  discount: number;
  discountType: DiscountType;
};

export const useSaleCalculations = ({
  cart,
  saleDraft,
  offerPaymentMethods,
}: UseSaleCalculationsInput): UseSaleCalculationsOutput => {
  const { discount, discountType, paymentMethod, clientId } = saleDraft;

  const selectedPaymentOffer = useMemo(
    () =>
      offerPaymentMethods.find(
        (offer) => offer.paymentMethod === paymentMethod,
      ),
    [offerPaymentMethods, paymentMethod],
  );

  const hasPaymentOffer = selectedPaymentOffer !== undefined;

  const subtotal = useMemo(
    () => cart.reduce((acc, line) => acc + line.salePrice * line.qty, 0),
    [cart],
  );

  const manualDiscountValue = useMemo(() => {
    if (discountType === "PERCENTAGE") {
      return Math.round((subtotal * Math.min(discount, 100)) / 100);
    }
    return Math.min(discount, subtotal);
  }, [discountType, discount, subtotal]);

  const paymentOfferValue = useMemo(() => {
    if (!selectedPaymentOffer) return 0;
    const value = Number(selectedPaymentOffer.value);
    if (selectedPaymentOffer.discountType === "PERCENTAGE") {
      return Math.round((subtotal * Math.min(value, 100)) / 100);
    }
    return Math.min(value, subtotal);
  }, [selectedPaymentOffer, subtotal]);

  const discountValue = hasPaymentOffer
    ? paymentOfferValue
    : manualDiscountValue;
  const total = Math.max(0, subtotal - discountValue);

  return {
    subtotal,
    discountValue,
    total,
    hasPaymentOffer,
    selectedPaymentOffer,
    clientId,
    paymentMethod,
    discount,
    discountType,
  };
};
