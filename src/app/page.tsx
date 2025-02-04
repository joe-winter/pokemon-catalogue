"use client";
import { useEffect, useMemo, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonService from "./services/pokemonService";
import PageSwitcher from "./components/PageSwitcher";
import SearchBar from "./components/SearchBar";

// import { MoveRight } from "lucide-react";
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
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pokemonList, setPokemonList] = useState<PokemonUrl[]>([
    { name: "", url: "" },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [searchMessage, setSearchMessage] = useState("Explore Pokémon");
  const [search, setSearch] = useState(false);

  // fetch list of pokemon names and urls on initial page load
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

  // when the search value is changed the list of urls is filtered
  const filteredList = useMemo(() => {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [pokemonList, searchValue]);

  // fetch pokemon data for each url in the url list or filtered url list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = search ? filteredList : pokemonList;
        const response = await PokemonService.getPokemonFromList(
          list.slice(12 * pageNumber, 12 * (pageNumber + 1))
        );
        setPokemons(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [filteredList, pageNumber, pokemonList, search]);

  // when user searches fetch data from filtered url list and update search status
  const handleSearch = async () => {
    console.log("hello")
    if (searchValue !== "") {
      const filteredList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      const response = await PokemonService.getPokemonFromList(
        filteredList.slice(12 * pageNumber, 12 * (pageNumber + 1))
      );
      setPokemons(response);
      setSearchMessage(`Search results for "${searchValue}"`);
      setSearch(true);
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
        {pokemons.map((data, index) => (
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
