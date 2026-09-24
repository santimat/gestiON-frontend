
import { TextInput, Button, Stack, Group} from '@mantine/core';

interface NewClientFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function NewClientForm({ onSuccess, onCancel }: NewClientFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Cliente registrado");

        // Cierra el modal tras guardar con éxito
        if (onSuccess) onSuccess();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap='md'>
                <TextInput
                    label="Nombre"
                    placeholder="Mariana Rios"
                />
                <TextInput
                    label="Apellido"
                    placeholder="martina@comercio.com"
                />
                <TextInput
                    label="Direccion"
                    placeholder='Dorrego 236'
                />
                <TextInput
                    label="telefono"
                    placeholder='2346589631'
                />
                <TextInput
                    label="DNI"
                    placeholder='35264875'
                />

                <Group justify="flex-end" gap="sm" mt="md">
                    <Button
                        variant="default"
                        onClick={onCancel || onSuccess}
                        type="button"
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" color="blue">
                        Guardar Cliente
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}