import { useProductStore } from "@/stores/useProductStore";
import { useShallow } from "zustand/shallow";

export const useProduct = () => {
  const { products, editingProduct, createProduct, getProducts } =
    useProductStore(
      useShallow(
        ({ products, editingProduct, createProduct, getProducts }) => ({
          products,
          editingProduct,
          createProduct,
          getProducts,
        }),
      ),
    );

  return { products, editingProduct, createProduct, getProducts };
};
