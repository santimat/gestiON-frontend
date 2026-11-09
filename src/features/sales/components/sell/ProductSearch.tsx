import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import {
  useProductWithOffer,
  useProductWithOfferSearch,
} from "@features/products";
import { useSale } from "@features/sales/hooks/useSale";
import { ListContainer } from "@shared/components/ListContainer";
import { ProductSellCard } from "@features/sales/components/sell/ProductSellCard";

const SEARCH_DEBOUNCE_MS = 350;

export const ProductSearch = () => {
  const { addToCart, cart } = useSale();

  const { isLoading, products, error } = useProductWithOffer();
  const { filters, setFilters } = useProductWithOfferSearch(cart);

  const [searchText, setSearchText] = useState(filters.searchText ?? "");
  const [debouncedSearch] = useDebouncedValue(searchText, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedSearch === (filters.searchText ?? "")) return;

    setFilters({ searchText: debouncedSearch });
  }, [debouncedSearch, filters.searchText, setFilters]);

  return (
    <div className="border-background-soft bg-card shadow-card rounded-xl border p-3">
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
        >
          {products.map((product) => {
            return (
              <ProductSellCard
                key={`product-${product.name}`}
                product={product}
                addToCart={addToCart}
              />
            );
          })}
        </ListContainer>
      </div>
    </div>
  );
};
