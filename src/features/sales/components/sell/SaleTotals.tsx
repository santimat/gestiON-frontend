import { NumberFormatter } from "@mantine/core";

type SaleTotalsProps = {
  subtotal: number;
  discountValue: number;
  total: number;
};

export const SaleTotals = ({ subtotal, discountValue, total }: SaleTotalsProps) => (
  <>
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

    <div className="border-background-soft mt-5 flex items-end justify-between border-t pt-4">
      <span className="text-secondary-foreground text-sm">Total a cobrar</span>
      <NumberFormatter
        prefix="$"
        value={total}
        thousandSeparator
        className="text-2xl font-semibold tabular-nums"
      />
    </div>
  </>
);