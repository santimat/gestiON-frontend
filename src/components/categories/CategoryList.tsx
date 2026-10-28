import { lazy } from "react";

import type { Category } from "@/types";

const CategoryItem = lazy(() =>
  import("@/components/categories/CategoryItem").then((module) => ({
    default: module.CategoryItem,
  })),
);

const CategoryItemMobile = lazy(() =>
  import("@/components/categories/CategoryItemMobile").then((module) => ({
    default: module.CategoryItemMobile,
  })),
);

type CategoryListProps = {
  categories: Category[];
};

const HEADERS = ["Categoría", "Descripción", "Productos", "Creada", "Acciones"];

const COLUMNS =
  "grid grid-cols-[1fr_1.2fr_0.5fr_0.5fr_0.3fr] items-center gap-x-4";

export const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <>
      {/* Desktop */}
      <section className="bg-background border-border hidden overflow-hidden rounded-lg border md:block">
        <ul className="border-border text-secondary-foreground grid grid-cols-[1fr_1.2fr_0.5fr_0.5fr_0.3fr] items-center gap-x-4 border-b p-2 text-sm">
          {HEADERS.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t text-sm">
          {categories.map((category) => (
            <CategoryItem
              key={`category-${category.id}`}
              category={category}
              columns={COLUMNS}
            />
          ))}
        </ul>
      </section>

      {/* Mobile */}
      <div className="grid gap-3 md:hidden">
        {categories.map((category) => (
          <CategoryItemMobile
            key={`category-mobile-${category.id}`}
            category={category}
          />
        ))}
      </div>
    </>
  );
};
