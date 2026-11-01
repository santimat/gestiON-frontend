import type { Category, CategoryRequest } from "@/types";

export const categoryMapper = {
  toForm: (category: Category): CategoryRequest => ({
    name: category.name,
    description: category.description ?? "",
  }),
};
