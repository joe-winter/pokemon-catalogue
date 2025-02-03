interface PokemonList {
  name: string;
  url: string;
}

interface PokemonFetchData {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonList[];
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
  public static async getPokemonList(limit: number = 0, offset: number = 0) {
    // initial fetch for list pokemon
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    const response = await fetch(url, { method: "GET" });
    const data: PokemonFetchData = await response.json();

    // loop through list and fetch details of each pokemon
    const pokemonList: Pokemon[] = [];

    for (const pokemon of data.results) {
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
}
