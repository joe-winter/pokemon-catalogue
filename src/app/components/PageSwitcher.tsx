import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface PageSwitcherProps {
  next: boolean;
  previous: boolean;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>
}

export default function PageSwitcher({next, previous, pageNumber, setPageNumber}: PageSwitcherProps) {
  return (
    <>
      <div className="px-2 max-h-2">
        <Button
          className="text-xs"
          disabled={!previous}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-left"
            >
              <path d="M6 8L2 12L6 16" />
              <path d="M2 12H22" />
            </svg>
          </span>
          Back
        </Button>
      </div>
      <div className="px-2">
        <Button
          className="text-xs"
          disabled={!next}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-right"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </span>
        </Button>
      </div>
    </>
  );
}
