import PokemonService from "@/app/services/pokemonService";

describe("pokemon service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.mockResponseOnce(
      JSON.stringify({
        count: 1304,
        next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
          { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
        ],
      })
    );
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 1,
        name: "bulbasaur",
        sprites: { front_default: "exampleUrl" },
        types: [{type: { name: "grass" }}, {type: { name: "poison" }}],
      })
    );
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 2,
        name: "bulbasaur",
        sprites: { front_default: "exampleUrl" },
        types: [{type: { name: "grass" }}, {type: { name: "poison" }}],
      })
    );
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 3,
        name: "bulbasaur",
        sprites: { front_default: "exampleUrl" },
        types: [{type: { name: "grass" }}, {type: { name: "poison" }}],
      })
    );
  });
  it("includes two query parameters and correct url in its request", async () => {
    await PokemonService.getPokemonPerPage(3, 0);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=3",
      { method: "GET" }
    );
  });
  it("calls a fetch for each pokemon in the list", async () => {
    await PokemonService.getPokemonPerPage(3, 0);
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://pokeapi.co/api/v2/pokemon/1/",
      { method: "GET" }
    );
  });
  it("returns pokemon details", async () => {

    const response = await PokemonService.getPokemonPerPage(3, 0);

    expect(response.pokemonList[0]).toMatchObject({
      name: 'bulbasaur',
      imageUrl: "exampleUrl",
      id: 1,
      types: ["grass", "poison"]
    })
  });
  it("returns the next and previous value", async () => {
    const response = await PokemonService.getPokemonPerPage(3, 0);

    expect(response.next).toEqual(true)
    expect(response.previous).toEqual(false)
  })
});
