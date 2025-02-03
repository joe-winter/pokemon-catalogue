interface PokemonUrl {
  name: string;
  url: string;
}

interface PokemonFetchData {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonUrl[];
}

interface Pokemon {
  name: string;
  imageUrl: string;
  id: number;
  types: string[];
}

interface Type {
  type: {
    name: string;
    url: string;
  };
}

interface PokemonListResponse {
  next: boolean;
  previous: boolean;
  pokemonList: Pokemon[]
}

export default class PokemonService {
  public static async getPokemonPerPage(limit: number = 0, offset: number = 0) {
    // initial fetch for list pokemon
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    const response = await fetch(url, { method: "GET" });
    const data: PokemonFetchData = await response.json();

    const pokemonList = await this.getPokemonFromList(data.results)

    const res: PokemonListResponse = {
      next: data.next !== null ? true : false,
      previous: data.previous !== null ? true : false,
      pokemonList
    }

    return res;
  }

  private static convertTypes(types: Type[]) {
    // converts list of objects into list of strings
    return types.map((type) => type.type.name);
  }

  public static async getAllPokemon () {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", { method: "GET" })
    const data: PokemonFetchData = await response.json()
    return data.results
  }

  public static async getPokemonFromList (pokemonUrlList: PokemonUrl[]) {
    const pokemonList: Pokemon[] = [];

    for (const pokemon of pokemonUrlList) {
      const response = await fetch(pokemon.url, { method: "GET" });
      const data = await response.json();
      const convertedPokemon = {
        name: data.name,
        id: data.id,
        imageUrl: data.sprites.front_default,
        types: this.convertTypes(data.types),
      };
      pokemonList.push(convertedPokemon);
    }

    return pokemonList
  }
}
