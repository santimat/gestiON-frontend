import { Button } from "@mantine/core";

type ModalFormActionsProps = {
  closeModal: () => void;
  submitText: string;
  isSubmitting?: boolean;
};

export const ModalFormActions = ({
  closeModal,
  submitText,
  isSubmitting = false,
}: ModalFormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-6">
      <Button
        className="bg-destructive!"
        onClick={closeModal}
        disabled={isSubmitting}
      >
        Cancelar
      </Button>
      <Button type="submit" loading={isSubmitting}>
        {submitText}
      </Button>
    </div>
  );
};
