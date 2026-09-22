import {
	TextInput,
	NumberInput,
	Button,
	Stack,
	Select,
	Group,
} from "@mantine/core";
import type { SubmitEvent } from "react";

interface NewProductFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
}

export function NewProductForm({ onSuccess, onCancel }: NewProductFormProps) {
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		console.log("Producto guardado");

		// Cierra el modal tras guardar con éxito
		if (onSuccess) onSuccess();
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack gap="md">
				<TextInput
					label="Nombre del Producto"
					placeholder="Ej. Café Molido 500gr"
					required
				/>
				<TextInput
					label="Descripcion"
					placeholder="Agregue una breve descripcion del producto"
				/>

				<Group grow gap="md">
					<NumberInput
						label="Precio"
						placeholder="0.00"
						prefix="$"
						min={0}
						decimalScale={2}
						required
					/>
					<Select
						label="Categoría"
						placeholder="Seleccioná una categoría"
						data={["Almacén", "Bebidas", "Lácteos", "Limpieza", "Golosinas"]}
						required
					/>
				</Group>

				<Group grow gap="md">
					<NumberInput
						label="Stock Inicial"
						placeholder="0"
						min={0}
						decimalScale={2}
						required
					/>
					<NumberInput label="Stock Minimo" placeholder="0" min={0} required />
				</Group>

				{/* Botones de acción: Cancelar y Guardar */}
				<Group justify="flex-end" gap="sm" mt="md">
					<Button
						variant="default"
						onClick={onCancel || onSuccess}
						type="button"
					>
						Cancelar
					</Button>
					<Button type="submit" color="blue">
						Guardar Producto
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
