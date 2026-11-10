import { type LucideIcon, PackageIcon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { Avatar, NumberFormatter, Switch, Tooltip } from "@mantine/core";

import { useProductItem } from "@features/products/hooks/useProduct";
import { ProductItemActions } from "@shared/components/ProductItemActions";
import { useToggleActive } from "@shared/hooks/useToggleActive";
import type { Product } from "@features/products/types";
import { ImageViewer } from "@shared/components/ImageViewer";

type ProductItemsProps = {
  product: Product;
  actionsIcons: {
    Icon: LucideIcon;
    label: string;
  }[];
  columns: string;
};

export const ProductItem = ({
  product,
  actionsIcons,
  columns,
}: ProductItemsProps) => {
  const [opened, { open: openImageViewer, close: closeImageViewer }] =
    useDisclosure(false);

  const { toggleActive, openEdit } = useProductItem();
  const { isToggling, handleToggle } = useToggleActive(
    "Estado del producto actualizado con éxito",
  );

  return (
    <>
      <ImageViewer
        title={`Producto: ${product.name}`}
        imageUrl={product.imageUrl}
        opened={opened}
        closeImageViewer={closeImageViewer}
        key={product.name}
      />
      <li className={`p-2 ${columns}`}>
        <Avatar
          src={product.imageUrl}
          onClick={openImageViewer}
          className="hover:cursor-pointer"
          component="button"
        >
          <PackageIcon size={20} />
        </Avatar>
        <div>
          <p>{product.name}</p>
          <p className="text-sm text-gray-500">ID:{product.id}</p>
        </div>
        <p>{product.category.name}</p>
        <Tooltip label={product.description || "----"}>
          <p className="line-clamp-1">{product.description || "----"}</p>
        </Tooltip>
        <NumberFormatter
          prefix="$"
          value={product.salePrice}
          thousandSeparator
        />
        <p>{product.currentStock}</p>
        <p>{product.minStock}</p>
        <Switch
          aria-label="Cambiar estado del producto"
          title="Cambiar estado del producto"
          color="green"
          checked={product.active}
          disabled={isToggling}
          onChange={() => handleToggle(() => toggleActive(product.id))}
        />
        <ProductItemActions
          actionsIcons={actionsIcons}
          onEdit={() => openEdit(product)}
        />
      </li>
    </>
  );
};
