import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Button, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import type { Offer } from "@features/offers/types";
import type { Product } from "@features/products";
import { useLocalFilters } from "@shared/hooks/useLocalFilters";
import { formatOfferValue } from "@features/offers/utils/offerUtils";
import { useOfferAssigment } from "@features/offers/hooks/useOfferAssigment";
import { ProductFiltersSchema } from "@features/products/schemas/ProductFiltersSchema";
import { OfferAssignmentProductItem } from "@features/offers/components/OfferAssignmentProductItem";
import { toastAppError } from "@/shared/utils/toastAppError";

type OfferAssignmentDialogProps = {
  offer: Offer;
  closeModal: () => void;
};

export const OfferAssignmentDialog = ({
  offer,
  closeModal,
}: OfferAssignmentDialogProps) => {
  const { assignOfferProducts, products, isLoadingProducts, getProducts } =
    useOfferAssigment();

  // Derivar la selección base desde el backend y mantenerla comoDrafts cuando el usuráio cambia
  const selectedIds = products
    .filter((product: Product) => product.offerId === offer.id)
    .flatMap((product: Product) => product.id); // ✔️ ahora refleja siempre el backend

  const [isSaving, setIsSaving] = useState(false);
  const { filters, setFilters } = useLocalFilters(ProductFiltersSchema);
  const [searchText, setSearchText] = useState(filters.searchText ?? "");
  const [debouncedSearch] = useDebouncedValue(searchText, 300);

  // selección editable del usuario
  const [checkedIds, setCheckedIds] = useState<number[] | null>(null);
  const selected = checkedIds ?? selectedIds;

  useEffect(() => {
    if (debouncedSearch === (filters.searchText ?? "")) return;

    setFilters({ searchText: debouncedSearch });
  }, [debouncedSearch, setFilters, filters.searchText]);

  useEffect(() => {
    getProducts({ ...filters, active: true, size: 20 });
  }, [getProducts, filters]);

  const count = selected.length;

  const handleAssign = async () => {
    setIsSaving(true);
    try {
      await assignOfferProducts(offer.id, selected);
      toast.success("Productos asignados");
      closeModal();
    } catch (error) {
      toastAppError(error, "Error al asignar productos a la oferta");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <header className="mb-4">
        <p className="font-semibold">Asignar productos</p>
        <p className="text-secondary-foreground text-sm">
          {formatOfferValue(offer)} de descuento
        </p>
      </header>

      <div className="mb-4">
        <TextInput
          aria-label="Buscar productos para asignar"
          placeholder="Buscar por nombre o categoría"
          value={searchText}
          onChange={(event) => setSearchText(event.currentTarget.value)}
          leftSection={<Search className="text-secondary-foreground h-4 w-4" />}
        />
      </div>

      <div className="border-background-soft max-h-80 scrollbar-thin overflow-y-auto rounded-lg border">
        {isLoadingProducts && (
          <p className="text-secondary-foreground px-3 py-8 text-center text-sm">
            Cargando productos...
          </p>
        )}

        {!isLoadingProducts && products.length === 0 && (
          <p className="text-secondary-foreground px-3 py-8 text-center text-sm">
            {filters.searchText
              ? "No encontramos productos."
              : "No hay productos activos."}
          </p>
        )}

        {!isLoadingProducts && (
          <ul className="[&>li]:border-background-soft [&>li]:not-last:border-b">
            {products.map((product) => (
              <li>
                <OfferAssignmentProductItem
                  product={product}
                  selected={selected}
                  setSelected={(updater) =>
                    setCheckedIds((prev) => updater(prev ?? selectedIds))
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-secondary-foreground mt-2 text-sm" aria-live="polite">
        {count} producto{count === 1 ? "" : "s"} seleccionado
        {count === 1 ? "" : "s"}
      </p>

      <div className="flex justify-end gap-4 pt-6">
        <Button
          className="bg-destructive!"
          onClick={closeModal}
          disabled={isSaving}
        >
          Cancelar
        </Button>
        <Button loading={isSaving} onClick={handleAssign}>
          Asignar
        </Button>
      </div>
    </>
  );
};
