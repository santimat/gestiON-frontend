import { Pencil } from "lucide-react";
import { Button } from "@mantine/core";
import type { Category } from "@/types";
import { useCategory } from "@/hooks/useCategory";

type CategoryItemMobileProps = {
  category: Category;
};

export const CategoryItemMobile = ({ category }: CategoryItemMobileProps) => {
  const { openEdit } = useCategory();

  return (
    <div
      key={`category-mobile-${category.id}`}
      className="border-border bg-card shadow-card flex flex-col rounded-xl border p-4"
    >
      <div className="flex items-start gap-3">
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
          onClick={() => openEdit(category)}
        >
          <Pencil size={14} />
          Editar
        </Button>
      </div>
    </div>
  );
};
