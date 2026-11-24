import { Button } from "@mantine/core";
import { lazy, useEffect } from "react";
import { Package, PackagePlus } from "lucide-react";

import { useAuth } from "@features/auth";
import { useCommerce } from "@features/commerces";
import { useFilters } from "@shared/hooks/useFilters";
import { ListContainer } from "@shared/components/ListContainer";
import { ListPagination } from "@shared/components/ListPagination";
import { useProduct } from "@features/products/hooks/useProduct";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { EntityFormModal } from "@shared/components/EntityFormModal";
import { ProductList } from "@features/products/components/ProductList";
import { ProductsFilterBar } from "@features/products/components/ProductsFilterBar";
import { ProductFiltersSchema } from "@features/products/schemas/ProductFiltersSchema";

const ProductForm = lazy(() =>
  import("@features/products/components/ProductForm").then((module) => ({
    default: module.ProductForm,
  })),
);

export const Products = () => {
  const { authenticatedUser } = useAuth();
  const {
    products,
    totalProducts,
    totalPages,
    isLoading,
    error,
    formProduct,
    isFormModalOpen,
    getProducts,
    openCreate,
    closeFormModal,
  } = useProduct();
  const { getCurrentCommerce, currentCommerce } = useCommerce();
  const { filters, setFilters, hasFilters } = useFilters(ProductFiltersSchema);

  const canManageProducts = authenticatedUser?.role === "OWNER";

  useEffect(() => {
    getProducts(filters);
    if (canManageProducts && authenticatedUser?.commerceId) {
      getCurrentCommerce();
    }
    // usamos el close para limpiar el estado
    return () => closeFormModal();
  }, [
    getProducts,
    getCurrentCommerce,
    authenticatedUser,
    canManageProducts,
    closeFormModal,
    filters,
  ]);

  usePageHeader({
    title: "Productos",
    subtitle: `${totalProducts} productos cargados`,
    actions: canManageProducts ? (
      <Button
        leftSection={<PackagePlus />}
        onClick={openCreate}
        className="bg-primary text-primary-foreground rounded-md p-2"
      >
        <span className="hidden sm:inline">Nuevo Producto</span>
      </Button>
    ) : null,
  });

  return (
    <>
      {canManageProducts ? (
        <EntityFormModal
          opened={isFormModalOpen}
          closeModal={closeFormModal}
          entityKey={formProduct?.id ?? "create"}
        >
          <ProductForm
            product={formProduct}
            currentCommerce={currentCommerce ?? null}
            closeModal={closeFormModal}
          />
        </EntityFormModal>
      ) : null}

      <main className="flex flex-col gap-6">
        <ProductsFilterBar filters={filters} setFilters={setFilters} />
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={totalProducts === 0}
          icon={Package}
          emptyMessage={
            hasFilters
              ? "No se encontraron productos con ese filtro"
              : "No hay productos para mostrar"
          }
        >
          <ProductList products={products} canManage={canManageProducts} />
        </ListContainer>

        <ListPagination
          filters={filters}
          setFilters={setFilters}
          totalItems={totalProducts}
          totalPages={totalPages}
          itemLabel="productos"
        />
      </main>
    </>
  );
};
