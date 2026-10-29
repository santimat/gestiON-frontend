import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";

import { useSale } from "@/hooks/useSale";
import { useProductSearch } from "@/hooks/product/useProductSearch";
import { useProduct } from "@/hooks/product/useProduct";
import { ProductSellCard } from "./ProductSellCard";
import { ListContainer } from "../ListContainer";

const SEARCH_DEBOUNCE_MS = 350;

export const ProductSearch = () => {
  const { addToCart, cart } = useSale();

  const { isLoading, products, error } = useProduct();
  const { filters, setFilters } = useProductSearch(cart);

  const [searchText, setSearchText] = useState(filters.searchText ?? "");

  useEffect(() => {
    if (searchText === (filters.searchText ?? "")) return;

    const timeoutId = setTimeout(() => {
      setFilters({ searchText: searchText || undefined });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchText, filters.searchText, setFilters]);

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
        <ListContainer
          isLoading={isLoading}
          isLoadingMessage="Buscando productos..."
          isEmpty={products.length === 0}
          icon={SearchIcon}
          error={error}
          emptyMessage=""
        >
          {products.map((product) => {
            return <ProductSellCard product={product} addToCart={addToCart} />;
          })}
        </ListContainer>
      </div>
    </div>
  );
};
