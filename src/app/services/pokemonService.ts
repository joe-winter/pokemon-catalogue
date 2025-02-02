export default class PokemonService {
  public static async getPokemonList(limit: number, offset: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`;

    const response = await fetch(url, { method: "GET" });

  }
}
