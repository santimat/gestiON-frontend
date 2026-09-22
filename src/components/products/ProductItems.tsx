import type { Product } from "@/types";
import { Table, Button } from "@mantine/core";
import { type LucideIcon } from "lucide-react";

type ProductItemsProps = {
  products: Product[];
  actionsIcons: {
    Icon: LucideIcon;
    label: string;
  };
};

export function ProductItems({ products, actionsIcons }: ProductItemsProps) {
  return products.map((product) => (
    <Table.Tr key={`producto-${product.id}`}>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.category}</Table.Td>
      <Table.Td>{product.salePrice}</Table.Td>
      <Table.Td>{product.currentStock}</Table.Td>
      <Table.Td>{product.status}</Table.Td>
      <Table.Td>
        <div className="flex items-center gap-1">
          {actionsIcons.map(({ Icon, label }) => (
            <Button
              key={label}
              variant="default"
              title={label}
              className="hover:bg-background-soft"
            >
              <Icon
                size={20}
                className={label === "Eliminar" ? "text-destructive" : ""}
              />
            </Button>
          ))}
        </div>
      </Table.Td>
    </Table.Tr>
  ));
}
