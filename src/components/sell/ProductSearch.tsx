import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { NumberFormatter, TextInput } from "@mantine/core";
import { toast } from "sonner";

import { ProductFiltersSchema } from "@/schemas";
import { useFilters } from "@/hooks/useFilters";
import { useProduct } from "@/hooks/useProduct";
import { useSale } from "@/hooks/useSale";
import type { AppError } from "@/types";

const SEARCH_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 350;

export const ProductSearch = () => {
  const { filters, setFilters } = useFilters(ProductFiltersSchema);

  const { products, isLoading, getProducts } = useProduct();
  const { addToCart, cart } = useSale();

  // para detectar cuándo el carrito se vacía y refrescar el stock
  const prevCartCountRef = useRef(cart.length);

  const [searchText, setSearchText] = useState(filters.searchText ?? "");

  useEffect(() => {
    if (searchText === (filters.searchText ?? "")) return;

    const timeoutId = setTimeout(() => {
      setFilters({ searchText: searchText || undefined });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchText, filters.searchText, setFilters]);

  useEffect(() => {
    getProducts({
      searchText: filters.searchText,
      categoryId: filters.categoryId,
      size: SEARCH_PAGE_SIZE,
    }).catch((error) => {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudieron cargar los productos.");
    });
  }, [getProducts, filters.searchText, filters.categoryId]);

  useEffect(() => {
    // el carrito se vació (venta confirmada o líneas eliminadas): refrescamos el stock
    if (prevCartCountRef.current > 0 && cart.length === 0) {
      getProducts({
        searchText: filters.searchText,
        categoryId: filters.categoryId,
        size: SEARCH_PAGE_SIZE,
      }).catch((error) => {
        const appError = error as AppError;
        toast.error(
          appError?.message ?? "No se pudieron cargar los productos.",
        );
      });
    }
    prevCartCountRef.current = cart.length;
  }, [cart.length, getProducts, filters.searchText, filters.categoryId]);

  return (
    <div className="border-border bg-card shadow-card rounded-xl border p-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <TextInput
          leftSection={<SearchIcon size={20} />}
          label="Buscar producto"
          placeholder="Escribí el nombre o categoría"
          aria-label="Buscar producto"
          value={searchText}
          onChange={(event) => setSearchText(event.currentTarget.value)}
        />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {products.map((product) => {
          const isLowStock = product.currentStock <= product.minStock;
          const isOutOfStock = product.currentStock === 0;

          return (
            <button
              key={`product-${product.id}`}
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
              className="border-border bg-surface hover:bg-background-soft flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div>
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-secondary-foreground truncate text-xs">
                  {product.category.name} - {product.currentStock} u.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {isOutOfStock ? (
                  <span className="bg-destructive/40 text-destructive rounded-full px-2 py-0.5 text-xs font-medium">
                    sin stock
                  </span>
                ) : (
                  isLowStock && (
                    <span className="bg-warning/40 text-warning rounded-full px-2 py-0.5 text-xs font-medium">
                      bajo
                    </span>
                  )
                )}
                <NumberFormatter
                  prefix="$"
                  value={product.salePrice}
                  thousandSeparator
                  className="text-sm font-semibold tabular-nums"
                />
              </div>
            </button>
          );
        })}

        {isLoading && (
          <p className="text-secondary-foreground col-span-full py-6 text-center text-sm">
            Buscando productos...
          </p>
        )}

        {!isLoading && products.length === 0 && (
          <p className="text-secondary-foreground col-span-full py-6 text-center text-sm">
            {filters.searchText
              ? `Sin resultados para "${filters.searchText}".`
              : "No hay productos cargados."}
          </p>
        )}
      </div>
    </div>
  );
};
