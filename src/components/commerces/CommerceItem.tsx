import type { ChangeEvent, MouseEvent } from "react";
import { PenBoxIcon } from "lucide-react";
import { Avatar, Button, Switch } from "@mantine/core";

import { useCommerce } from "@/hooks/useCommerce";
import type { CommerceWithOwnerDTO } from "@/types";

type CommerceItemProps = {
  commerce: CommerceWithOwnerDTO;
  openModal: () => void;
  columns: string;
};

export const CommerceItem = ({
  commerce,
  openModal,
  columns,
}: CommerceItemProps) => {
  const { startEditing, handleToggleCommerceActive, isPendingToggleActive } =
    useCommerce();
  const createdAt = new Date(commerce.updatedAt);
  const day = createdAt.getDate();
  const month = createdAt.getMonth();
  const year = createdAt.getFullYear();

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLElement;
    const commerceId = Number(button.closest("li")?.dataset.commerce);
    startEditing(commerceId);
    openModal();
  };

  const handleChangeActive = async (e: ChangeEvent<HTMLInputElement>) => {
    const clicked = e.target as HTMLElement;
    const commerceId = Number(clicked.closest("li")?.dataset.commerce);
    return await handleToggleCommerceActive(commerceId);
  };

  return (
    <li data-commerce={commerce.commerceId} className={`${columns} p-2`}>
      <Avatar
        src={commerce.businessLogoUrl}
        alt={`${commerce.businessName} logo`}
      />
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
          onClick={handleEdit}
        >
          <PenBoxIcon pointerEvents={"none"} size={20} />
        </Button>
      </div>
    </li>
  );
};
