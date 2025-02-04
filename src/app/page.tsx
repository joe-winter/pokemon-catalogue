"use client";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonService from "./services/pokemonService";
import PageSwitcher from "./components/PageSwitcher";
import SearchBar from "./components/SearchBar";

interface Pokemon {
  name: string;
  imageUrl: string;
  id: number;
  types: string[];
}

interface PokemonUrl {
  name: string;
  url: string;
}

export default function Home() {
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [initialPokemonList, setInitialPokemonList] = useState<PokemonUrl[]>([
    { name: "", url: "" },
  ]);
  const [pokemonList, setpokemonList] = useState<PokemonUrl[]>([
    { name: "", url: "" },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [searchMessage, setSearchMessage] = useState("Explore Pokémon");

  // fetch complete list of pokemon names and urls on initial page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await PokemonService.getAllPokemon();
        setInitialPokemonList(pokemonData);
        setpokemonList(pokemonData)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // fetch pokemon data for each url in the pokemon list
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await PokemonService.getPokemonFromList(
            pokemonList.slice(12 * pageNumber, 12 * (pageNumber + 1))
          )
          setDisplayedPokemons(response)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pageNumber, pokemonList]);

  // when user searches set pokemon list to filtered list
  const handleSearch = async () => {
    if (searchValue !== "") {
      const filteredList = initialPokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setpokemonList(filteredList)
      setSearchMessage(`Search results for "${searchValue}"`);
    }
  };

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
        <div className="font-semibold text-2xl">{searchMessage}</div>
        <SearchBar
          inputValue={searchValue}
          setInputValue={setSearchValue}
          placeholder="Find Pokémon"
          searchFunction={handleSearch}
        />
      </div>
      {/* pokemon grid */}
      <div className="grid grid-cols-4 max-w-fit gap-x-4 gap-y-8">
        {displayedPokemons.map((data, index) => (
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
          totalItems={pokemonList.length}
          itemsPerPage={12}
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
