import { useProductStore } from "@/stores/useProductStore";
import { useShallow } from "zustand/shallow";

export const useProduct = () => {
  const { products, editingProduct } = useProductStore(
    useShallow(({ products, editingProduct }) => ({
      products,
      editingProduct,
    })),
  );
  return { products, editingProduct };
};
