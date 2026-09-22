import { Table } from "@mantine/core";

export function ProductHeaderTable() {
  return (
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
  );
}
