"use client";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonService from "./services/pokemonService";
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await PokemonService.getPokemonList(12, 0);
        setData(pokemonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(data);
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
        <div className="px-2 max-h-2">
          <Button className="text-xs" disabled={!data.previous}>
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
          <Button className="text-xs" disabled={!data.next}>
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
