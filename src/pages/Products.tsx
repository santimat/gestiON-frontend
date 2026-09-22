import {
  ActionIcon,
  Table,
  TextInput,
  Select,
  Button,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { QrCode, Pencil, Trash, PackagePlus } from "lucide-react";

import { NewProductForm } from "@/components/products/NewProductForm";

export function Products() {
  const products = [
    {
      product: "Café Molido 500gr",
      category: "Almacen",
      price: "$7850",
      stock: "24/8",
      status: "En stock",
    },
    {
      product: "Yerba Mate 1kg",
      category: "Almacen",
      price: "$6390",
      stock: "5/10",
      status: "Stock bajo",
    },
    {
      product: "Agua saborizada 1.5lts",
      category: "Bebidas",
      price: "$1980",
      stock: "48/12",
      status: "En stock",
    },
  ];

  const actionsIcons = [
    { Icon: QrCode, label: "Etiquetas" },
    { Icon: Pencil, label: "Editar" },
    { Icon: Trash, label: "Eliminar" },
  ];

  const [opened, { open, close }] = useDisclosure(false);

  const rows = products.map((products) => (
    <Table.Tr key={products.product}>
      <Table.Td>{products.product}</Table.Td>
      <Table.Td>{products.category}</Table.Td>
      <Table.Td>{products.price}</Table.Td>
      <Table.Td>{products.stock}</Table.Td>
      <Table.Td>{products.status}</Table.Td>
      <Table.Td>
        <ActionIcon.Group>
          {actionsIcons.map((action, index) => (
            <ActionIcon key={index} variant="default">
              <action.Icon className="hover:bg-background-soft size-4 bg-white" />
              {/* aca hay que mejorar el hover */}
            </ActionIcon>
          ))}
        </ActionIcon.Group>
      </Table.Td>
    </Table.Tr>
  ));

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

        <Modal
          opened={opened}
          onClose={close}
          title="Ingresar Nuevo Producto"
          centered
          size="xl"
          transitionProps={{ transition: "fade-down", duration: 300 }}
        >
          <NewProductForm onSuccess={close} onCancel={close} />
        </Modal>
      </header>

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
          <Table.Thead className="bg-background-soft">
            <Table.Tr>
              <Table.Th>Producto</Table.Th>
              <Table.Th>Categoria</Table.Th>
              <Table.Th>Precio</Table.Th>
              <Table.Th>Stock</Table.Th>
              <Table.Th>Estado</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
