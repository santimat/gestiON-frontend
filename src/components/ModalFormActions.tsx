import { Button } from "@mantine/core";

type ModalFormActionsProps = {
  closeModal: () => void;
  submitText: string;
};

export const ModalFormActions = ({
  closeModal,
  submitText,
}: ModalFormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-6">
      <Button className="bg-destructive!" onClick={closeModal}>
        Cancelar
      </Button>
      <Button type="submit">{submitText}</Button>
    </div>
  );
};
