import { Button, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UserPen, UserPlus, } from "lucide-react";
import { NewClientForm } from "@/components/clients/NewClientForm";

export function Clients() {

    const clients = [
        {
            name: "Ernesto",
            lastName: "Torres",
            dni: "25369870",
            address: "Av. Mitre 154",
            phoneNumber: "2346689878",
        },
        {
            name: "Analia",
            lastName: "Fanelli",
            dni: "37802564",
            address: "Guido 455",
            phoneNumber: "2346556010",
        },
        {
            name: "Carlos",
            lastName: "Bustos",
            dni: "28562314",
            address: "San Lorenzo 102",
            phoneNumber: "2346412567"
            
        }
    ];

    const rows = clients.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.lastName}</Table.Td>
             <Table.Td>{element.dni}</Table.Td>
            <Table.Td>{element.address}</Table.Td>
            <Table.Td>{element.phoneNumber}</Table.Td>
           
        </Table.Tr>
    ));

    const [opened, { open, close: closeModal }] = useDisclosure(false);

    return (
        <>
            <header className="border-border flex w-full items-center justify-between border-b p-4">
                <div>
                    <h1 className="text-xl font-semibold">Clientes</h1>
                    <p>() productos cargados</p>
                </div>
                <Button
                    leftSection={<UserPlus />}
                    onClick={open}
                    className="bg-primary rounded-md p-2 text-white"
                >
                    Nuevo Cliente
                </Button>
            </header>
            <Modal
                opened={opened}
                onClose={close}
                centered
                size="xl"
                transitionProps={{ transition: "fade-down", duration: 300 }}
                withCloseButton={false}
            >
                <header className="mb-4">
                    <div className="flex gap-2">
                        <UserPen className="text-primary" />
                        <p className="font-semibold">Nuevo Cliente</p>
                    </div>
                </header>
                <NewClientForm closeModal={closeModal} />
            </Modal>
            <Table.ScrollContainer minWidth={500} className="p-4">
          <Table className="border-background-soft mt-8 rounded-lg border">
            <Table.Thead className="bg-background-soft">
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Apellido</Table.Th>
                <Table.Th>DNI</Table.Th>
                <Table.Th>Direccion</Table.Th>
                <Table.Th>Telefono</Table.Th>
                
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        </>
    )

}
