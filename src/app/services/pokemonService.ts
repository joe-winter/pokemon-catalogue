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
  name: string;
  url: string;
}

export default class PokemonService {
  public static async getPokemonList(limit: number = 0, offset: number = 0) {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    const response = await fetch(url, { method: "GET" });

    const data: PokemonFetchData = await response.json();

    const pokemonList: Pokemon[] = []

    for (const pokemon of data.results) {
      const response = await fetch(pokemon.url, { method: "GET" });
      console.log(response)
      const data = await response.json();
      const convertedPokemon = {
        name: data.name,
        id: data.id,
        imageUrl: data.sprites.front_default,
        types: this.convertTypes(data.types),
      };
      pokemonList.push(convertedPokemon)
    }

    return pokemonList
    
  }

  private static convertTypes (types: Type[]) {
    return types.map((type) => type.name)

  }
}


