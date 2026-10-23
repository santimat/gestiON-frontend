import { Pencil, Trash2 } from "lucide-react";

import type { Category } from "@/types";

type CategoryItemProps = {
  category: Category & { createdAt: Date; productCount: number };
  columns: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const CategoryItem = ({
  category,
  columns,
  onEdit,
  onDelete,
}: CategoryItemProps) => {
  const createdAt = new Date(category.createdAt).toLocaleDateString("es-AR");

  return (
    <li className={`p-2 ${columns}`}>
      <p className="font-medium">{category.name}</p>
      <p className="line-clamp-1 text-gray-500">
        {category.description || "----"}
      </p>
      <p className="tabular-nums">{category.productCount}</p>
      <p className="text-gray-500">{createdAt}</p>
      <div className="justify-center">
        <button
          aria-label={`Editar ${category.name}`}
          title="Editar"
          onClick={onEdit}
          className="hover:bg-background-soft rounded-md p-2 transition-transform hover:scale-110 hover:cursor-pointer active:scale-95"
        >
          <Pencil pointerEvents="none" size={20} />
        </button>
        <button
          aria-label={`Eliminar ${category.name}`}
          title="Eliminar"
          onClick={onDelete}
          className="text-destructive hover:bg-background-soft rounded-md p-2 transition-transform hover:scale-110 hover:cursor-pointer active:scale-95"
        >
          <Trash2 pointerEvents="none" size={20} />
        </button>
      </div>
    </li>
  );
};
