"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface PageContext {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

const PageContext = createContext<PageContext>({
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

// function to get and update page number
export function usePage() {
  return useContext(PageContext);
}
