import { Pencil } from "lucide-react";

import { ProductItem } from "@/components/products/ProductItem";
import { ProductItemMobile } from "@/components/products/ProductItemMobile";
import type { Product } from "@/types";
type ProductListProps = {
  products: Product[];
};
export const ProductList = ({ products }: ProductListProps) => {
  const headers = [
    "Foto",
    "Producto",
    "Categoría",
    "Descripción",
    "Precio",
    "Stock Actual",
    "Stock Mínimo",
    "Estado",
    "Acciones",
  ];

  const actionsIcons = [{ Icon: Pencil, label: "Editar" }];

  const columns =
    "grid grid-cols-[0.2fr_1fr_0.5fr_1fr_0.4fr_0.4fr_0.4fr_0.4fr_0.2fr] items-center gap-x-4";

  return (
    <>
      {/* Escritorio */}
      <section className="bg-background border-border hidden rounded-lg border md:block">
        <ul
          className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {headers.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <ul className="[&>li]:not-first:border-border text-sm [&>li]:not-first:border-t">
          {products.map((product) => {
            return (
              <ProductItem
                key={`product-${product.id}`}
                product={product}
                columns={columns}
                actionsIcons={actionsIcons}
              />
            );
          })}
        </ul>
      </section>

      {/* Mobile */}
      <div className="grid gap-3 md:hidden">
        {products.map((product) => (
          <ProductItemMobile
            key={`product-mobile-${product.id}`}
            product={product}
          />
        ))}
      </div>
    </>
  );
};
