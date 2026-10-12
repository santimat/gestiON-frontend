import type { LucideIcon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { Avatar, NumberFormatter, Switch, Tooltip } from "@mantine/core";

import type { Product } from "@/types";
import { useProduct } from "@/hooks/useProduct";
import { ImageViewer } from "@/components/ImageViewer";
import { ProductItemActions } from "@/components/products/ProductItemActions";

type ProductItemsProps = {
  product: Product;
  actionsIcons: {
    Icon: LucideIcon;
    label: string;
  }[];
  columns: string;
  onEdit: () => void;
};

export const ProductItem = ({
  product,
  actionsIcons,
  columns,
  onEdit,
}: ProductItemsProps) => {
  const [opened, { open: openImageViewer, close: closeImageViewer }] =
    useDisclosure(false);

  const { isPendingToggleActive, toggleActive } = useProduct();

  const handleOnChangeSwitch = async () => {
    await toggleActive(product.id);
  };

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
        />
        <div>
          <p>{product.name}</p>
          <p className="text-sm text-gray-500">{product.id}</p>
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
          disabled={isPendingToggleActive}
          onChange={handleOnChangeSwitch}
        />
        <ProductItemActions actionsIcons={actionsIcons} onEdit={onEdit} />
      </li>
    </>
  );
};
