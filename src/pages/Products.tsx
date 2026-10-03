import { PackagePlus } from "lucide-react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { ProductList } from "@/components/products/ProductList";
import { NewProductForm } from "@/components/products/NewProductForm";

export function Products() {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

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
        <NewProductForm closeModal={closeModal} />
      </Modal>

      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Productos</h1>
          <p>() productos cargados</p>
        </div>
        <Button
          leftSection={<PackagePlus />}
          onClick={openModal}
          className="bg-primary rounded-md p-2 text-white"
        >
          Nuevo Producto
        </Button>
      </header>

      <main className="flex flex-col gap-8 p-6">
        <ProductList />
      </main>
    </>
  );
}
