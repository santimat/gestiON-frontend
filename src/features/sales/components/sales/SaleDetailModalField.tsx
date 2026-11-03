type SaleDetailModalFieldProps = {
  title: string;
  content: string | number;
};
export const SaleDetailModalField = ({
  title,
  content,
}: SaleDetailModalFieldProps) => {
  return (
    <div>
      <p className="text-secondary-foreground text-xs">{title}</p>
      {content && (
        <p className="font-medium first-letter:uppercase">{content}</p>
      )}
    </div>
  );
};
