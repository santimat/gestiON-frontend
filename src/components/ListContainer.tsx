import { type LucideIcon } from "lucide-react";

import { LoadingPage } from "@/components/Loading";

type ListContainerProps = {
  isLoading: boolean;
  isLoadingMessage?: string;
  error: string | null;
  isEmpty: boolean;
  icon: LucideIcon;
  children: React.ReactNode;
  emptyMessage?: string;
};
export const ListContainer = ({
  isLoading,
  isLoadingMessage,
  error,
  children,
  isEmpty,
  icon: Icon,
  emptyMessage = "No hay elementos para mostrar",
}: ListContainerProps) => {
  if (error) return <div className="text-destructive text-center">{error}</div>;

  if (isLoading && isLoadingMessage)
    return (
      <p className="text-secondary-foreground col-span-full py-6 text-center text-sm">
        {isLoadingMessage}
      </p>
    );

  if (isLoading) return <LoadingPage />;

  if (isEmpty) {
    return (
      <div className="border-border text-secondary-foreground flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border p-10">
        <Icon size={40} strokeWidth={1.5} />
        <p className="text-foreground font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
};
