import { Button, NumberFormatter } from "@mantine/core";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

export const SaleCart = () => {
  const CART = [
    { productId: 1, name: "Café Molido 500gr", price: 4500, qty: 2 },
    { productId: 5, name: "Agua Mineral 2L", price: 1500, qty: 3 },
    { productId: 3, name: "Azúcar 1kg", price: 1800, qty: 1 },
  ];

  const totalItems = CART.reduce((acc, product) => acc + product.qty, 0);

  return (
    <div className="border-border bg-card shadow-card overflow-hidden rounded-xl border">
      <div className="border-border flex items-center justify-between gap-3 border-b px-4 py-3">
        <p className="text-sm font-semibold">Carrito</p>
        <span className="bg-primary-soft text-primary rounded-full px-2 py-0.5 text-xs font-medium">
          {totalItems} ítems
        </span>
      </div>

      {CART.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
          <ShoppingCart className="text-secondary-foreground" size={24} />
          <p className="text-secondary-foreground text-sm">
            Todavía no agregaste productos.
          </p>
        </div>
      ) : (
        <ul className="divide-background-soft divide-y">
          {CART.map((item) => (
            <li key={`cart-item-${item.productId}`} className="px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <NumberFormatter
                    prefix="$"
                    value={item.price}
                    thousandSeparator
                    suffix=" c/u"
                    className="text-secondary-foreground text-xs tabular-nums"
                  />
                </div>
                <NumberFormatter
                  prefix="$"
                  value={item.price * item.qty}
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
                  >
                    <Minus size={16} strokeWidth={1.75} />
                  </Button>
                  <input
                    value={item.qty}
                    aria-label={`Cantidad de ${item.name}`}
                    className="w-10 border-0 bg-transparent text-center text-sm font-medium tabular-nums outline-none"
                  />
                  <Button
                    variant="subtle"
                    size="compact-sm"
                    aria-label="Agregar una unidad"
                  >
                    <Plus size={16} strokeWidth={1.75} />
                  </Button>
                </div>
                <Button
                  variant="subtle"
                  color="red"
                  size="compact-sm"
                  aria-label={`Eliminar ${item.name}`}
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
