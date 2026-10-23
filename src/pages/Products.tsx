import { Package, PackagePlus } from "lucide-react";
import { useEffect } from "react";
import { Button, Modal } from "@mantine/core";

import { ListContainer } from "@/components/ListContainer";
import { ProductList } from "@/components/products/ProductList";
import { NewProductForm } from "@/components/products/NewProductForm";
import { useProduct } from "@/hooks/useProduct";
import { useCommerce } from "@/hooks/useCommerce";
import { useAuth } from "@/hooks/useAuth";

export const Products = () => {
  const { authenticatedUser } = useAuth();
  const {
    getProducts,
    totalProducts,
    isLoading,
    error,
    formProduct,
    isFormModalOpen,
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

  return (
    <>
      <Modal
        opened={isFormModalOpen}
        onClose={closeFormModal}
        centered
        size="xl"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <NewProductForm
          key={formProduct?.id ?? "create"}
          product={formProduct}
          currentCommerce={currentCommerce ?? null}
          closeModal={closeFormModal}
        />
      </Modal>

      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Productos</h1>
          <p>{totalProducts} productos cargados</p>
        </div>
        <Button
          leftSection={<PackagePlus />}
          onClick={openCreate}
          className="bg-primary rounded-md p-2 text-white"
        >
          <span className="hidden sm:inline">Nuevo Producto</span>
        </Button>
      </header>

      <main className="flex flex-col gap-6 p-6">
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={totalProducts === 0}
          icon={Package}
          emptyMessage="No hay productos para mostrar"
        >
          <ProductList />
        </ListContainer>
      </main>
    </>
  );
};
