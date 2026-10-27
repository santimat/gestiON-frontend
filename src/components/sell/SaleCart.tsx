import { Button, NumberFormatter } from "@mantine/core";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { useSale } from "@/hooks/useSale";
import type { CartLine } from "@/types";

export const SaleCart = () => {
  const { cart, setQty, removeLine } = useSale();

  const totalItems = cart.reduce((acc, line) => acc + line.qty, 0);

  const handleQtyInput = (rawValue: string, line: CartLine) => {
    const parsed = Number(rawValue);
    // vacío o inválido: volvemos a 1 para no perder la línea mientras se tipea
    const qty = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
    setQty(line.productId, qty);
  };

  return (
    <div className="border-border bg-card shadow-card overflow-hidden rounded-xl border">
      <div className="border-border flex items-center justify-between gap-3 border-b px-4 py-3">
        <p className="text-sm font-semibold">Carrito</p>
        <span className="bg-primary-soft text-primary rounded-full px-2 py-0.5 text-xs font-medium">
          {totalItems} ítems
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
          <ShoppingCart className="text-secondary-foreground" size={24} />
          <p className="text-secondary-foreground text-sm">
            Todavía no agregaste productos.
          </p>
        </div>
      ) : (
        <ul className="divide-background-soft divide-y">
          {cart.map((line) => (
            <li key={`cart-line-${line.productId}`} className="px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{line.name}</p>
                  <NumberFormatter
                    prefix="$"
                    value={line.salePrice}
                    thousandSeparator
                    suffix=" c/u"
                    className="text-secondary-foreground text-xs tabular-nums"
                  />
                </div>
                <NumberFormatter
                  prefix="$"
                  value={line.salePrice * line.qty}
                  thousandSeparator
                  className="shrink-0 text-sm font-semibold tabular-nums"
                />
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <div className="border-border flex items-center rounded-lg border">
                  <Button
                    variant="subtle"
                    size="compact-sm"
                    aria-label="Quitar una unidad"
                    onClick={() => setQty(line.productId, line.qty - 1)}
                  >
                    <Minus size={16} strokeWidth={1.75} />
                  </Button>
                  <input
                    value={line.qty}
                    onChange={(event) =>
                      handleQtyInput(event.currentTarget.value, line)
                    }
                    aria-label={`Cantidad de ${line.name}`}
                    className="w-10 border-0 bg-transparent text-center text-sm font-medium tabular-nums outline-none"
                  />
                  <Button
                    variant="subtle"
                    size="compact-sm"
                    aria-label="Agregar una unidad"
                    onClick={() => setQty(line.productId, line.qty + 1)}
                  >
                    <Plus size={16} strokeWidth={1.75} />
                  </Button>
                </div>
                <Button
                  variant="subtle"
                  color="red"
                  size="compact-sm"
                  aria-label={`Eliminar ${line.name}`}
                  onClick={() => removeLine(line.productId)}
                >
                  <Trash2 size={16} strokeWidth={1.75} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
