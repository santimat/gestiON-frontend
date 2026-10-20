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
          className={`hover:${commerce.businessLogoUrl ? "cursor-pointer" : ""}`}
          onClick={openAvatar}
          src={commerce.businessLogoUrl}
          alt={`${commerce.businessName} logo`}
          component="button"
        ></Avatar>
        <p className="first-letter:uppercase">{commerce.businessName}</p>
        <p className="first-letter:uppercase">{commerce.username}</p>
        <p>{commerce.email}</p>
        <p>{updatedAt}</p>
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
