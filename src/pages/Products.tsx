import { useDisclosure } from "@mantine/hooks";
import { Table, TextInput, Select, Button, Modal } from "@mantine/core";
import { QrCode, Pencil, Trash, PackagePlus } from "lucide-react";

import { ProductItems } from "@/components/products/ProductItems";
import { NewProductForm } from "@/components/products/NewProductForm";
import { ProductHeaderTable } from "@/components/products/ProductHeaderTable";

export function Products() {
  const products = [
    {
      id: 1,
      name: "Café Molido 500gr",
      category: "Almacen",
      description:
        "Café molido de alta calidad, ideal para preparar en cafetera o prensa francesa.",
      salePrice: 7850,
      costPrice: 5200,
      currentStock: 20,
      minStock: 10,
      active: true,
    },
    {
      id: 2,
      name: "Yerba Mate 1kg",
      category: "Almacen",
      description: "Yerba mate en grano, ideal para preparar en termo o pava.",
      salePrice: 6390,
      costPrice: 4500,
      currentStock: 5,
      minStock: 10,
      active: false,
    },
    {
      id: 3,
      name: "Agua saborizada 1.5lts",
      category: "Bebidas",
      description:
        "Agua saborizada de 1.5 litros, ideal para consumir en cualquier momento.",
      salePrice: 1980,
      costPrice: 1200,
      currentStock: 12,
      minStock: 10,
      active: true,
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
        <NewProductForm closeModal={closeModal} />
      </Modal>

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
