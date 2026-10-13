import type { User } from "@/types";
import { Button, Switch } from "@mantine/core";
import { BuildingComplexIcon } from "lucide-react";

type CashiersListProps = {
  openModal: () => void;
  onEdit: (cashier: User) => void;
};

export const CashiersList = ({ openModal, onEdit }: CashiersListProps) => {
  const CASHIERS = [
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

  const HEADERS = ["Nombre", "Email", "Teléfono", "Alta", "Acceso"];

  const columns =
    "grid grid-cols-[72px_1fr_1fr_1.4fr_120px_90px_90px] items-center gap-x-4";

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <div>
        <div
          className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {HEADERS.map((header) => (
            <p key={header}>{header}</p>
          ))}
        </div>
        <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t">
          {CASHIERS.length ? (
            CASHIERS.map((cashier) => {
              return (
                <li key={`cashier-${cashier.email}`}>
                  <div className={columns}>
                    <p>{cashier.name}</p>
                    <p>{cashier.email}</p>
                    <p>{cashier.createdAt}</p>
                    <p>{cashier.status}</p>
                    <Switch />
                    <Button onClick={() => onEdit(cashier)}>Editar</Button>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="flex flex-col items-center gap-4 p-2">
              <p>Todavía no hay cajeros añadidos. Añade el primero.</p>
              <Button onClick={openModal} leftSection={<BuildingComplexIcon />}>
                Agregar cajero
              </Button>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
};
