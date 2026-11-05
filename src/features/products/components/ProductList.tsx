import { lazy } from "react";
import { Pencil } from "lucide-react";

import { useIsMobile } from "@shared/hooks/useMediaQuery";
import type { Product } from "@features/products/types";

const ProductItem = lazy(() =>
  import("@features/products/components/ProductItem").then((module) => ({
    default: module.ProductItem,
  })),
);

const ProductItemMobile = lazy(() =>
  import("@features/products/components/ProductItemMobile").then((module) => ({
    default: module.ProductItemMobile,
  })),
);

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

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="grid gap-3">
        {products.map((product) => (
          <ProductItemMobile
            key={`product-mobile-${product.id}`}
            product={product}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="bg-card border-background-soft rounded-lg border">
        <ul
          className={`border-background-soft text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {headers.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <ul className="[&>li]:not-first:border-background-soft text-sm [&>li]:not-first:border-t">
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
    </>
  );
};
