import { lazy } from "react";
import { Pencil } from "lucide-react";

import type { Product } from "@features/products/types";
import { EntityListShell } from "@shared/components/EntityListShell";

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

const HEADERS = [
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

const COLUMNS =
  "grid grid-cols-[0.2fr_1fr_0.5fr_1fr_0.4fr_0.4fr_0.4fr_0.4fr_0.2fr] items-center gap-x-4";

const ACTIONS_ICONS = [{ Icon: Pencil, label: "Editar" }];

export const ProductList = ({ products }: ProductListProps) => (
  <EntityListShell
    items={products}
    getKey={(product) => product.id}
    headers={HEADERS}
    columns={COLUMNS}
    renderMobile={(product) => <ProductItemMobile product={product} />}
    renderDesktop={(product) => (
      <ProductItem
        product={product}
        columns={COLUMNS}
        actionsIcons={ACTIONS_ICONS}
      />
    )}
  />
);
