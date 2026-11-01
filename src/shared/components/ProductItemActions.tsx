import type { LucideIcon } from "lucide-react";

type ProductItemActionsProps = {
  actionsIcons: {
    Icon: LucideIcon;
    label: string;
  }[];
  onEdit: () => void;
};

export const ProductItemActions = ({
  actionsIcons,
  onEdit,
}: ProductItemActionsProps) => {
  return (
    <ul className="flex gap-1">
      {actionsIcons.map(({ Icon, label }) => {
        return (
          <li key={label}>
            <button
              aria-label={label}
              title={label}
              onClick={onEdit}
              className="rounded-md p-2 transition-transform hover:scale-110 hover:cursor-pointer active:scale-95"
            >
              <Icon pointerEvents="none" size={20} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};
