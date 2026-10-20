import {
  BuildingComplexPlus,
  CircleCheck,
  StoreIcon,
  UsersIcon,
} from "lucide-react";
import { Button, Modal } from "@mantine/core";
import { lazy, useEffect } from "react";

import { useCommerce } from "@/hooks/useCommerce";
import { CommerceList } from "@/components/commerces/CommerceList";
import { CommerceStatsCard } from "@/components/commerces/CommerceStatsCard";

const NewCommerceForm = lazy(() =>
  import("@/components/commerces/NewCommerceForm").then((module) => ({
    default: module.NewCommerceForm,
  })),
);

export const Commerces = () => {
  const {
    commerceStats,
    getCommercesWithOwner,
    getCommerceStats,
    formCommerce,
    isFormModalOpen,
    openCreate,
    closeFormModal,
  } = useCommerce();

  useEffect(() => {
    getCommerceStats();
    getCommercesWithOwner();
    // Al desmontar la sección dejamos el modal del form cerrado y sin comercio cargado.
    return () => closeFormModal();
  }, [getCommercesWithOwner, getCommerceStats, closeFormModal]);

  return (
    <>
      <Modal
        opened={isFormModalOpen}
        onClose={closeFormModal}
        withCloseButton={false}
        centered
        size="xl"
        transitionProps={{ transition: "fade-down", duration: 300 }}
      >
        <NewCommerceForm
          key={formCommerce?.commerceId ?? "create"}
          commerce={formCommerce}
          closeModal={closeFormModal}
        />
      </Modal>

      <header className="border-border flex items-center justify-between gap-2 border-b p-4">
        <div>
          <h1 className="text-3xl font-bold">Comercios</h1>
          <p className="text-secondary-foreground">
            Gestión de comercios y registro de comercios.
          </p>
        </div>
        <Button onClick={openCreate} leftSection={<BuildingComplexPlus />}>
          Agregar comercio
        </Button>
      </header>

      <main className="flex flex-col gap-8 p-6">
        <div className="grid grid-cols-3 gap-4">
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
        </div>
        <CommerceList />
      </main>
    </>
  );
};
