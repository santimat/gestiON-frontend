import { QrCode, Pencil, Trash } from "lucide-react";
import { ActionIcon, Table, TextInput, Select, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NewProductForm } from "./NewProductForm";


export function Products() {

    const products = [
        { product: "Café Molido 500gr", category: "Almacen", price: "$7850", stock: "24/8", status: "En stock" },
        { product: "Yerba Mate 1kg", category: "Almacen", price: "$6390", stock: "5/10", status: "Stock bajo" },
        { product: "Agua saborizada 1.5lts", category: "Bebidas", price: "$1980", stock: "48/12", status: "En stock" }
    ]

    const actionsIcons = [
        { Icon: QrCode, label: "Etiquetas" },
        { Icon: Pencil, label: "Editar" },
        { Icon: Trash, label: "Eliminar" }
    ]

    const [opened, { open, close }] = useDisclosure(false)

    const rows = products.map((products) => (
        <Table.Tr key={products.product}>
            <Table.Td>{products.product}</Table.Td>
            <Table.Td>{products.category}</Table.Td>
            <Table.Td>{products.price}</Table.Td>
            <Table.Td>{products.stock}</Table.Td>
            <Table.Td>{products.status}</Table.Td>
            <Table.Td>
                <ActionIcon.Group>{actionsIcons.map((action, index) => (
                    <ActionIcon key={index} variant="default" >
                        <action.Icon className=" bg-white size-4 hover:bg-background-soft" />
                        {/* aca hay que mejorar el hover */}
                    </ActionIcon>
                ))}</ActionIcon.Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <aside>
            <header className='flex items-center justify-between w-full p-4 border-b border-background-soft'>
                <div>
                    <h2 className="font-semibold text-xl">Productos</h2>
                    <p>() productos cargados</p>
                </div>
                <Button onClick={open} className=' bg-primary rounded-md p-2 text-white'>
                    + Nuevo Producto</Button>

                <Modal
                    opened={opened}
                    onClose={close}
                    title={
                        <div>
                            <h3 className="font-semibold text-xl">Productos</h3>
                            <p className="text-sm">Definí precio y stock mínimo para que el sistema avise cuando haya que reponer.</p>
                        </div>
                    }
                    centered
                >
                    <NewProductForm onSuccess={close} onCancel={close} />
                </Modal>
            </header>

            {/* Aca faltaria el cartel de alerta de stock */}

            <div className="flex items-center gap-4 w-full p-6">
                <div className="flex-1">
                    <TextInput placeholder=" Buscar por nombre o codigo" />
                </div>
                <div className="w-64 border-background-soft">
                    <Select
                        placeholder="Seleccione Categoria"
                        data={['Almacen', 'Bebidas', 'Perfumeria', 'Limpieza']} />
                </div>
            </div>

            <Table.ScrollContainer minWidth={500} className='p-4'>
                <Table className='border border-background-soft mt-8 rounded-lg'>
                    <Table.Thead className='bg-background-soft'>
                        <Table.Tr>
                            <Table.Th>Producto</Table.Th>
                            <Table.Th>Categoria</Table.Th>
                            <Table.Th>Precio</Table.Th>
                            <Table.Th>Stock</Table.Th>
                            <Table.Th>Estado</Table.Th>
                            <Table.Th>Acciones</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>

        </aside>
    );
}