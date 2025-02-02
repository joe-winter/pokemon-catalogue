import PokemonService from "@/app/services/pokemonService";

describe("pokemon service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("includes two query parameters and correct url in its request", async () => {
    const response = await PokemonService.getPokemonList(20, 0);

    // retrieve latest fetch parameters
    const fetchArgs = fetchMock.mock.lastCall;

    const url = fetchArgs?.[0];
    const options = fetchArgs?.[1];

    expect(url).toEqual("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
    expect(options?.method).toEqual("GET");
  });
});
