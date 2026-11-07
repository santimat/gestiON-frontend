import { lazy } from "react";

import type { Category } from "@features/categories/types";
import { EntityListShell } from "@shared/components/EntityListShell";

const CategoryItem = lazy(() =>
  import("@features/categories/components/CategoryItem").then((module) => ({
    default: module.CategoryItem,
  })),
);

const CategoryItemMobile = lazy(() =>
  import("@features/categories/components/CategoryItemMobile").then(
    (module) => ({
      default: module.CategoryItemMobile,
    }),
  ),
);

type CategoryListProps = {
  categories: Category[];
};

const HEADERS = ["Categoría", "Descripción", "Productos", "Creada", "Acciones"];

const COLUMNS =
  "grid grid-cols-[1fr_1.2fr_0.5fr_0.5fr_0.3fr] items-center gap-x-4";

export const CategoryList = ({ categories }: CategoryListProps) => (
  <EntityListShell
    items={categories}
    getKey={(category) => category.id}
    headers={HEADERS}
    columns={COLUMNS}
    renderMobile={(category) => <CategoryItemMobile category={category} />}
    renderDesktop={(category) => (
      <CategoryItem category={category} columns={COLUMNS} />
    )}
  />
);
