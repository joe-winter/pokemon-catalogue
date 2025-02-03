interface PokemonList {
  name: string;
  url: string;
}

interface PokemonFetchData {
  count: number,
  next: string | null;
  previous: string | null;
  results: PokemonList[]
}

interface Pokemon {
  name: string;
  imageUrl: string;
  id: number;
  types: string[]
}

export default class PokemonService {
  public static async getPokemonList(limit: number= 0, offset: number = 0) {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    const response = await fetch(url, { method: "GET" });

    const data: PokemonFetchData = await response.json()

    const res = []

    data.results.forEach(async (pokemon) => {
      const response = await fetch(pokemon.url, {method: 'GET'})
      // const data = await response.json()
      // res.push(data)
    })

    console.log("fetch data", data)

  }
}
