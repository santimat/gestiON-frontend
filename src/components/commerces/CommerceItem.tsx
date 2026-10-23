import { toast } from "sonner";
import { PenBoxIcon } from "lucide-react";
import { Avatar, Button, Switch } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { useCommerce } from "@/hooks/useCommerce";
import { ImageViewer } from "@/components/ImageViewer";
import type { AppError, CommerceWithOwner } from "@/types";

type CommerceItemProps = {
  commerce: CommerceWithOwner;
  columns: string;
};

export const CommerceItem = ({ commerce, columns }: CommerceItemProps) => {
  const { handleToggleCommerceActive, isPendingToggleActive, openEdit } =
    useCommerce();

  const [opened, { open: openAvatar, close: closeAvatar }] =
    useDisclosure(false);

  const updatedAt = new Date(commerce.updatedAt).toLocaleDateString("es-AR");

  const handleChangeActive = async () => {
    try {
      await handleToggleCommerceActive(commerce.commerceId);
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cambiar el estado.");
    }
  };

  return (
    <>
      <ImageViewer
        opened={opened}
        closeImageViewer={closeAvatar}
        title={`Comercio: ${commerce.businessName}`}
        imageUrl={commerce.businessLogoUrl}
        key={commerce?.businessName}
      />
      <li data-commerce={commerce.commerceId} className={`${columns} p-2`}>
        <Avatar
          className="hover:cursor-pointer"
          onClick={commerce.businessLogoUrl ? openAvatar : undefined}
          src={commerce.businessLogoUrl}
          alt={`${commerce.businessName} logo`}
          component="button"
        />
        <div className="min-w-0">
          <p className="first-letter:uppercase">{commerce.businessName}</p>
          {/* en mobile el dueño se muestra debajo del nombre del comercio */}
          <p className="text-secondary-foreground truncate text-xs lg:hidden">
            {commerce.username}
          </p>
        </div>
        <p className="hidden first-letter:uppercase lg:block">
          {commerce.username}
        </p>
        <p className="hidden lg:block">{commerce.email}</p>
        <p className="hidden lg:block">{updatedAt}</p>
        <Switch
          aria-label="Cambiar estado del comercio"
          title="Cambiar estado del comercio"
          color="green"
          checked={commerce.businessActive}
          onChange={handleChangeActive}
          disabled={isPendingToggleActive}
        />
        <div className="justify-center">
          <Button
            size="compact-sm"
            aria-label="Editar comercio"
            title="Editar comercio"
            onClick={() => openEdit(commerce)}
          >
            <PenBoxIcon pointerEvents={"none"} size={20} />
          </Button>
        </div>
      </li>
    </>
  );
};
