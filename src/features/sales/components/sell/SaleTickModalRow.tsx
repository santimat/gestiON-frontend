type SaleTicketModalRowProps = {
  title: string;
  content: string | number;
  color?: string;
};

export const SaleTicketModalRow = ({
  title,
  content,
  color,
}: SaleTicketModalRowProps) => {
  const textColorClass = color ? `text-${color}` : "";
  return (
    <div className="flex justify-between">
      <span className="text-secondary-foreground">{title}</span>
      <span className={`font-medium ${textColorClass}`}>{content}</span>
    </div>
  );
};
