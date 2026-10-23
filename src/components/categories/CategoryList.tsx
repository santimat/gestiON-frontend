import { Pencil, Tags, Trash2 } from "lucide-react";
import { Button } from "@mantine/core";

import { CategoryItem } from "@/components/categories/CategoryItem";
import type { Category } from "@/types";

type CategoryListProps = {
  categories: (Category & { createdAt: Date; productCount: number })[];
  onEdit: (
    category: Category & { createdAt: Date; productCount: number },
  ) => void;
  onDelete: (
    category: Category & { createdAt: Date; productCount: number },
  ) => void;
};

const HEADERS = ["Categoría", "Descripción", "Productos", "Creada", "Acciones"];

const COLUMNS =
  "grid grid-cols-[1fr_1.2fr_0.5fr_0.5fr_0.3fr] items-center gap-x-4";

export const CategoryList = ({
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) => {
  return (
    <>
      {/* Desktop */}
      <section className="bg-background border-border hidden overflow-hidden rounded-lg border md:block">
        <ul className="border-border text-secondary-foreground grid grid-cols-[1fr_1.2fr_0.5fr_0.5fr_0.3fr] items-center gap-x-4 border-b p-2 text-sm">
          {HEADERS.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t">
          {categories.map((category) => (
            <CategoryItem
              key={`category-${category.id}`}
              category={category}
              columns={COLUMNS}
              onEdit={() => onEdit(category)}
              onDelete={() => onDelete(category)}
            />
          ))}
        </ul>
        {categories.length === 0 && (
          <p className="text-secondary-foreground px-4 py-10 text-center text-sm">
            No hay categorías.
          </p>
        )}
      </section>

      {/* Mobile */}
      <div className="grid gap-3 md:hidden">
        {categories.map((category) => (
          <div
            key={`category-mobile-${category.id}`}
            className="border-border bg-card shadow-card flex flex-col rounded-xl border p-4"
          >
            <div className="flex items-start gap-3">
              <div className="bg-primary/40 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Tags className="text-primary" size={16} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{category.name}</p>
                <p className="text-secondary-foreground text-xs">
                  {category.productCount} productos
                  {category.description ? ` · ${category.description}` : ""}
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(category)}
              >
                <Pencil size={14} />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onDelete(category)}
              >
                <Trash2 className="text-destructive" size={14} />
                Eliminar
              </Button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-secondary-foreground py-10 text-center text-sm">
            No hay categorías.
          </p>
        )}
      </div>
    </>
  );
};
