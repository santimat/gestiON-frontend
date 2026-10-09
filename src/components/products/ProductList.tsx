import { Pencil } from "lucide-react";

import { ProductItem } from "@/components/products/ProductItem";
import type { Product } from "@/types";
import { useProduct } from "@/hooks/useProduct";
import { LoadingPage } from "../Loading";

type ProductListProps = {
  onEdit: (product: Product) => void;
};

export const ProductList = ({ onEdit }: ProductListProps) => {
  const { products, isLoading } = useProduct();

  const headers = [
    "Foto",
    "Producto",
    "Categoría",
    "Precio",
    "Stock",
    "Estado",
    "Acciones",
  ];

  const actionsIcons = [{ Icon: Pencil, label: "Editar" }];

  const columns =
    "grid grid-cols-[0.2fr_1fr_0.8fr_0.4fr_0.4fr_0.4fr_0.2fr] items-center gap-x-4";

  if (isLoading) {
    return <LoadingPage />;
  }

  if (products.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-secondary-foreground">No hay productos cargados</p>
      </div>
    );
  }

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <ul
        className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
      >
        {headers.map((header) => (
          <li key={header}>{header}</li>
        ))}
      </ul>
      <ul>
        {products.map((product) => {
          return (
            <ProductItem
              key={`product-${product.id}`}
              product={product}
              columns={columns}
              actionsIcons={actionsIcons}
              onEdit={() => onEdit(product)}
            />
          );
        })}
      </ul>
    </section>
  );
};
