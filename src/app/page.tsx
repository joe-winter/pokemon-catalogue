"use client";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonService from "./services/pokemonService";
import { Button } from "@/components/ui/button";
import PageSwitcher from "./components/PageSwitcher";
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

export default function Home() {
  const [data, setData] = useState<PokemonData>({
    previous: false,
    next: false,
    pokemonList: [{ name: "", imageUrl: "", id: 0, types: [""] }],
  });
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await PokemonService.getPokemonList(
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

  console.log(pageNumber);
  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* title header */}
      <div className="flex flex-col border-b items-center mb-8 w-full">
        <h1 className="font-semibold text-4xl mt-12">Pokémon Browser</h1>
        <h2 className="font-semibold text-gray-500 text-lg mb-14">
          Search and find Pokémon
        </h2>
      </div>
      {/* data grid */}
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
