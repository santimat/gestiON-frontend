import { Table } from "@mantine/core";
import { Switch } from "@mantine/core";

export function Cashiers() {
	const elements = [
		{
			name: "Martina Ríos",
			email: "martina@donpepe.com",
			createdAt: "12/03/2026",
			status: "Activo",
			access: true,
		},
		{
			name: "Julián Ferreyra",
			email: "julian@donpepe.com",
			createdAt: "02/04/2026",
			status: "Activo",
			access: true,
		},
		{
			name: "Camila Ledesma",
			email: "camila@donpepe.com",
			createdAt: "18/01/2026",
			status: "Inactivo",
			access: false,
		},
	];

	const rows = elements.map((element) => (
		<Table.Tr key={element.name}>
			<Table.Td>{element.name}</Table.Td>
			<Table.Td>{element.email}</Table.Td>
			<Table.Td>{element.createdAt}</Table.Td>
			<Table.Td>{element.status}</Table.Td>
			<Table.Td>
				<Switch defaultChecked={element.access} label="" />
			</Table.Td>
		</Table.Tr>
	));

	return (
		<>
			<header className="flex items-center justify-between w-full p-4 border-b border-background-soft">
				<div>
					<h1 className="font-semibold text-xl">Cajeros</h1>
					<p>() activos de () usuarios</p>
				</div>
				<button className=" bg-primary rounded-md p-2 text-white">
					+ Nuevo Cajero
				</button>
			</header>

			<Table.ScrollContainer minWidth={500} className="p-4">
				<Table className="border border-background-soft mt-8 rounded-lg">
					<Table.Thead className="bg-background-soft">
						<Table.Tr>
							<Table.Th>Nombre</Table.Th>
							<Table.Th>Email</Table.Th>
							<Table.Th>Alta</Table.Th>
							<Table.Th>Estado</Table.Th>
							<Table.Th>Acceso</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</>
	);
}
