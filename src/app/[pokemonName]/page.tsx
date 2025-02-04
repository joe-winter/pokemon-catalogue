'use client'
import { useEffect, useState } from "react"
import PokemonService from "../services/pokemonService";

interface PokemonDetails {
  name: string;
  id: number;
  imageUrl: string;
  description: string;
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
  description: "",
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
  }
}

export default function Page({
  params,
}: {
  params: Promise<{ pokemonName: string }>
}) {
  const [pokemon, setPokemon] = useState<PokemonDetails>(emptyPokemon)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonName = (await params).pokemonName
        const pokemonData = await PokemonService.getPokemon(pokemonName);
        // console.log(pokemonData)
        setPokemon(pokemonData)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [params]);
  return <div>{pokemon.weaknesses}</div>
}