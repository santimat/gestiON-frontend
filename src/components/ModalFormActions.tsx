import { Button } from "@mantine/core";

type ModalFormActionsProps = {
  closeModal: () => void;
  sumbmitText: string;
};

export const ModalFormActions = ({
  closeModal,
  sumbmitText,
}: ModalFormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-6">
      <Button className="bg-destructive!" onClick={closeModal}>
        Cancelar
      </Button>
      <Button type="submit">{sumbmitText}</Button>
    </div>
  );
};
