import { Button, Modal } from "@mantine/core";

type ImageViewerProps = {
  imageUrl: string | undefined;
  title: string;
  opened: boolean;
  closeImageViewer: () => void;
};

export const ImageViewer = ({
  imageUrl,
  title,
  opened,
  closeImageViewer,
}: ImageViewerProps) => {
  if (!imageUrl) return null;

  return (
    <Modal opened={opened} onClose={closeImageViewer} withCloseButton={false}>
      <header className="mb-2">
        <h3 className="text-xl font-normal">{title}</h3>
      </header>
      <img src={imageUrl} alt={title} />
      <Button className="mt-4 ml-auto block!" onClick={closeImageViewer}>
        Cerrar
      </Button>
    </Modal>
  );
};
