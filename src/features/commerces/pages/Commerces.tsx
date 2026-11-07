import {
  BuildingComplexPlus,
  CircleCheck,
  StoreIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "@mantine/core";
import { lazy, useEffect } from "react";

import { useCommerce } from "@features/commerces/hooks/useCommerce";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { ListContainer } from "@shared/components/ListContainer";
import { EntityFormModal } from "@shared/components/EntityFormModal";
import { CommerceList } from "@features/commerces/components/CommerceList";
import { CommerceStatsCard } from "@features/commerces/components/CommerceStatsCard";

const CommerceForm = lazy(() =>
  import("@features/commerces/components/CommerceForm").then((module) => ({
    default: module.CommerceForm,
  })),
);

export const Commerces = () => {
  const {
    commerceStats,
    commercesWithOwner,
    isLoading,
    error,
    formCommerce,
    isFormModalOpen,
    getCommercesWithOwner,
    getCommerceStats,
    openCreate,
    closeFormModal,
  } = useCommerce();

  useEffect(() => {
    getCommerceStats();
    getCommercesWithOwner();
    // Al desmontar la sección dejamos el modal del form cerrado y sin comercio cargado.
    return () => closeFormModal();
  }, [getCommercesWithOwner, getCommerceStats, closeFormModal]);

  usePageHeader({
    title: "Comercios",
    subtitle: "Gestión de comercios y registro de comercios.",
    actions: (
      <Button onClick={openCreate} leftSection={<BuildingComplexPlus />}>
        <span className="hidden sm:inline">Agregar comercio</span>
      </Button>
    ),
  });

  return (
    <>
      <EntityFormModal
        opened={isFormModalOpen}
        closeModal={closeFormModal}
        entityKey={formCommerce?.commerceId ?? "create"}
      >
        <CommerceForm commerce={formCommerce} closeModal={closeFormModal} />
      </EntityFormModal>

      <main className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={commercesWithOwner.length === 0}
          icon={StoreIcon}
          emptyMessage="No hay comercios para mostrar"
        >
          <CommerceList commercesWithOwner={commercesWithOwner} />
        </ListContainer>
      </main>
    </>
  );
};
