"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonService from "./services/pokemonService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageSwitcher from "./components/PageSwitcher";
import { capitalizeString } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { MoveRight } from "lucide-react";
interface Pokemon {
  name: string;
  imageUrl: string;
  id: number;
  types: string[];
}

interface PokemonData {
  next: boolean;
  previous: boolean;
  pokemonList: Pokemon[];
}

interface PokemonUrl {
  name: string;
  url: string;
}

export default function Home() {
  const [data, setData] = useState<PokemonData>({
    previous: false,
    next: false,
    pokemonList: [{ name: "", imageUrl: "", id: 0, types: [""] }],
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [pokemonList, setPokemonList] = useState<PokemonUrl[]>([
    { name: "", url: "" },
  ]);
  const [value, setValue] = useState("");
  const [searchStatus, setSearchStatus] = useState("Explore Pokémon");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    // setIsOpen(true);
  };

  const handleSearch = async () => {
    if (value !== "") {
      const response = await PokemonService.getPokemonFromList(
        filteredList.slice(0, 12)
      );
      setData({ previous: false, next: false, pokemonList: response });
      setSearchStatus(`Search results for "${value}"`);
    }
  };

  const filteredList = useMemo(() => {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );
  }, [pokemonList, value]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await PokemonService.getPokemonPerPage(
          12,
          12 * pageNumber
        );
        setData(pokemonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await PokemonService.getAllPokemon();
        setPokemonList(pokemonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* title header */}
      <div className="flex flex-col border-b items-center mb-8 w-full">
        <h1 className="font-semibold text-4xl mt-12">Pokémon Browser</h1>
        <h2 className="font-semibold text-gray-500 text-lg mb-14">
          Search and find Pokémon
        </h2>
      </div>
      {/* search bar */}
      <div className="flex items-center justify-between w-full px-44 mb-8">
        <div className="font-semibold text-2xl">{searchStatus}</div>
        <div className="flex">
          <div className="">
            <Input
              placeholder="Find Pokémon"
              value={value}
              onChange={handleInputChange}
            />
          </div>
          <div className="ml-3">
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>
      {/* pokemon grid */}
      <div className="grid grid-cols-4 max-w-fit gap-x-4 gap-y-8">
        {data.pokemonList[0].imageUrl &&
          data.pokemonList.map((data, index) => (
            <PokemonCard
              key={index}
              name={data.name}
              imageUrl={data.imageUrl}
              number={"#" + data.id.toString().padStart(4, "0")}
              types={data.types}
            />
          ))}
      </div>
      {/* page switcher */}
      <div className="mt-8 flex">
        <PageSwitcher
          next={data.next}
          previous={data.previous}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
      {/* footer */}
      <div className="flex flex-col border-t items-center mt-8 w-full">
        <h2 className="font-semibold  text-md mt-28 mb-16">
          Thank you for using Pokémon Browser!
        </h2>
      </div>
    </div>
  );
}
