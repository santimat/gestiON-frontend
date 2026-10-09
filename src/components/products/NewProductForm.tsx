import {
  TextInput,
  NumberInput,
  Button,
  Select,
  FileInput,
} from "@mantine/core";
import type { UseDisclosureHandlers } from "@mantine/hooks";
import {
  CircleAlert,
  DollarSign,
  FileImage,
  LayersArrowUp,
  ListSortAscending,
  PackageIcon,
  SquareText,
} from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";

import { DEFAULT_PRODUCT_FORM } from "@/utils/constants";
import type { CurrentCommerce, Product, ProductForm } from "@/types";

type NewProductFormProps = {
  product: Product | null;
  closeModal: UseDisclosureHandlers["close"];
  currentCommerce: CurrentCommerce | null;
};

const mapToForm = (product: Product): ProductForm => ({
  name: product.name,
  description: product.description,
  category: product.category.name,
  costPrice: product.costPrice,
  salePrice: product.salePrice,
  currentStock: product.currentStock,
  minStock: product.minStock,
  image: null,
});

export function NewProductForm({
  product,
  currentCommerce,
  closeModal,
}: NewProductFormProps) {
  const isEditing = product !== null;

  const [productForm, setProductForm] = useState<ProductForm>(() =>
    product ? mapToForm(product) : DEFAULT_PRODUCT_FORM,
  );

  const profitMultiplier =
    product?.profitMultiplier ?? currentCommerce?.profitMultiplier ?? 1;
  const suggestedPrice =
    Math.round(productForm.salePrice * profitMultiplier * 100) / 100;

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  const handleClick = () => {
    closeModal();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNumberChange =
    (field: "costPrice" | "salePrice" | "currentStock" | "minStock") =>
    (value: string | number) => {
      const numericValue =
        typeof value === "number" ? value : Number(value) || 0;
      setProductForm((prevState) => ({ ...prevState, [field]: numericValue }));
    };

  return (
    <>
      <header className="mb-4">
        <div className="flex gap-2">
          <PackageIcon className="text-primary" />
          <p className="font-semibold">
            {isEditing ? "Editar Producto" : "Nuevo Producto"}
          </p>
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            leftSection={<PackageIcon size={20} />}
            name="name"
            label="Nombre del Producto"
            placeholder="Ej. Café Molido 500gr"
            value={productForm.name}
            onChange={handleChange}
            required
          />
          <Select
            label="Categoría"
            leftSection={<ListSortAscending size={20} />}
            placeholder="Seleccioná una categoría"
            data={["Almacén", "Bebidas", "Lácteos", "Limpieza", "Golosinas"]}
            value={productForm.category}
            onChange={(value) =>
              setProductForm((prevState) => ({
                ...prevState,
                category: value ?? "",
              }))
            }
            required
          />
          <FileInput
            label="Imagen del prducto"
            name="image"
            placeholder="Máximo de imagen 10MB"
            leftSection={<FileImage size={20} />}
            value={productForm.image}
            onChange={(file) =>
              setProductForm((prevState) => ({ ...prevState, image: file }))
            }
            leftSectionPointerEvents="none"
          />

          <TextInput
            leftSection={<SquareText size={20} />}
            name="description"
            label="Descripcion"
            placeholder="Agregue una breve descripcion del producto"
            value={productForm.description}
            onChange={handleChange}
            className="col-span-3"
          />

          <NumberInput
            leftSection={<DollarSign size={20} />}
            label="Precio de Costo"
            placeholder="0.00"
            prefix="$"
            min={0}
            decimalScale={2}
            value={productForm.costPrice}
            onChange={handleNumberChange("costPrice")}
            required
          />

          <NumberInput
            leftSection={<DollarSign size={20} />}
            label="Precio de Venta"
            placeholder="0.00"
            prefix="$"
            min={0}
            decimalScale={2}
            value={productForm.salePrice}
            onChange={handleNumberChange("salePrice")}
            required
          />

          <TextInput
            leftSection={<DollarSign size={20} />}
            label="Precio Sugerido"
            placeholder="0.00"
            prefix="$"
            value={productForm.salePrice > 0 ? suggestedPrice.toFixed(2) : ""}
            readOnly
            leftSectionPointerEvents="none"
          />

          <NumberInput
            leftSection={<LayersArrowUp size={20} />}
            label="Stock Inicial"
            placeholder="0"
            min={0}
            decimalScale={2}
            value={productForm.currentStock}
            onChange={handleNumberChange("currentStock")}
            required
          />
          <NumberInput
            label="Stock Minimo"
            placeholder="0"
            min={0}
            value={productForm.minStock}
            onChange={handleNumberChange("minStock")}
            required
            leftSection={<CircleAlert size={20} />}
          />
        </div>
        <div className="flex justify-end gap-4 pt-6">
          <Button className="bg-destructive!" onClick={handleClick}>
            Cancelar
          </Button>
          <Button type="submit">
            {isEditing ? "Guardar cambios" : "Agregar"}
          </Button>
        </div>
      </form>
    </>
  );
}
