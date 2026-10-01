import {
  BuildingComplexPlus,
  CircleCheck,
  StoreIcon,
  UsersIcon,
} from "lucide-react";
import { lazy, useEffect } from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useCommerce } from "@/hooks/useCommerce";
import { CommerceList } from "@/components/commerces/CommerceList";
import { CommerceStatsCard } from "@/components/commerces/CommerceStatsCard";

const NewCommerceForm = lazy(() =>
  import("@/components/commerces/NewCommerceForm").then((module) => ({
    default: module.NewCommerceForm,
  })),
);

export function Commerces() {
  const [opened, { open: openModal, close }] = useDisclosure(false);
  const { commerceStats, getCommercesWithOwner, getCommerceStats, endEditing } =
    useCommerce();

  useEffect(() => {
    getCommerceStats();
    getCommercesWithOwner();
  }, [getCommercesWithOwner, getCommerceStats]);

  const closeModal = () => {
    close();
    endEditing();
  };

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
