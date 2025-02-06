"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface PageContextType {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

export const PageContext = createContext<PageContextType>({
  pageNumber: 0,
  setPageNumber: () => {},
});

export function PageProvider({ children }: { children: ReactNode }) {
  const [pageNumber, setPageNumber] = useState(0);
  return (
    <PageContext.Provider value={{ pageNumber, setPageNumber }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
