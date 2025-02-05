import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

  const splitStringByInputValue = (element: string) => {
    if (inputValue) {
      // replace substring that matches input value with $#$
      const replaced = element.replace(inputValue.toLowerCase(), "$#$");
      // split at $ and remove an '' values
      return replaced.split("$").filter((element) => element);
    } else {
      return [element];
    }
  };
  return (
    <div className="flex">
      <div className="w-48">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            setIsOpen(true)
          }}
        />
        {isOpen && (
          <Card className="absolute Z-50 w-48 mt-2">
            {searchList.slice(0, 10).map((element, index) => (
              <CardContent className="px-2 py-0 text-lg" key={index}>
                <button onClick={() => {
                  setIsOpen(false)
                  setInputValue(element)
                }}>
                  {splitStringByInputValue(element).map((element, index) =>
                    element === "#" ? (
                      <span
                        key={index}
                        className={`font-semibold ${
                          index === 0 ? "capitalize" : ""
                        }`}
                      >
                        {inputValue}
                      </span>
                    ) : (
                      <span
                        key={index}
                        className={`${index === 0 ? "capitalize" : ""}`}
                      >
                        {element}
                      </span>
                    )
                  )}
                </button>
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
