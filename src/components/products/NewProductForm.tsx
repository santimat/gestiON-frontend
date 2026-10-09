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
import type { SubmitEvent } from "react";

import type { Product } from "@/types";

type NewProductFormProps = {
  product: Product | null;
  closeModal: UseDisclosureHandlers["close"];
};

export function NewProductForm({ product, closeModal }: NewProductFormProps) {
  const isEditing = product !== null;

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  const handleClick = () => {
    closeModal();
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
            defaultValue={product?.name}
            required
          />
          <Select
            label="Categoría"
            leftSection={<ListSortAscending size={20} />}
            placeholder="Seleccioná una categoría"
            data={["Almacén", "Bebidas", "Lácteos", "Limpieza", "Golosinas"]}
            defaultValue={product?.category}
            required
          />
          <FileInput
            label="Imagen del prducto"
            name="image"
            placeholder="Máximo de imagen 10MB"
            leftSection={<FileImage size={20} />}
            leftSectionPointerEvents="none"
          />

          <TextInput
            leftSection={<SquareText size={20} />}
            name="description"
            label="Descripcion"
            placeholder="Agregue una breve descripcion del producto"
            defaultValue={product?.description}
            className="col-span-3"
          />

          <TextInput
            leftSection={<DollarSign size={20} />}
            type="number"
            label="Precio de Costo"
            placeholder="0.00"
            prefix="$"
            min={0}
            defaultValue={product?.costPrice}
            required
          />

          <TextInput
            leftSection={<DollarSign size={20} />}
            type="number"
            label="Precio de Venta"
            placeholder="0.00"
            prefix="$"
            min={0}
            defaultValue={product?.salePrice}
            required
          />
          <TextInput
            leftSection={<DollarSign size={20} />}
            type="number"
            label="Precio de Venta"
            placeholder="0.00"
            prefix="$"
            min={0}
            defaultValue={product?.salePrice}
            required
          />

          <NumberInput
            leftSection={<LayersArrowUp size={20} />}
            label="Stock Inicial"
            placeholder="0"
            min={0}
            decimalScale={2}
            defaultValue={product?.currentStock}
            required
          />
          <NumberInput
            label="Stock Minimo"
            placeholder="0"
            min={0}
            defaultValue={product?.minStock}
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
