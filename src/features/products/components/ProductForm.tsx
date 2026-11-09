import {
  BanknoteArrowUp,
  CircleAlert,
  DollarSign,
  FileImage,
  InfoIcon,
  LayersArrowUp,
  PackageIcon,
  SquareText,
} from "lucide-react";
import {
  TextInput,
  NumberInput,
  FileInput,
  Tooltip,
  Textarea,
} from "@mantine/core";
import { useEffect, type ChangeEvent } from "react";

import type { Product, ProductFormValues } from "@features/products/types";
import type { CurrentCommerce } from "@features/commerces";
import { ModalHeader } from "@shared/components/ModalHeader";
import { useProduct } from "@features/products/hooks/useProduct";
import { useEntityForm } from "@shared/hooks/useEntityForm";
import { useCategory, SelectCategory } from "@features/categories";
import { ModalFormActions } from "@shared/components/ModalFormActions";
import { productMapper } from "@features/products/mappers/productMapper";
import { parseMultiplier } from "@features/products/utils/parseMultiplier";

const DEFAULT_PRODUCT_FORM = {
  name: "",
  description: "",
  categoryId: null,
  costPrice: null,
  salePrice: null,
  profitMultiplier: null,
  currentStock: null,
  minStock: null,
  image: null,
};

type NewProductFormProps = {
  closeModal: () => void;
  product: Product | null;
  currentCommerce: CurrentCommerce | null;
};

export const ProductForm = ({
  product,
  currentCommerce,
  closeModal,
}: NewProductFormProps) => {
  const isEditing = product !== null;

  const { getCategories } = useCategory();
  const { handleCreateProduct, updateProduct } = useProduct();

  const {
    form: productForm,
    setForm: setProductForm,
    errors,
    isSubmitting,
    handleSubmit,
  } = useEntityForm<ProductFormValues>({
    initialValues: product
      ? productMapper.toForm(product)
      : DEFAULT_PRODUCT_FORM,
    isEditing,
    closeModal,
    submit: async (form, e) => {
      // el FormData sale del DOM: la validación del schema recibe strings
      const formData = new FormData(e.currentTarget);

      if (!form.image) {
        formData.delete("image");
      }

      if (isEditing && product) await updateProduct(product.id, formData);
      else await handleCreateProduct(formData);
    },
    successMessages: {
      create: "Producto creado correctamente",
      update: "Producto actualizado correctamente",
    },
    errorMessages: {
      create: "No se pudo guardar el producto.",
      update: "No se pudo guardar el producto.",
    },
  });

  const profitMultiplier =
    productForm.profitMultiplier != null
      ? parseMultiplier(productForm.profitMultiplier)
      : (currentCommerce?.profitMultiplier ?? 1);
  const suggestedPrice = Math.round(
    (productForm.costPrice ?? 0) * profitMultiplier,
  );

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNumberChange = (
    field:
      | "costPrice"
      | "salePrice"
      | "profitMultiplier"
      | "currentStock"
      | "minStock",
    value: string | number,
  ) => {
    const numericValue = value === "" ? null : Number(value);
    setProductForm((prevState) => ({ ...prevState, [field]: numericValue }));
  };

  return (
    <>
      <ModalHeader
        title={isEditing ? "Editar Producto" : "Nuevo Producto"}
        Icon={PackageIcon}
      />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextInput
            leftSection={<PackageIcon size={20} />}
            name="name"
            label="Nombre del Producto"
            placeholder="Ej. Café Molido 500gr"
            value={productForm.name}
            error={errors.name}
            onChange={handleChange}
            required
          />

          <SelectCategory
            setProductForm={setProductForm}
            productForm={productForm}
            error={errors.categoryId}
          />

          <FileInput
            label="Imagen del producto"
            name="image"
            placeholder="Máximo de imagen 10MB"
            leftSection={<FileImage size={20} />}
            value={productForm.image}
            error={errors.image}
            className="image"
            onChange={(file) =>
              setProductForm((prevState) => ({ ...prevState, image: file }))
            }
            leftSectionPointerEvents="none"
          />

          <Textarea
            leftSection={<SquareText size={20} />}
            name="description"
            label="Descripcion"
            placeholder="Agregue una breve descripcion del producto"
            value={productForm.description}
            onChange={handleTextAreaChange}
            error={errors.description}
            className="col-span-1 sm:col-span-3"
          />

          <NumberInput
            leftSection={<BanknoteArrowUp size={20} />}
            name="profitMultiplier"
            label="Margen de ganancia (%)"
            rightSection={
              <Tooltip
                label={
                  <>
                    <p>Porcentaje del 0 al 100%</p>
                  </>
                }
              >
                <InfoIcon size={20} />
              </Tooltip>
            }
            placeholder="15"
            value={productForm.profitMultiplier ?? ""}
            onChange={(value) => handleNumberChange("profitMultiplier", value)}
            error={errors.profitMultiplier}
            min={0}
          />
          <NumberInput
            leftSection={<DollarSign size={20} />}
            label="Precio de Costo"
            name="costPrice"
            placeholder="0.00"
            min={0}
            error={errors.costPrice}
            decimalScale={2}
            value={productForm.costPrice ?? ""}
            onChange={(value) => handleNumberChange("costPrice", value)}
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
                      Precio sugerido = precio costo + (precio costo * margen de
                      ganancia).
                    </p>
                    <p>
                      Si no se ha establecido un multiplicador de ganancia, se
                      utilizará el valor por defecto de 0%.
                    </p>
                  </>
                }
              >
                <InfoIcon size={20} />
              </Tooltip>
            }
            value={
              (productForm.costPrice ?? 0) > 0 ? suggestedPrice.toFixed(2) : ""
            }
            readOnly
            leftSectionPointerEvents="none"
          />

          <NumberInput
            leftSection={<DollarSign size={20} />}
            label="Precio de Venta"
            name="salePrice"
            placeholder="0.00"
            error={errors.salePrice}
            min={0}
            decimalScale={2}
            value={productForm.salePrice ?? ""}
            onChange={(value) => handleNumberChange("salePrice", value)}
            required
          />

          <NumberInput
            leftSection={<LayersArrowUp size={20} />}
            label="Stock Inicial"
            name="currentStock"
            placeholder="0"
            min={0}
            error={errors.currentStock}
            decimalScale={0}
            value={productForm.currentStock ?? ""}
            onChange={(value) => handleNumberChange("currentStock", value)}
            required
          />
          <NumberInput
            label="Stock Minimo"
            name="minStock"
            placeholder="0"
            min={0}
            error={errors.minStock}
            value={productForm.minStock ?? ""}
            onChange={(value) => handleNumberChange("minStock", value)}
            decimalScale={0}
            required
            leftSection={<CircleAlert size={20} />}
          />
        </div>
        <ModalFormActions
          submitText={isEditing ? "Guardar cambios" : "Agregar"}
          closeModal={closeModal}
          isSubmitting={isSubmitting}
        />
      </form>
    </>
  );
};
