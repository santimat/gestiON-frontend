import { useState } from "react";
import { Button, NumberFormatter, NumberInput, Select } from "@mantine/core";
import {
  ArrowLeftRight,
  Banknote,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

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
];

type SaleSummaryProps = {
  onConfirm: () => void;
};

export const SaleSummary = ({ onConfirm }: SaleSummaryProps) => {
  const CART = [
    { productId: 1, name: "Café Molido 500gr", price: 4500, qty: 2 },
    { productId: 5, name: "Agua Mineral 2L", price: 1500, qty: 3 },
    { productId: 3, name: "Azúcar 1kg", price: 1800, qty: 1 },
  ];

  const CLIENTS = [
    { id: 1, fullName: "Torres, Ernesto", dni: "25369870" },
    { id: 2, fullName: "Fanelli, Analia", dni: "37802564" },
    { id: 3, fullName: "Bustos, Carlos", dni: "28562314" },
  ];

  const [discount, setDiscount] = useState(0);

  const [discountType, setDiscountType] = useState<DiscountType>("monto");
  const discountTypes: DiscountType[] = ["monto", "porcentaje"];

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");

  const subtotal = CART.reduce((acc, item) => acc + item.price * item.qty, 0);

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
            onChange={(value) => setDiscount(Number(value) || 0)}
            aria-label="Importe del descuento"
          />
          <div className="border-border flex rounded-lg border p-1">
            {discountTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setDiscountType(type)}
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
          data={CLIENTS.map((client) => ({
            value: String(client.id),
            label: `${client.fullName} — DNI ${client.dni}`,
          }))}
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
              onClick={() => setPaymentMethod(value)}
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
        disabled={CART.length === 0}
        className="bg-primary mt-4 h-11 w-full rounded-md text-base"
      >
        Confirmar venta
      </Button>
    </div>
  );
};
