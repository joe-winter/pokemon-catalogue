import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface SearchBarProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  searchFunction: (value: string) => void;
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
      // split at $ and remove all '' values
      return replaced.split("$").filter((element) => element);
    } else {
      return [element];
    }
  };

  const searchButtonHandler = () => {
    searchFunction(inputValue);
    setIsOpen(false)
  }
  
  const selectOptionHandler = (element: string) => {
    setInputValue(element);
    console.log("hello",element)
    setIsOpen(false);
    searchFunction(element);
  }

  // close dropdown is there is no input value
  useEffect(() => {
    if (inputValue === "") {
      setIsOpen(false);
    }
  }, [inputValue]);
  return (
    <div className="flex">
      <div className="w-48">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
        />
        {isOpen && (
          <div>
            <Card className="absolute Z-50 w-48 mt-2">
              {searchList.slice(0, 10).map((element, index) => (
                <CardContent className="px-2 py-0 text-lg" key={index}>
                  <button
                    onClick={() => selectOptionHandler(element)}
                    className="capitalize"
                  >
                    {/* map through split string if string is # replace with 
                    input value and set style to bold */}
                    {splitStringByInputValue(element).map((element, index) =>
                      element === "#" ? (
                        <span key={index} className="font-semibold">
                          {inputValue.toLowerCase()}
                        </span>
                      ) : (
                        <span key={index}>{element}</span>
                      )
                    )}
                  </button>
                </CardContent>
              ))}
            </Card>
          </div>
        )}
      </div>
      <div className="ml-3">
        <Button
          onClick={searchButtonHandler}
          disabled={disabled}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
