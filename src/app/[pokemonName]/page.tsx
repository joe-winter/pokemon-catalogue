"use client";
import { useEffect, useState } from "react";
import PokemonService from "../services/pokemonService";
import Image from "next/image";
import { capitalizeString } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import StatsCard from "../components/StatsCard";
import BadgeListCard from "../components/BadgeListCard";
import GeneralDetailsCard from "../components/GeneralDetailsCard";

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

  const details = [
    { heading: "Height", value: `${pokemon.height}m` },
    { heading: "Category", value: `${pokemon.category}` },
    { heading: "Weight", value: `${pokemon.weight}kg` },
    { heading: "Gender", value: `${pokemon.gender}` },
  ];

  const stats = [
    { name: "HP", value: pokemon.stats.hp },
    { name: "Attack", value: pokemon.stats.attack },
    { name: "Defense", value: pokemon.stats.defense },
    { name: "Special Attack", value: pokemon.stats.specialAttack },
    { name: "Special Defence", value: pokemon.stats.hp },
    { name: "Speed", value: pokemon.stats.hp },
  ];

  const categories = [
    { heading: "type", badges: pokemon.type },
    { heading: "weaknesses", badges: pokemon.weaknesses },
  ];

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
          <Card className="my-8 bg-gray-100 shadow-lg border-2">
            <CardContent className="px-12 py-4">
              <div className="flex items-center">
                <Image
                  className="bg-white rounded-full border"
                  src={"/cherish-ball.png"}
                  quality={100}
                  alt="cherish-ball"
                  width={80}
                  height={80}
                />
                <div className="p-4">{pokemon.entry}</div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <GeneralDetailsCard
              className="row-span-2 px-2 pt-8"
              details={details}
            />
            <BadgeListCard categories={categories} className="px-2 pt-8" />
            <Card>
              <CardContent>
                <h3>Ability</h3>
                <div>{pokemon.ability.name}</div>
                <div>{pokemon.ability.description}</div>
              </CardContent>
            </Card>

            <StatsCard className="col-span-2 py-6" stats={stats} />
          </div>
        </div>
        <div className="my-8">
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
            Return Home
          </Button>
        </div>
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
