import { useProduct } from "@/hooks/useProduct";
import {
  TextInput,
  NumberInput,
  Button,
  Stack,
  Select,
  Group,
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

type NewProductFormProps = {
  closeModal: UseDisclosureHandlers["close"];
};

export function NewProductForm({ closeModal }: NewProductFormProps) {
  const { editingProduct } = useProduct();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Producto guardado");
  };

  const handleClick = () => {
    closeModal();
  };

  return (
    <>
      <header className="mb-4">
        <div className="flex gap-2">
          <PackageIcon className="text-primary" />
          <p className="font-semibold">Nuevo Producto</p>
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            leftSection={<PackageIcon size={20} />}
            name="name"
            label="Nombre del Producto"
            placeholder="Ej. Café Molido 500gr"
            required
          />
          <Select
            label="Categoría"
            leftSection={<ListSortAscending size={20} />}
            placeholder="Seleccioná una categoría"
            data={["Almacén", "Bebidas", "Lácteos", "Limpieza", "Golosinas"]}
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
            className="col-span-3"
          />

          <TextInput
            leftSection={<DollarSign size={20} />}
            type="number"
            label="Precio"
            placeholder="0.00"
            prefix="$"
            min={0}
            required
          />

          <NumberInput
            leftSection={<LayersArrowUp size={20} />}
            label="Stock Inicial"
            placeholder="0"
            min={0}
            decimalScale={2}
            required
          />
          <NumberInput
            label="Stock Minimo"
            placeholder="0"
            min={0}
            required
            leftSection={<CircleAlert size={20} />}
          />
        </div>
        <div className="flex justify-end gap-4 pt-6">
          <Button className="bg-destructive!" onClick={handleClick}>
            Cancelar
          </Button>
          <Button type="submit">Agregar</Button>
        </div>
      </form>
    </>
  );
}
