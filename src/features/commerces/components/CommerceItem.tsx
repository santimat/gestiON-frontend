import { PenBoxIcon } from "lucide-react";
import { Avatar, Switch } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { useCommerceItem } from "@features/commerces/hooks/useCommerce";
import { ImageViewer } from "@shared/components/ImageViewer";
import { ProductItemActions } from "@shared/components/ProductItemActions";
import { useToggleActive } from "@shared/hooks/useToggleActive";
import { formatDate } from "@shared/utils/dates";
import type { CommerceWithOwner } from "@features/commerces/types";

type CommerceItemProps = {
  commerce: CommerceWithOwner;
  columns: string;
};

export const CommerceItem = ({ commerce, columns }: CommerceItemProps) => {
  const { handleToggleCommerceActive, openEdit } = useCommerceItem();
  // el comercio ya avisa por su cuenta en el hook: sin toast de éxito extra
  const { isToggling, handleToggle } = useToggleActive(null);

  const [opened, { open: openAvatar, close: closeAvatar }] =
    useDisclosure(false);

  const updatedAt = formatDate(commerce.updatedAt);

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
          disabled={isToggling}
          onChange={() =>
            handleToggle(() => handleToggleCommerceActive(commerce.commerceId))
          }
        />
        <div className="justify-center">
          <ProductItemActions
            actionsIcons={[{ Icon: PenBoxIcon, label: "Editar comercio" }]}
            onEdit={() => openEdit(commerce)}
          />
        </div>
      </li>
    </>
  );
};
