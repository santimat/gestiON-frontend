export function ProductList() {
  const products = [
    {
      id: 1,
      name: "Café Molido 500gr",
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

  const columns =
    "grid grid-cols-[1fr_0.8fr_0.3fr_0.3fr_0.3fr_0.8fr] items-center gap-x-4";

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <ul
        className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
      >
        <li>Producto</li>
        <li>Categoría</li>
        <li>Precio</li>
        <li>Stock</li>
        <li>Estado</li>
        <li>Acciones</li>
      </ul>
      <ul>
        {products.map((product) => {
          return (
            <li className={`p-2 ${columns}`}>
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>{product.salePrice}</p>
              <p>{product.currentStock}</p>
              <Switch />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
