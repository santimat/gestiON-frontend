import { PenBoxIcon } from "lucide-react";
import { Avatar, Button, Switch } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import type { CommerceWithOwner } from "@/types";
import { useCommerce } from "@/hooks/useCommerce";
import { ImageViewer } from "@/components/ImageViewer";

type CommerceItemProps = {
  commerce: CommerceWithOwner;
  onEdit: (commerce: CommerceWithOwner) => void;
  columns: string;
};

export const CommerceItem = ({
  commerce,
  onEdit,
  columns,
}: CommerceItemProps) => {
  const { handleToggleCommerceActive, isPendingToggleActive } = useCommerce();
  const [opened, { open: openAvatar, close: closeAvatar }] =
    useDisclosure(false);
  const createdAt = new Date(commerce.updatedAt);
  const day = createdAt.getDate();
  const month = createdAt.getMonth();
  const year = createdAt.getFullYear();

  const handleChangeActive = async () => {
    return await handleToggleCommerceActive(commerce.commerceId);
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
        <p>{`${day}/${month}/${year}`}</p>
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
            onClick={() => onEdit(commerce)}
          >
            <PenBoxIcon pointerEvents={"none"} size={20} />
          </Button>
        </div>
      </li>
    </>
  );
};
