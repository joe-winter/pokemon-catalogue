"use client";
import { useEffect, useState } from "react";
import PokemonService from "../services/pokemonService";
import Image from "next/image";
import { capitalizeString } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface PokemonDetails {
  name: string;
  id: number;
  imageUrl: string;
  entry: string;
  height: number;
  category: string;
  weight: number;
  gender: string[];
  type: string[];
  weaknesses: string[];
  ability: {
    name: string;
    description: string;
  };
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefence: number;
    speed: number;
  };
}

const emptyPokemon = {
  name: "",
  id: 0,
  imageUrl: "",
  entry: "",
  height: 0,
  category: "",
  weight: 0,
  gender: [""],
  type: [""],
  weaknesses: [""],
  ability: {
    name: "",
    description: "",
  },
  stats: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefence: 0,
    speed: 0,
  },
};

export default function Page({
  params,
}: {
  params: Promise<{ pokemonName: string }>;
}) {
  const [pokemon, setPokemon] = useState<PokemonDetails>(emptyPokemon);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonName = (await params).pokemonName;
        const pokemonData = await PokemonService.getPokemon(pokemonName);
        console.log(pokemonData);
        setPokemon(pokemonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [params]);
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-semibold text-2xl my-6 pl-16">Pokemon Browser</h1>
      <div className="bg-gray-300 h-40 flex justify-center">
        <Image
          className="bg-gray-200 rounded-full absolute z-50 mt-24 border-white border-2"
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={200}
          height={200}
        />
        {/* main */}
      </div>
      <div className="flex gap-4 mt-36 justify-center items-center mb-4">
        <h2 className="font-semibold text-2xl">
          {capitalizeString(pokemon.name)}
        </h2>
        <h2 className="font-semibold text-2xl text-gray-400">
          {"#" + pokemon.id.toString().padStart(4, "0")}
        </h2>
      </div>
      <div className="max-w-5xl m-auto">
        <div className="m-auto">
          <Card className="my-8 bg-gray-300">
            <CardContent className="m-2">
              <div className="flex items-center">
                <Image
                  src={"/cherish-ball.png"}
                  quality={100}
                  alt="cherish-ball"
                  width={50}
                  height={50}
                />
                <div>{pokemon.entry}</div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <Card className="row-span-2">
              <CardContent>
                <h3>Height</h3>
                <div>{pokemon.height}m</div>
              </CardContent>
              <CardContent>
                <h3>Category</h3>
                <div>{pokemon.category}</div>
              </CardContent>
              <CardContent>
                <h3>Weight</h3>
                <div>{pokemon.weight}</div>
              </CardContent>
              <CardContent>
                <h3>Gender</h3>
                <div>{pokemon.gender}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3>Type</h3>
                <div className="flex">
                  {pokemon.type &&
                    pokemon.type.map((type, index) => (
                      <div
                        className="bg-black max-w-fit rounded mr-3"
                        key={index}
                      >
                        <div className="px-2 py-0.5 text-white text-[10px]">
                          {capitalizeString(type)}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardContent>
                <h3>Weaknesses</h3>
                <div className="flex">
                  {pokemon.weaknesses &&
                    pokemon.weaknesses.map((type, index) => (
                      <div
                        className="bg-black max-w-fit rounded mr-3"
                        key={index}
                      >
                        <div className="px-2 py-0.5 text-white text-[10px]">
                          {capitalizeString(type)}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3>Ability</h3>
                <div>{pokemon.ability.name}</div>
                <div>{pokemon.ability.description}</div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardContent>
                <div className="flex items-center justify-between mt-6">
                  <div>HP</div>
                  <Progress value={pokemon.stats.hp} />
                </div>
              </CardContent>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>Attack</div>
                  <Progress value={pokemon.stats.attack} />
                </div>
              </CardContent>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>Defence</div>
                  <Progress value={pokemon.stats.defense} />
                </div>
              </CardContent>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>Special Attack</div>
                  <Progress value={pokemon.stats.specialAttack} />
                </div>
              </CardContent>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>Special Defence</div>
                  <Progress value={pokemon.stats.specialDefence} />
                </div>
              </CardContent>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>Speed</div>
                  <Progress value={pokemon.stats.speed} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="px-2">
        <Button className="text-xs">
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
      {/* footer */}
      <div className="flex flex-col border-t items-center mt-auto w-full">
        <h2 className="font-semibold  text-md mt-28 mb-16">
          Thank you for using Pokémon Browser!
        </h2>
      </div>
    </div>
  );
}
