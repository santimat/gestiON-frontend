import { useState } from "react";
import { toast } from "sonner";
import { PenBoxIcon } from "lucide-react";
import { Avatar, Button, Switch } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { useCommerceItem } from "@features/commerces/hooks/useCommerce";
import { ImageViewer } from "@shared/components/ImageViewer";
import type { AppError } from "@shared/types";
import type { CommerceWithOwner } from "@features/commerces/types";

type CommerceItemProps = {
  commerce: CommerceWithOwner;
  columns: string;
};

export const CommerceItem = ({ commerce, columns }: CommerceItemProps) => {
  const { handleToggleCommerceActive, openEdit } = useCommerceItem();
  const [isToggling, setIsToggling] = useState(false);

  const [opened, { open: openAvatar, close: closeAvatar }] =
    useDisclosure(false);

  const updatedAt = new Date(commerce.updatedAt).toLocaleDateString("es-AR");

  const handleChangeActive = async () => {
    setIsToggling(true);
    try {
      await handleToggleCommerceActive(commerce.commerceId);
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cambiar el estado.");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <ImageViewer
        opened={opened}
        closeImageViewer={closeAvatar}
        title={`Comercio: ${commerce.name}`}
        imageUrl={commerce.businessLogoUrl}
        key={commerce?.name}
      />
      <li data-commerce={commerce.commerceId} className={`${columns} p-2`}>
        <Avatar
          className="hover:cursor-pointer"
          onClick={commerce.businessLogoUrl ? openAvatar : undefined}
          src={commerce.businessLogoUrl}
          alt={`${commerce.name} logo`}
          component="button"
        />
        <div className="min-w-0">
          <p className="first-letter:uppercase">{commerce.name}</p>
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
          disabled={isToggling}
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
