import { Badge, Select } from "@mantine/core";
import {
  ArrowLeftRight,
  Banknote,
  BookUserIcon,
  CreditCard,
} from "lucide-react";
import type {
  DiscountType,
  PaymentMethod,
  SetSaleDraft,
} from "@features/sales";

type OfferPaymentMethod = {
  paymentMethod: PaymentMethod;
  discountType: DiscountType;
  value: string | number;
};

type PaymentMethodSelectorProps = {
  paymentMethod: PaymentMethod;
  clientId: number | null;
  hasPaymentOffer: boolean;
  selectedPaymentOffer: OfferPaymentMethod | undefined;
  offerPaymentMethods: OfferPaymentMethod[];
  onChange: SetSaleDraft;
};

const PAYMENT_OPTIONS = [
  { value: "CASH" as PaymentMethod, label: "Efectivo", Icon: Banknote },
  { value: "CARD" as PaymentMethod, label: "Tarjeta", Icon: CreditCard },
  {
    value: "TRANSFER" as PaymentMethod,
    label: "Transferencia",
    Icon: ArrowLeftRight,
  },
  {
    value: "CREDIT_ACCOUNT" as PaymentMethod,
    label: "Cuenta corriente",
    Icon: BookUserIcon,
  },
];

export const PaymentMethodSelector = ({
  paymentMethod,
  clientId,
  hasPaymentOffer,
  selectedPaymentOffer,
  offerPaymentMethods,
  onChange,
}: PaymentMethodSelectorProps) => {
  const SelectedIcon = PAYMENT_OPTIONS.find(
    (option) => option.value === paymentMethod,
  )?.Icon;

  return (
    <div className="mt-4 space-y-2">
      <Select
        label="Método de pago"
        data={PAYMENT_OPTIONS.map(({ value, label }) => ({
          value,
          label,
          disabled: value === "CREDIT_ACCOUNT" && !clientId,
        }))}
        value={paymentMethod}
        onChange={(value) => {
          if (value) onChange({ paymentMethod: value as PaymentMethod });
        }}
        allowDeselect={false}
        leftSection={
          SelectedIcon ? <SelectedIcon size={18} strokeWidth={1.75} /> : null
        }
        renderOption={(props) => {
          const optionValue = String(props.option.value);
          const option = PAYMENT_OPTIONS.find(
            (paymentOption) => paymentOption.value === optionValue,
          );
          const Icon = option?.Icon;
          const offer = offerPaymentMethods.find(
            (item) => item.paymentMethod === optionValue,
          );
          return (
            <div
              title={
                props.option.disabled
                  ? "Debe seleccionar un cliente para usar este método"
                  : ""
              }
              className={`flex items-center gap-2 ${
                props.option.disabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {Icon ? <Icon size={16} strokeWidth={1.75} /> : null}
              <span>{props.option.label}</span>
              {offer ? (
                <Badge size="xs" color="blue" variant="light">
                  {offer.discountType === "PERCENTAGE"
                    ? `${offer.value}%`
                    : `$${offer.value}`}
                </Badge>
              ) : null}
            </div>
          );
        }}
      />
      {hasPaymentOffer && selectedPaymentOffer ? (
        <p className="text-primary text-md">
          Oferta aplicada al total:{" "}
          {selectedPaymentOffer.discountType === "PERCENTAGE"
            ? `${selectedPaymentOffer.value}% de descuento`
            : `$${selectedPaymentOffer.value} de descuento`}
        </p>
      ) : null}

      <p className="text-secondary-foreground text-xs">
        El cobro se realiza fuera del sistema: el método queda registrado como
        dato informativo.
      </p>
    </div>
  );
};
