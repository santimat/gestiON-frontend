import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

import type { PageHeaderContent } from "@shared/layout/stores/pageHeader/types";
import { usePageHeaderStore } from "@shared/layout/stores/pageHeader/usePageHeaderStore";

const isSameHeader = (
  last: PageHeaderContent | null,
  next: PageHeaderContent,
) =>
  last !== null &&
  last.title === next.title &&
  last.subtitle === next.subtitle &&
  last.actions === next.actions;

export const usePageHeader = (content: PageHeaderContent) => {
  const { setHeader, clearHeader } = usePageHeaderStore(
    useShallow((s) => ({
      setHeader: s.setHeader,
      clearHeader: s.clearHeader,
    })),
  );
  const lastContent = useRef<PageHeaderContent | null>(null);

  useEffect(() => {
    if (isSameHeader(lastContent.current, content)) return;
    lastContent.current = content;
    setHeader(content);
  }, [content, setHeader]);

  // al desmontar la vista dejamos el header vacio; reseteamos el ref para que el
  // siguiente mount (p. ej. en Strict Mode) vuelva a invocar setHeader.
  useEffect(
    () => () => {
      lastContent.current = null;
      clearHeader();
    },
    [clearHeader],
  );
};

export const useHeaderContent = () => {
  return usePageHeaderStore((s) => s.header);
};
