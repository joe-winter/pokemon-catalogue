"use client";
import { useEffect, useMemo, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonService from "./services/pokemonService";
import PageSwitcher from "./components/PageSwitcher";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import Link from "next/link";
import { usePage } from "./components/PageProvider";
interface Pokemon {
  name: string;
  image: string;
  id: number;
  types: string[];
}

interface PokemonUrl {
  name: string;
  url: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  // const [pageNumber, setPageNumber] = useState(0);
  const {pageNumber, setPageNumber} = usePage()
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
        setpokemonList(pokemonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const searchList = useMemo(() => {
    const list = initialPokemonList.map(element => element.name)
    return list.filter((element) =>
      element.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [initialPokemonList, searchValue]);

  // fetch pokemon data for each url in the pokemon list
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await PokemonService.getBasicPokemonData(
          pokemonList.slice(12 * pageNumber, 12 * (pageNumber + 1))
        );
        setDisplayedPokemons(response);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageNumber, pokemonList]);

  // when user searches set pokemon list to filtered list
  const handleSearch = async () => {
    if (searchValue !== "") {
      setPageNumber(0);
      const filteredList = initialPokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setpokemonList(filteredList);
      setSearchMessage(`Search results for "${searchValue}"`);
    } else {
      setPageNumber(0);
      setpokemonList(initialPokemonList);
      setSearchMessage("Explore Pokémon")
    }
  };

  return (
    <div className="max-w-full flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* title header */}
      <div className="flex flex-col border-b items-center mb-8 w-full">
        <h1 className="font-semibold text-4xl mt-12">Pokémon Browser</h1>
        <h2 className="font-semibold text-gray-500 text-lg mb-14">
          Search and find Pokémon
        </h2>
      </div>
      {/* main content */}
      <div className="w-full flex flex-col md:max-w-5xl px-2">
        {/* search bar */}
        <div className="flex sm:flex-row flex-col items-center justify-between mb-8">
          <div className="font-semibold text-2xl md:mb-0 mb-4">{searchMessage}</div>
          <SearchBar
            inputValue={searchValue}
            setInputValue={setSearchValue}
            placeholder="Find Pokémon"
            searchFunction={handleSearch}
            disabled={isLoading}
            searchList={searchList}
          />
        </div>
        {/* pokemon grid */}
        <div className="mb-8">
          {isLoading ? (
            <div className="h-[1100px] flex">
              <div className=" m-auto">
                <LoadingSpinner />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-fit gap-x-2 gap-y-4  sm:gap-x-3 sm:gap-y-6 md:gap-x-4 md:gap-y-8 mx-auto">
              {displayedPokemons.map((data, index) => (
                <Link key={index} href={`/${data.name}`}>
                  <PokemonCard
                    name={data.name}
                    imageUrl={data.image !== null ? data.image : ""}
                    number={"#" + data.id.toString().padStart(4, "0")}
                    types={data.types}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* page switcher */}
        <div className="m-8 flex justify-center">
          <PageSwitcher
            totalItems={pokemonList.length}
            itemsPerPage={12}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            disabled={isLoading}
          />
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
