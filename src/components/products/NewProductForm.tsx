import {
  TextInput,
  NumberInput,
  FileInput,
  Tooltip,
  Textarea,
} from "@mantine/core";
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

import { productMapper } from "@/mappers";
import { useProduct } from "@/hooks/useProduct";
import { useCategory } from "@/hooks/useCategory";
import { ModalHeader } from "@/components/ModalHeader";
import { DEFAULT_PRODUCT_FORM } from "@/utils/constants";
import { ModalFormActions } from "@/components/ModalFormActions";
import type {
  AppError,
  CurrentCommerce,
  Product,
  ProductFieldErrors,
  ProductForm,
} from "@/types";
import { SelectCategory } from "@/components/category/SelectCategory";
import { toast } from "sonner";

type NewProductFormProps = {
  product: Product | null;
  closeModal: () => void;
  currentCommerce: CurrentCommerce | null;
};

export function NewProductForm({
  product,
  currentCommerce,
  closeModal,
}: NewProductFormProps) {
  const isEditing = product !== null;

  const { getCategories } = useCategory();
  const { createProduct, updateProduct } = useProduct();

  const [productForm, setProductForm] = useState<ProductForm>(() =>
    product ? productMapper.toForm(product) : DEFAULT_PRODUCT_FORM,
  );
  const [errors, setErrors] = useState<ProductFieldErrors>({});
  // para evitar que el usuario haga doble click en el boton de guardar y se envie dos veces el formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profitMultiplier =
    product?.profitMultiplier ?? currentCommerce?.profitMultiplier ?? 1;
  const suggestedPrice = Math.round(productForm.costPrice * profitMultiplier);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!productForm.image) {
      formData.delete("image");
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      setErrors({});
      closeModal();
      toast.success(
        isEditing
          ? "Producto actualizado correctamente"
          : "Producto creado correctamente",
      );
    } catch (error) {
      const appError = error as AppError;
      if (appError?.fieldErrors) return setErrors(appError.fieldErrors);
      toast.error(appError?.message ?? "No se pudo guardar el producto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNumberChange = (
    field: "costPrice" | "salePrice" | "currentStock" | "minStock",
    value: string | number,
  ) => {
    const numericValue = Number(value);
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
            label="Imagen del prducto"
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
            leftSection={<DollarSign size={20} />}
            label="Precio de Costo"
            name="costPrice"
            placeholder="0.00"
            min={0}
            error={errors.costPrice}
            decimalScale={2}
            value={productForm.costPrice}
            onChange={(value) => handleNumberChange("costPrice", value)}
            required
          />

          <NumberInput
            leftSection={<DollarSign size={20} />}
            label="Precio de Venta"
            name="salePrice"
            placeholder="0.00"
            error={errors.salePrice}
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
            name="currentStock"
            placeholder="0"
            min={0}
            error={errors.currentStock}
            decimalScale={0}
            value={productForm.currentStock}
            onChange={(value) => handleNumberChange("currentStock", value)}
            required
          />
          <NumberInput
            label="Stock Minimo"
            name="minStock"
            placeholder="0"
            min={0}
            error={errors.minStock}
            value={productForm.minStock}
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
}
