import type { ReactNode } from "react";

export type PageHeaderContent = {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
};

export type UsePageHeaderStore = {
  header: PageHeaderContent | null;
  setHeader: (header: PageHeaderContent) => void;
  clearHeader: () => void;
};
