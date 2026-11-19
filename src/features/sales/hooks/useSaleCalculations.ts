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

type PAYMENT_OPTION = {
  value: PaymentMethod;
  label: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

const PAYMENT_OPTIONS: PAYMENT_OPTION[] = [
  { value: "CASH", label: "Efectivo", Icon: () => null },
  { value: "CARD", label: "Tarjeta", Icon: () => null },
  { value: "TRANSFER", label: "Transferencia", Icon: () => null },
  { value: "CREDIT_ACCOUNT", label: "Cuenta corriente", Icon: () => null },
];

export type UseSaleCalculationsOutput = {
  subtotal: number;
  discountValue: number;
  total: number;
  hasPaymentOffer: boolean;
  selectedPaymentOffer: OfferPaymentMethod | undefined;
  SelectedIcon: React.ComponentType<{ size?: number; strokeWidth?: number }> | undefined;
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
    () => offerPaymentMethods.find((offer) => offer.paymentMethod === paymentMethod),
    [offerPaymentMethods, paymentMethod],
  );

  const hasPaymentOffer = selectedPaymentOffer !== undefined;

  const SelectedIcon = useMemo(
    () => PAYMENT_OPTIONS.find((option) => option.value === paymentMethod)?.Icon,
    [paymentMethod],
  );

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

  const discountValue = hasPaymentOffer ? paymentOfferValue : manualDiscountValue;
  const total = Math.max(0, subtotal - discountValue);

  return {
    subtotal,
    discountValue,
    total,
    hasPaymentOffer,
    selectedPaymentOffer,
    SelectedIcon,
    clientId,
    paymentMethod,
    discount,
    discountType,
  };
};