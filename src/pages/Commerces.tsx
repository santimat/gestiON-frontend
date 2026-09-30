import {
  BuildingComplex,
  BuildingComplexPlus,
  CircleCheck,
  StoreIcon,
  UsersIcon,
} from "lucide-react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { CommerceList } from "@/components/commerces/CommerceList";
import { NewCommerceForm } from "@/components/commerces/NewCommerceForm";
import { CommerceStatsCard } from "@/components/commerces/CommerceStatsCard";
import { useCommerce } from "@/hooks/useCommerce";
import { useEffect } from "react";

export function Commerces() {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const { commerceStats, getCommercesWithOwner, getCommerceStats } =
    useCommerce();

  useEffect(() => {
    getCommerceStats();
    getCommercesWithOwner();
  }, [getCommercesWithOwner, getCommerceStats]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        withCloseButton={false}
        centered
        size="xl"
        transitionProps={{ transition: "fade-down", duration: 300 }}
      >
        <header className="mb-4">
          <div className="flex gap-2">
            <BuildingComplex className="text-primary" />
            <p className="font-semibold">Nuevo Comercio</p>
          </div>
        </header>
        <NewCommerceForm closeModal={closeModal} />
      </Modal>

      <header className="border-border flex items-center justify-between gap-2 border-b p-4">
        <div>
          <h1 className="text-3xl font-bold">Comercios</h1>
          <p className="text-secondary-foreground">
            Gestión de comercios y registro de comercios.
          </p>
        </div>
        <Button onClick={openModal} leftSection={<BuildingComplexPlus />}>
          Agregar comercio
        </Button>
      </header>
      <main className="mx-auto grid max-w-300 grid-cols-3 gap-4 p-6">
        <CommerceStatsCard
          section="Comercios registrados"
          quantity={commerceStats?.total || 0}
          description="Total en la plataforma"
          icon={{
            iconName: StoreIcon,
            iconClasses: "text-primary bg-primary/40",
          }}
        />
        <CommerceStatsCard
          section="Activos"
          quantity={commerceStats?.active || 0}
          description="Operando actualmente"
          icon={{
            iconName: CircleCheck,
            iconClasses: "text-success bg-success/40",
          }}
        />
        <CommerceStatsCard
          section="Inactivos"
          quantity={commerceStats?.inactive || 0}
          description="Dados de baja"
          icon={{
            iconName: UsersIcon,
            iconClasses: "text-warning bg-warning/40",
          }}
        />
        <CommerceList openModal={openModal} />
      </main>
    </>
  );
}
