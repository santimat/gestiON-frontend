import { Pencil } from "lucide-react";

import type { Category } from "@features/categories/types";
import { useCategory } from "@features/categories/hooks/useCategory";
import { ProductItemActions } from "@shared/components/ProductItemActions";
import { formatDate } from "@shared/utils/dates";
import { Tooltip } from "@mantine/core";

type CategoryItemProps = {
  category: Category;
  columns: string;
};

export const CategoryItem = ({ category, columns }: CategoryItemProps) => {
  const updatedAt = formatDate(category.updatedAt);
  const { openEdit } = useCategory();
  return (
    <li className={`p-2 ${columns}`}>
      <p className="font-medium">{category.name}</p>
      <Tooltip label={category.description} position="bottom" withArrow>
        <p className="line-clamp-1 text-gray-500">
          {category.description || "----"}
        </p>
      </Tooltip>
      <p className="text-gray-500">{category.productCount} productos</p>
      <p className="text-gray-500">{updatedAt}</p>
      <div className="justify-center">
        <ProductItemActions
          actionsIcons={[{ Icon: Pencil, label: `Editar ${category.name}` }]}
          onEdit={() => openEdit(category)}
        />
      </div>
    </li>
  );
};
