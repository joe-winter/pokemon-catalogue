import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  searchFunction: () => void;
  disabled?: boolean;
}

export default function SearchBar({
  inputValue,
  setInputValue,
  placeholder = "Search Here",
  searchFunction,
  disabled = false,
}: SearchBarProps) {
  return (
    <div className="flex">
      <div className="">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div className="ml-3">
        <Button onClick={searchFunction} disabled={disabled}>
          Search
        </Button>
      </div>
    </div>
  );
}
