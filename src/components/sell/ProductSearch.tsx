import { SearchIcon } from "lucide-react";
import { NumberFormatter, TextInput } from "@mantine/core";

type SellMockProducts = {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
};

export const ProductSearch = () => {
  const PRODUCTS: SellMockProducts[] = [
    {
      id: 1,
      name: "Café Molido 500gr",
      category: "Bebidas",
      stock: 24,
      minStock: 5,
      price: 4500,
    },
    {
      id: 2,
      name: "Yerba Mate 1kg",
      category: "Bebidas",
      stock: 3,
      minStock: 5,
      price: 3200,
    },
    {
      id: 3,
      name: "Azúcar 1kg",
      category: "Almacén",
      stock: 40,
      minStock: 10,
      price: 1800,
    },
    {
      id: 4,
      name: "Galletitas de Agua",
      category: "Almacén",
      stock: 15,
      minStock: 6,
      price: 2100,
    },
    {
      id: 5,
      name: "Agua Mineral 2L",
      category: "Bebidas",
      stock: 30,
      minStock: 8,
      price: 1500,
    },
    {
      id: 6,
      name: "Aceite de Girasol 900ml",
      category: "Almacén",
      stock: 2,
      minStock: 4,
      price: 3900,
    },
  ];

  const handleSelectProduct = (product: SellMockProducts) => {
    // TODO: agregar el producto al carrito cuando el POS tenga estado real.
    void product;
  };

  return (
    <div className="border-border bg-card shadow-card rounded-xl border p-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <TextInput
          leftSection={<SearchIcon size={20} />}
          label="Buscar producto"
          placeholder="Escribí el nombre o categoría"
          aria-label="Buscar producto"
        />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {PRODUCTS.map((product) => {
          const isLowStock = product.stock <= product.minStock;

          return (
            <button
              key={`product-${product.id}`}
              onClick={() => handleSelectProduct(product)}
              className="border-border bg-surface hover:bg-background-soft flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors hover:cursor-pointer"
            >
              <div>
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-secondary-foreground truncate text-xs">
                  {product.category} - {product.stock} u.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {isLowStock && (
                  <span className="bg-warning/40 text-warning rounded-full px-2 py-0.5 text-xs font-medium">
                    bajo
                  </span>
                )}
                <NumberFormatter
                  prefix="$"
                  value={product.price}
                  thousandSeparator
                  className="text-sm font-semibold tabular-nums"
                />
              </div>
            </button>
          );
        })}

        {PRODUCTS.length === 0 && (
          <p className="text-secondary-foreground col-span-full py-6 text-center text-sm">
            Sin resultados para "busqueda".
          </p>
        )}
      </div>
    </div>
  );
};
