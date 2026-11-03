import type { Category, CategoryRequest } from "@features/categories/types";

export const categoryMapper = {
  toForm: (category: Category): CategoryRequest => ({
    name: category.name,
    description: category.description ?? "",
  }),
};
