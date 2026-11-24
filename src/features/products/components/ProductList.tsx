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
  canManage: boolean;
};

const READONLY_HEADERS = [
  "Foto",
  "Producto",
  "Categoría",
  "Descripción",
  "Precio",
  "Stock Actual",
  "Stock Mínimo",
  "Estado",
];

const HEADERS = [...READONLY_HEADERS, "Acciones"];

const READONLY_COLUMNS =
  "grid grid-cols-[0.2fr_1fr_0.5fr_1fr_0.4fr_0.4fr_0.4fr_0.4fr] items-center gap-x-4";

const COLUMNS =
  "grid grid-cols-[0.2fr_1fr_0.5fr_1fr_0.4fr_0.4fr_0.4fr_0.4fr_0.2fr] items-center gap-x-4";

const ACTIONS_ICONS = [{ Icon: Pencil, label: "Editar" }];

export const ProductList = ({ products, canManage }: ProductListProps) => {
  const headers = canManage ? HEADERS : READONLY_HEADERS;
  const columns = canManage ? COLUMNS : READONLY_COLUMNS;

  return (
    <EntityListShell
      items={products}
      getKey={(product) => product.id}
      headers={headers}
      columns={columns}
      renderMobile={(product) => (
        <ProductItemMobile product={product} canManage={canManage} />
      )}
      renderDesktop={(product) => (
        <ProductItem
          product={product}
          columns={columns}
          actionsIcons={ACTIONS_ICONS}
          canManage={canManage}
        />
      )}
    />
  );
};
