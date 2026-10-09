import { type UseDisclosureHandlers } from "@mantine/hooks";
import { TextInput, NumberInput, FileInput, Tooltip } from "@mantine/core";
import {
  CircleAlert,
  DollarSign,
  FileImage,
  InfoIcon,
  LayersArrowUp,
  PackageIcon,
  SquareText,
} from "lucide-react";
import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";

import { useCategory } from "@/hooks/useCategory";
import { ModalHeader } from "@/components/ModalHeader";
import { DEFAULT_PRODUCT_FORM } from "@/utils/constants";
import { ModalActions } from "@/components/ModalActions";
import type { CurrentCommerce, Product, ProductForm } from "@/types";
import { SelectCategory } from "@/components/products/SelectCategory";

type NewProductFormProps = {
  product: Product | null;
  closeModal: UseDisclosureHandlers["close"];
  currentCommerce: CurrentCommerce | null;
};

const mapToForm = (product: Product): ProductForm => ({
  name: product.name,
  description: product.description,
  categoryId: String(product.category.id),
  costPrice: product.costPrice,
  salePrice: product.salePrice,
  currentStock: product.currentStock,
  minStock: product.minStock,
  image: null,
});

export function NewProductForm({
  product,
  currentCommerce,
  closeModal,
}: NewProductFormProps) {
  const isEditing = product !== null;

  const { getCategories } = useCategory();

  const [productForm, setProductForm] = useState<ProductForm>(() =>
    product ? mapToForm(product) : DEFAULT_PRODUCT_FORM,
  );

  const profitMultiplier =
    product?.profitMultiplier ?? currentCommerce?.profitMultiplier ?? 1;
  const suggestedPrice = Math.round(productForm.costPrice * profitMultiplier);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNumberChange = (
    field: "costPrice" | "salePrice" | "currentStock" | "minStock",
    value: string | number,
  ) => {
    setProductForm((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <>
      <ModalHeader
        title={isEditing ? "Editar Producto" : "Nuevo Producto"}
        Icon={PackageIcon}
      />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            leftSection={<PackageIcon size={20} />}
            name="name"
            label="Nombre del Producto"
            placeholder="Ej. Café Molido 500gr"
            value={productForm.name}
            onChange={handleChange}
            required
          />

          <SelectCategory
            setProductForm={setProductForm}
            formCategoryId={productForm.categoryId}
          />

          <FileInput
            label="Imagen del prducto"
            name="image"
            placeholder="Máximo de imagen 10MB"
            leftSection={<FileImage size={20} />}
            value={productForm.image}
            onChange={(file) =>
              setProductForm((prevState) => ({ ...prevState, image: file }))
            }
            leftSectionPointerEvents="none"
          />

          <TextInput
            leftSection={<SquareText size={20} />}
            name="description"
            label="Descripcion"
            placeholder="Agregue una breve descripcion del producto"
            value={productForm.description}
            onChange={handleChange}
            className="col-span-3"
          />

          <NumberInput
            leftSection={<DollarSign size={20} />}
            label="Precio de Costo"
            placeholder="0.00"
            prefix="$"
            min={0}
            decimalScale={2}
            value={productForm.costPrice}
            onChange={(value) => handleNumberChange("costPrice", value)}
            required
          />

          <NumberInput
            leftSection={<DollarSign size={20} />}
            label="Precio de Venta"
            placeholder="0.00"
            prefix="$"
            min={0}
            decimalScale={2}
            value={productForm.salePrice}
            onChange={(value) => handleNumberChange("salePrice", value)}
            required
          />

          <TextInput
            leftSection={<DollarSign size={20} />}
            label="Precio Sugerido"
            placeholder="0.00"
            prefix="$"
            rightSection={
              <Tooltip
                label={
                  <>
                    <p>
                      El precio sugerido se calcula multiplicando el precio de
                      costo por el multiplicador de ganancia del comercio.
                    </p>
                    <p>
                      Si no se ha establecido un multiplicador de ganancia, se
                      utilizará el valor por defecto de 1.
                    </p>
                  </>
                }
              >
                <InfoIcon size={20} />
              </Tooltip>
            }
            value={productForm.costPrice > 0 ? suggestedPrice.toFixed(2) : ""}
            readOnly
            leftSectionPointerEvents="none"
          />

          <NumberInput
            leftSection={<LayersArrowUp size={20} />}
            label="Stock Inicial"
            placeholder="0"
            min={0}
            decimalScale={2}
            value={productForm.currentStock}
            onChange={(value) => handleNumberChange("currentStock", value)}
            required
          />
          <NumberInput
            label="Stock Minimo"
            placeholder="0"
            min={0}
            value={productForm.minStock}
            onChange={(value) => handleNumberChange("minStock", value)}
            required
            leftSection={<CircleAlert size={20} />}
          />
        </div>
        <ModalActions
          sumbmitText={isEditing ? "Guardar cambios" : "Agregar"}
          closeModal={closeModal}
        />
      </form>
    </>
  );
}
