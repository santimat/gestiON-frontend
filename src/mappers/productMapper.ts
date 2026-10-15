import type { Product, ProductForm } from "@/types";

export const productMapper = {
  mapToForm: (product: Product): ProductForm => ({
    name: product.name,
    description: product.description,
    categoryId: product.category.id,
    costPrice: product.costPrice,
    salePrice: product.salePrice,
    currentStock: product.currentStock,
    minStock: product.minStock,
    image: null,
  }),
};
