import { Button, NumberFormatter, NumberInput, Select } from "@mantine/core";
import {
  ArrowLeftRight,
  Banknote,
  BookUserIcon,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

import { useClient } from "@/hooks/useClient";
import { useSale } from "@/hooks/useSale";
import type { DiscountType, PaymentMethod } from "@/types";

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

  const { discount, discountType, paymentMethod, clientId } = saleDraft;

  const discountTypes: DiscountType[] = ["monto", "porcentaje"];

  const subtotal = cart.reduce(
    (acc, line) => acc + line.salePrice * line.qty,
    0,
  );

  const discountValue =
    discountType === "porcentaje"
      ? Math.round(
          (subtotal *
            // se asegura que el descuento no supere el 100%
            Math.min(discount, 100)) /
            100,
        )
      : // se asegura que el descuento no supere el subtotal
        Math.min(discount, subtotal);

  // estimado informativo: el descuento y el total reales los calcula el backend
  const total = Math.max(0, subtotal - discountValue);

  return (
    <div className="border-border bg-card shadow-card rounded-xl border p-4 lg:sticky lg:top-6">
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
            prefix="-$"
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
            onChange={(value) => setSaleDraft({ discount: Number(value) || 0 })}
            aria-label="Importe del descuento"
          />
          <div className="border-border flex rounded-lg border p-1">
            {discountTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSaleDraft({ discountType: type })}
                className={`rounded-md px-2.5 text-sm font-medium transition-colors ${
                  discountType === type
                    ? "bg-primary-soft text-primary"
                    : "text-secondary-foreground hover:bg-background-soft"
                }`}
              >
                {type === "monto" ? "$" : "%"}
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
        <p className="text-sm font-medium">Método de pago</p>
        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_OPTIONS.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSaleDraft({ paymentMethod: value })}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors hover:cursor-pointer ${
                paymentMethod === value
                  ? "border-primary bg-primary-soft text-primary"
                  : "text-secondary-foreground hover:bg-background-soft"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} className="shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
        <p className="text-secondary-foreground text-xs">
          El cobro se realiza fuera del sistema: el método queda registrado como
          dato informativo.
        </p>
      </div>

      <div className="border-border mt-5 flex items-end justify-between border-t pt-4">
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
