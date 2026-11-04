import { toast } from "sonner";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { Avatar, NumberFormatter, Switch, Tooltip } from "@mantine/core";

import { useProductItem } from "@features/products/hooks/useProduct";
import type { AppError } from "@shared/types";
import type { Product } from "@features/products/types";
import { ImageViewer } from "@shared/components/ImageViewer";
import { ProductItemActions } from "@shared/components/ProductItemActions";

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
  const [isToggling, setIsToggling] = useState(false);

  const handleOnChangeSwitch = async () => {
    setIsToggling(true);
    try {
      await toggleActive(product.id);
      toast.success("Estado del producto actualizado con éxito");
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
          onChange={handleOnChangeSwitch}
        />
        <ProductItemActions
          actionsIcons={actionsIcons}
          onEdit={() => openEdit(product)}
        />
      </li>
    </>
  );
};
