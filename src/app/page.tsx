"use client";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonService from "./services/pokemonService";

interface Pokemon {
  name: string;
  imageUrl: string;
  id: number;
  types: string[];
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([
    { name: "", imageUrl: "", id: 0, types: [""] },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await PokemonService.getPokemonList(12, 0);
        setPokemonList(pokemonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(pokemonList);
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center">
        <div className="flex flex-col border-b items-center mb-8 w-full">
          <h1 className="font-semibold text-4xl mt-12">Pokémon Browser</h1>
          <h2 className="font-semibold text-gray-500 text-lg mb-14">Search and find Pokémon</h2>
        </div>
        <div className="grid grid-cols-4 max-w-fit gap-x-4 gap-y-8">
          {pokemonList[0].imageUrl &&
            pokemonList.map((pokemon, index) => (
              <PokemonCard
                key={index}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
                number={"#" + pokemon.id.toString().padStart(4, "0")}
                types={pokemon.types}
              />
            ))}
        </div>
      </div>
    </div>
  );
}