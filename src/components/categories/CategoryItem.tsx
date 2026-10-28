import { Pencil } from "lucide-react";

import type { Category } from "@/types";
import { useCategory } from "@/hooks/useCategory";
import { Tooltip } from "@mantine/core";

type CategoryItemProps = {
  category: Category;
  columns: string;
};

export const CategoryItem = ({ category, columns }: CategoryItemProps) => {
  const updatedAt = new Date(category.updatedAt).toLocaleDateString("es-AR");
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
        <button
          aria-label={`Editar ${category.name}`}
          title="Editar"
          onClick={() => openEdit(category)}
          className="hover:bg-background-soft rounded-md p-2 transition-transform hover:scale-110 hover:cursor-pointer active:scale-95"
        >
          <Pencil pointerEvents="none" size={20} />
        </button>
      </div>
    </li>
  );
};
