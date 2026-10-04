import { Pencil } from "lucide-react";

import { ProductItem } from "@/components/products/ProductItem";

export const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "Café Molido 500gr",
      imageUrl: "https://example.com/cafe-molido.jpg",
      category: "Almacen",
      description:
        "Café molido de alta calidad, ideal para preparar en cafetera o prensa francesa.",
      salePrice: 7850,
      costPrice: 5200,
      currentStock: 20,
      minStock: 10,
      active: true,
    },
    {
      id: 2,
      name: "Yerba Mate 1kg",
      imageUrl: "https://example.com/yerba-mate.jpg",
      category: "Almacen",
      description: "Yerba mate en grano, ideal para preparar en termo o pava.",
      salePrice: 6390,
      costPrice: 4500,
      currentStock: 5,
      minStock: 10,
      active: false,
    },
    {
      id: 3,
      name: "Agua saborizada 1.5lts",
      imageUrl: "https://example.com/agua-saborizada.jpg",
      category: "Bebidas",
      description:
        "Agua saborizada de 1.5 litros, ideal para consumir en cualquier momento.",
      salePrice: 1980,
      costPrice: 1200,
      currentStock: 12,
      minStock: 10,
      active: true,
    },
  ];

  const headers = [
    "Foto",
    "Producto",
    "Categoría",
    "Precio",
    "Stock",
    "Estado",
    "Acciones",
  ];

  const actionsIcons = [{ Icon: Pencil, label: "Editar" }];

  const columns =
    "grid grid-cols-[0.2fr_1fr_0.8fr_0.4fr_0.4fr_0.4fr_0.2fr] items-center gap-x-4";

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <ul
        className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
      >
        {headers.map((header) => (
          <li key={header}>{header}</li>
        ))}
      </ul>
      <ul>
        {products.map((product) => {
          return (
            <ProductItem
              key={`product-${product.id}`}
              product={product}
              columns={columns}
              actionsIcons={actionsIcons}
            />
          );
        })}
      </ul>
    </section>
  );
};
