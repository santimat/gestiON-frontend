import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { usePageHeaderStore } from "@/stores/pageHeader/usePageHeaderStore";
import type { PageHeaderContent } from "@/stores/pageHeader/types";

export const usePageHeader = (content: PageHeaderContent) => {
  const { setHeader, clearHeader } = usePageHeaderStore(
    useShallow((s) => ({
      setHeader: s.setHeader,
      clearHeader: s.clearHeader,
    })),
  );

  useEffect(() => {
    setHeader(content);
    // Al desmontar la vista dejamos el header vacío
    return () => clearHeader();
  }, [content, setHeader, clearHeader]);
};

export const useHeaderContent = () => {
  return usePageHeaderStore((s) => s.header);
};
