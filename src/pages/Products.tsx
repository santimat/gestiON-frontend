import { useEffect, useState } from "react";
import { PackagePlus } from "lucide-react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import type { Product } from "@/types";
import { ProductList } from "@/components/products/ProductList";
import { NewProductForm } from "@/components/products/NewProductForm";
import { useProduct } from "@/hooks/useProduct";

export const Products = () => {
  const [opened, { open: openModal, close }] = useDisclosure(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { getProducts, totalProducts } = useProduct();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const closeModal = () => {
    close();
    setEditingProduct(null);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    openModal();
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    openModal();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        centered
        size="xl"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <NewProductForm
          key={editingProduct?.id ?? "create"}
          product={editingProduct}
          closeModal={closeModal}
        />
      </Modal>

      <header className="flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Productos</h1>
          <p>{totalProducts} productos cargados</p>
        </div>
        <Button
          leftSection={<PackagePlus />}
          onClick={openCreateModal}
          className="bg-primary rounded-md p-2 text-white"
        >
          Nuevo Producto
        </Button>
      </header>

      <main className="flex flex-col gap-8 p-6">
        <ProductList onEdit={openEditModal} />
      </main>
    </>
  );
};
