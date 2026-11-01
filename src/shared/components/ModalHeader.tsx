import type { LucideIcon } from "lucide-react";

type ModalHeaderProps = {
  title: string;
  Icon: LucideIcon;
};

export const ModalHeader = ({ title, Icon }: ModalHeaderProps) => {
  return (
    <header className="mb-4">
      <div className="flex gap-2">
        <Icon className="text-primary" />
        <p className="font-semibold">{title}</p>
      </div>
    </header>
  );
};
