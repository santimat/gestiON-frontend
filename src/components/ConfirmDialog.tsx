import { Button, Modal } from "@mantine/core";

type ConfirmDialogProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

export const ConfirmDialog = ({
  opened,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = false,
}: ConfirmDialogProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="sm"
      transitionProps={{ transition: "fade-down", duration: 300 }}
      withCloseButton={false}
    >
      <h2 className="font-semibold">{title}</h2>
      {description && (
        <p className="text-secondary-foreground mt-2 text-sm">{description}</p>
      )}
      <div className="flex justify-end gap-4 pt-6">
        <Button className="bg-destructive!" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          className={destructive ? "bg-destructive!" : undefined}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
