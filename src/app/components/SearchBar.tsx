import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { capitalizeString } from "@/lib/utils";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface SearchBarProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  searchFunction: () => void;
  disabled?: boolean;
  searchList: string[];
}

export default function SearchBar({
  inputValue,
  setInputValue,
  placeholder = "Search Here",
  searchFunction,
  disabled = false,
  searchList,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex">
      <div className="w-48">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
        />
        {isOpen && (
          <Card className="absolute Z-50 w-48 mt-2">
            {searchList.slice(0, 10).map((element, index) => (
              <CardContent className="px-2 py-0 text-lg" key={index}>
                {capitalizeString(element)}
              </CardContent>
            ))}
          </Card>
        )}
      </div>
      <div className="ml-3">
        <Button onClick={searchFunction} disabled={disabled}>
          Search
        </Button>
      </div>
    </div>
  );
}
