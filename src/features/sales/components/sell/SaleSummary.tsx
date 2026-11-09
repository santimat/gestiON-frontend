import {
  Badge,
  Button,
  NumberFormatter,
  NumberInput,
  Select,
} from "@mantine/core";
import {
  ArrowLeftRight,
  Banknote,
  BookUserIcon,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

import { useClient } from "@features/clients";
import { useOfferPaymentMethod } from "@features/offers";
import { useSale } from "@features/sales/hooks/useSale";
import type { DiscountType, PaymentMethod } from "@features/sales/types";
import { StatusBadge } from "@shared/components/StatusBadge";

type PaymentOption = {
  value: PaymentMethod;
  label: string;
  Icon: LucideIcon;
};

const PAYMENT_OPTIONS: PaymentOption[] = [
  { value: "CASH", label: "Efectivo", Icon: Banknote },
  { value: "CARD", label: "Tarjeta", Icon: CreditCard },
  { value: "TRANSFER", label: "Transferencia", Icon: ArrowLeftRight },
  { value: "CREDIT_ACCOUNT", label: "Cuenta corriente", Icon: BookUserIcon },
];

type SaleSummaryProps = {
  onConfirm: () => void;
  isSubmitting?: boolean;
};

export const SaleSummary = ({
  onConfirm,
  isSubmitting = false,
}: SaleSummaryProps) => {
  const { cart, saleDraft, setSaleDraft } = useSale();
  const { clients } = useClient();
  const { offerPaymentMethods } = useOfferPaymentMethod();

  const { discount, discountType, paymentMethod, clientId } = saleDraft;

  const selectedPaymentOffer = offerPaymentMethods.find(
    (offer) => offer.paymentMethod === paymentMethod,
  );
  const hasPaymentOffer = selectedPaymentOffer !== undefined;

  const SelectedIcon = PAYMENT_OPTIONS.find(
    (option) => option.value === paymentMethod,
  )?.Icon;

  const discountTypes: DiscountType[] = ["FIXED_AMOUNT", "PERCENTAGE"];

  const subtotal = cart.reduce(
    (acc, line) => acc + line.salePrice * line.qty,
    0,
  );

  const manualDiscountValue =
    discountType === "PERCENTAGE"
      ? Math.round(
          (subtotal *
            // se asegura que el descuento no supere el 100%
            Math.min(discount, 100)) /
            100,
        )
      : // se asegura que el descuento no supere el subtotal
        Math.min(discount, subtotal);

  const paymentOfferValue = selectedPaymentOffer
    ? selectedPaymentOffer.discountType === "PERCENTAGE"
      ? Math.round(
          (subtotal * Math.min(Number(selectedPaymentOffer.value), 100)) / 100,
        )
      : Math.min(Number(selectedPaymentOffer.value), subtotal)
    : 0;

  // si el método elegido tiene oferta, esta prevalece sobre el descuento manual
  const discountValue = hasPaymentOffer
    ? paymentOfferValue
    : manualDiscountValue;

  // informativo, el descuento real lo calcula el backend
  const total = Math.max(0, subtotal - discountValue);

  return (
    <div className="border-background-soft bg-card shadow-card rounded-xl border p-4 lg:sticky lg:top-6">
      <p className="text-sm font-semibold">Resumen de la venta</p>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary-foreground">Subtotal</span>
          <NumberFormatter
            prefix="$"
            value={subtotal}
            thousandSeparator
            className="font-medium tabular-nums"
          />
        </div>
        <div className="flex justify-between">
          <span className="text-secondary-foreground">Descuento</span>
          <NumberFormatter
            prefix="$"
            value={discountValue}
            thousandSeparator
            className="text-destructive font-medium tabular-nums"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium">Descuento</p>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <NumberInput
            min={0}
            value={discount}
            disabled={hasPaymentOffer}
            onChange={(value) => setSaleDraft({ discount: Number(value) || 0 })}
            aria-label="Importe del descuento"
          />
          <div className="border-background-soft flex rounded-lg border p-1">
            {discountTypes.map((type) => (
              <button
                key={type}
                type="button"
                disabled={hasPaymentOffer}
                onClick={() => setSaleDraft({ discountType: type })}
                className={`rounded-md px-2.5 text-sm font-medium transition-colors ${
                  discountType === type
                    ? "bg-primary-soft text-primary"
                    : "text-secondary-foreground hover:bg-background-soft"
                } ${hasPaymentOffer ? "opacity-50" : ""}`}
              >
                {type === "FIXED_AMOUNT" ? "$" : "%"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Select
          label="Cliente (opcional)"
          placeholder="Consumidor final"
          data={clients.map((client) => ({
            value: String(client.id),
            label: `${client.lastName}, ${client.name} — DNI ${client.dni}`,
          }))}
          value={clientId !== null ? String(clientId) : null}
          onChange={(value) =>
            setSaleDraft({ clientId: value ? Number(value) : null })
          }
          allowDeselect
        />
        <p className="text-secondary-foreground text-xs">
          Asociá la venta a un cliente para su cuenta corriente.
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <Select
          label="Método de pago"
          data={PAYMENT_OPTIONS.map(({ value, label }) => ({ value, label }))}
          value={paymentMethod}
          onChange={(value) => {
            if (value) setSaleDraft({ paymentMethod: value as PaymentMethod });
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
              <div className="flex items-center gap-2">
                {Icon ? <Icon size={16} strokeWidth={1.75} /> : null}
                <span>{props.option.label}</span>
                {offer ? (
                  <Badge size="xs" color="violet" variant="light">
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
          <p className="text-primary text-xs font-medium">
            Oferta aplicada al total:{" "}
            {selectedPaymentOffer.discountType === "PERCENTAGE"
              ? `${selectedPaymentOffer.value}% de descuento`
              : `$${selectedPaymentOffer.value} de descuento`}
          </p>
        ) : null}
        {offerPaymentMethods.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {offerPaymentMethods.map((offer) => {
              const option = PAYMENT_OPTIONS.find(
                (item) => item.value === offer.paymentMethod,
              );
              return (
                <StatusBadge
                  key={offer.paymentMethod}
                  tone="primary"
                  size="xs"
                  label={`${option?.label ?? offer.paymentMethod}: ${
                    offer.discountType === "PERCENTAGE"
                      ? `${offer.value}%`
                      : `$${offer.value}`
                  }`}
                />
              );
            })}
          </div>
        ) : null}
        <p className="text-secondary-foreground text-xs">
          El cobro se realiza fuera del sistema: el método queda registrado como
          dato informativo.
        </p>
      </div>

      <div className="border-background-soft mt-5 flex items-end justify-between border-t pt-4">
        <span className="text-secondary-foreground text-sm">
          Total a cobrar
        </span>
        <NumberFormatter
          prefix="$"
          value={total}
          thousandSeparator
          className="text-2xl font-semibold tabular-nums"
        />
      </div>

      <Button
        onClick={onConfirm}
        disabled={cart.length === 0 || isSubmitting}
        className="bg-primary mt-4 h-11 w-full rounded-md text-base"
      >
        Confirmar venta
      </Button>
    </div>
  );
};
