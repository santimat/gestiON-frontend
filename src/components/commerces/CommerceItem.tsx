import { PenBoxIcon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import type { ChangeEvent } from "react";
import { Avatar, Button, Modal, Switch } from "@mantine/core";

import { useCommerce } from "@/hooks/useCommerce";
import type { CommerceWithOwnerDTO } from "@/types";

type CommerceItemProps = {
  commerce: CommerceWithOwnerDTO;
  onEdit: (commerce: CommerceWithOwnerDTO) => void;
  columns: string;
};

export const CommerceItem = ({
  commerce,
  onEdit,
  columns,
}: CommerceItemProps) => {
  const { handleToggleCommerceActive, isPendingToggleActive } = useCommerce();

  const [opened, { open: openAvatarModal, close: closeAvatarModal }] =
    useDisclosure(false);

  const createdAt = new Date(commerce.updatedAt);
  const day = createdAt.getDate();
  const month = createdAt.getMonth();
  const year = createdAt.getFullYear();

  const handleChangeActive = async (e: ChangeEvent<HTMLInputElement>) => {
    const clicked = e.target as HTMLElement;
    const commerceId = Number(clicked.closest("li")?.dataset.commerce);
    return await handleToggleCommerceActive(commerceId);
  };

  const openAvatar = () => {
    openAvatarModal();
  };

  return (
    <>
      <Modal opened={opened} onClose={closeAvatarModal} withCloseButton={false}>
        <header className="mb-2">
          <h3 className="text-xl font-normal">
            Comercio: <span className="font-bold">{commerce.businessName}</span>
          </h3>
        </header>
        <img
          src={commerce.businessLogoUrl}
          alt={`${commerce.businessName} logo`}
        />
        <Button className="mt-4 ml-auto block!" onClick={closeAvatarModal}>
          Cerrar
        </Button>
      </Modal>
      <li data-commerce={commerce.commerceId} className={`${columns} p-2`}>
        <Avatar
          className="hover:cursor-pointer"
          onClick={openAvatar}
          src={commerce.businessLogoUrl}
          alt={`${commerce.businessName} logo`}
          component="button"
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
            onClick={() => onEdit(commerce)}
          >
            <PenBoxIcon pointerEvents={"none"} size={20} />
          </Button>
        </div>
      </li>
    </>
  );
};
