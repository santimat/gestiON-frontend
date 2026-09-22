import {
  TextInput,
  NumberInput,
  Button,
  Stack,
  Select,
  Group,
} from "@mantine/core";
import type { UseDisclosureHandlers } from "@mantine/hooks";

import {
  CircleAlert,
  DollarSign,
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
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Producto guardado");
  };

  const handleClick = () => {
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          leftSection={<PackageIcon size={20} />}
          name="name"
          label="Nombre del Producto"
          placeholder="Ej. Café Molido 500gr"
          required
        />
        <TextInput
          leftSection={<SquareText size={20} />}
          name="description"
          label="Descripcion"
          placeholder="Agregue una breve descripcion del producto"
        />

        <Group grow gap="md">
          <TextInput
            leftSection={<DollarSign size={20} />}
            type="number"
            label="Precio"
            placeholder="0.00"
            prefix="$"
            min={0}
            required
          />
          <Select
            label="Categoría"
            leftSection={<ListSortAscending size={20} />}
            placeholder="Seleccioná una categoría"
            data={["Almacén", "Bebidas", "Lácteos", "Limpieza", "Golosinas"]}
            required
          />
        </Group>

        <Group grow gap="md">
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
        </Group>

        <div className="flex justify-end gap-4">
          <Button className="bg-destructive!" onClick={handleClick}>
            Cancelar
          </Button>
          <Button type="submit">Agregar</Button>
        </div>
      </Stack>
    </form>
  );
}
