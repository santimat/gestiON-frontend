import type { Product, ProductForm } from "@features/products/types";

export const productMapper = {
  toForm: (product: Product): ProductForm => ({
    name: product.name,
    description: product.description,
    categoryId: product.category.id,
    costPrice: product.costPrice,
    salePrice: product.salePrice,
    currentStock: product.currentStock,
    minStock: product.minStock,
    profitMultiplier: product.profitMultiplier,
    image: null,
  }),
};
