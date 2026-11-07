import { Button } from "@mantine/core";
import { lazy, useEffect } from "react";
import { Package, PackagePlus } from "lucide-react";

import { useAuth } from "@features/auth";
import { useCommerce } from "@features/commerces";
import { ListContainer } from "@shared/components/ListContainer";
import { useProduct } from "@features/products/hooks/useProduct";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { EntityFormModal } from "@shared/components/EntityFormModal";
import { ProductList } from "@features/products/components/ProductList";

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
    isLoading,
    error,
    formProduct,
    isFormModalOpen,
    getProducts,
    openCreate,
    closeFormModal,
  } = useProduct();
  const { getCurrentCommerce, currentCommerce } = useCommerce();

  useEffect(() => {
    getProducts();
    if (authenticatedUser?.commerceId) getCurrentCommerce();
    // usamos el close para limpiar el estado
    return () => closeFormModal();
  }, [getProducts, getCurrentCommerce, authenticatedUser, closeFormModal]);

  usePageHeader({
    title: "Productos",
    subtitle: `${totalProducts} productos cargados`,
    actions: (
      <Button
        leftSection={<PackagePlus />}
        onClick={openCreate}
        className="bg-primary rounded-md p-2 text-white"
      >
        <span className="hidden sm:inline">Nuevo Producto</span>
      </Button>
    ),
  });

  return (
    <>
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

      <main className="flex flex-col gap-6 p-6">
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={totalProducts === 0}
          icon={Package}
          emptyMessage="No hay productos para mostrar"
        >
          <ProductList products={products} />
        </ListContainer>
      </main>
    </>
  );
};
