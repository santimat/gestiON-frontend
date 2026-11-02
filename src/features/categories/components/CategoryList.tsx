import { lazy } from "react";

import { useIsMobile } from "@shared/hooks/useMediaQuery";
import type { Category } from "../types";

const CategoryItem = lazy(() =>
  import("./CategoryItem").then((module) => ({
    default: module.CategoryItem,
  })),
);

const CategoryItemMobile = lazy(() =>
  import("./CategoryItemMobile").then((module) => ({
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
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="grid gap-3">
        {categories.map((category) => (
          <CategoryItemMobile
            key={`category-mobile-${category.id}`}
            category={category}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="bg-card border-background-soft overflow-hidden rounded-lg border">
        <ul className="border-background-soft text-secondary-foreground grid grid-cols-[1fr_1.2fr_0.5fr_0.5fr_0.3fr] items-center gap-x-4 border-b p-2 text-sm">
          {HEADERS.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <ul className="[&>li]:not-first:border-background-soft text-sm [&>li]:not-first:border-t">
          {categories.map((category) => (
            <CategoryItem
              key={`category-${category.id}`}
              category={category}
              columns={COLUMNS}
            />
          ))}
        </ul>
      </section>
    </>
  );
};
