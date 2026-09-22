import { useDisclosure } from "@mantine/hooks";
import { Table, TextInput, Select, Button, Modal } from "@mantine/core";
import { QrCode, Pencil, Trash, PackagePlus, PackageIcon } from "lucide-react";

import { ProductItems } from "@/components/products/ProductItems";
import { NewProductForm } from "@/components/products/NewProductForm";
import { ProductHeaderTable } from "@/components/products/ProductHeaderTable";

export function Products() {
  const products = [
    {
      name: "Café Molido 500gr",
      category: "Almacen",
      salePrice: "$7850",
      currentStock: "24/8",
      status: "En stock",
    },
    {
      name: "Yerba Mate 1kg",
      category: "Almacen",
      salePrice: "$6390",
      currentStock: "5/10",
      status: "Stock bajo",
    },
    {
      name: "Agua saborizada 1.5lts",
      category: "Bebidas",
      salePrice: "$1980",
      currentStock: "48/12",
      status: "En stock",
    },
  ];

  const actionsIcons = [
    { Icon: QrCode, label: "Etiquetas" },
    { Icon: Pencil, label: "Editar" },
    { Icon: Trash, label: "Eliminar" },
  ];

  const [opened, { open, close: closeModal }] = useDisclosure(false);

  return (
    <>
      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Productos</h1>
          <p>() productos cargados</p>
        </div>
        <Button
          leftSection={<PackagePlus />}
          onClick={open}
          className="bg-primary rounded-md p-2 text-white"
        >
          Nuevo Producto
        </Button>
      </header>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="xl"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <header className="mb-4">
          <div className="flex gap-2">
            <PackageIcon className="text-primary" />
            <p className="font-semibold">Nuevo Producto</p>
          </div>
        </header>
        <NewProductForm closeModal={closeModal} />
      </Modal>
      {/* Aca faltaria el cartel de alerta de stock */}

      <div className="flex w-full items-center gap-4 p-6">
        <div className="flex-1">
          <TextInput placeholder=" Buscar por nombre o codigo" />
        </div>
        <div className="border-background-soft w-64">
          <Select
            placeholder="Seleccione Categoria"
            data={["Almacen", "Bebidas", "Perfumeria", "Limpieza"]}
          />
        </div>
      </div>

      <Table.ScrollContainer minWidth={500} className="p-4">
        <Table className="border-background-soft mt-8 rounded-lg border">
          <ProductHeaderTable />
          <Table.Tbody>
            <ProductItems products={products} actionsIcons={actionsIcons} />
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
