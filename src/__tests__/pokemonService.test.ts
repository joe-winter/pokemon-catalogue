import PokemonService from "@/app/services/pokemonService";

describe("pokemon service", () => {
  describe("get all pokemons", () => {
    beforeEach(() => {
      fetchMock.resetMocks();
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
          types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
        })
      );
      fetchMock.mockResponseOnce(
        JSON.stringify({
          id: 2,
          name: "bulbasaur",
          sprites: { front_default: "exampleUrl" },
          types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
        })
      );
      fetchMock.mockResponseOnce(
        JSON.stringify({
          id: 3,
          name: "bulbasaur",
          sprites: { front_default: "exampleUrl" },
          types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
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
        name: "bulbasaur",
        imageUrl: "exampleUrl",
        id: 1,
        types: ["grass", "poison"],
      });
    });
    it("returns the next and previous value", async () => {
      const response = await PokemonService.getPokemonPerPage(3, 0);

      expect(response.next).toEqual(true);
      expect(response.previous).toEqual(false);
    });
    it("returns a list of pokemon urls", async () => {
      const response = await PokemonService.getAllPokemon();

      expect(response[0]).toMatchObject({
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
      });
    });
  });
  describe("get single pokemon", () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResponseOnce(
        JSON.stringify({
          abilities: [
            {
              ability: {
                name: "overgrow",
                url: "https://pokeapi.co/api/v2/ability/65/",
              },
            },
          ],
          height: 7,
          name: "bulbasaur",
          id: 1,
          sprites: { front_default: "exampleUrl" },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
              },
            },
            {
              slot: 2,
              type: {
                name: "poison",
              },
            },
          ],
          weight: 69,
          stats: [
            {
              base_stat: 45,
              stat: {
                name: "hp",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "attack",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "defense",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-attack",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-defense",
              },
            },
            {
              base_stat: 45,
              stat: {
                name: "speed",
              },
            },
          ],
        })
      );
    });
    it("it should have given pokemon in url", async () => {
      await PokemonService.getPokemon("bulbasaur");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/bulbasaur",
        { method: "GET" }
      );
    });
    it("returns pokemon object with basic data", async () => {
      const response = await PokemonService.getPokemon("bulbasaur");

      expect(response.name).toEqual("bulbasaur");
      expect(response.id).toEqual(1);
      expect(response.imageUrl).toEqual("exampleUrl");
      expect(response.height).toEqual(0.7);
      expect(response.weight).toEqual(6.9);
      expect(response.type).toEqual(["grass", "poison"]);
      expect(response.ability.name).toEqual("overgrow");
      expect(response.stats.hp).toEqual(45);
      expect(response.stats.attack).toEqual(49);
      expect(response.stats.defense).toEqual(49);
      expect(response.stats.specialAttack).toEqual(65);
      expect(response.stats.specialDefence).toEqual(65);
      expect(response.stats.speed).toEqual(45);
    });
    it("should return bulbasaurs weaknesses", async () => {
      fetchMock.resetMocks();
      fetchMock.mockResponseOnce(
        JSON.stringify({
          abilities: [
            {
              ability: {
                name: "overgrow",
                url: "https://pokeapi.co/api/v2/ability/65/",
              },
            },
          ],
          height: 7,
          name: "bulbasaur",
          id: 1,
          sprites: { front_default: "exampleUrl" },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
            },
            {
              slot: 2,
              type: {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
            },
          ],
          weight: 69,
          stats: [
            {
              base_stat: 45,
              stat: {
                name: "hp",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "attack",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "defense",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-attack",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-defense",
              },
            },
            {
              base_stat: 45,
              stat: {
                name: "speed",
              },
            },
          ],
        })
      );
      fetchMock.mockResponseOnce(
        JSON.stringify({
          damage_relations: {
            double_damage_from: [
              {
                name: "flying",
                url: "https://pokeapi.co/api/v2/type/3/",
              },
              {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
              {
                name: "bug",
                url: "https://pokeapi.co/api/v2/type/7/",
              },
              {
                name: "fire",
                url: "https://pokeapi.co/api/v2/type/10/",
              },
              {
                name: "ice",
                url: "https://pokeapi.co/api/v2/type/15/",
              },
            ],
            half_damage_from: [
              {
                name: "ground",
                url: "https://pokeapi.co/api/v2/type/5/",
              },
              {
                name: "water",
                url: "https://pokeapi.co/api/v2/type/11/",
              },
              {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
              {
                name: "electric",
                url: "https://pokeapi.co/api/v2/type/13/",
              },
            ],
          },
        })
      );
      fetchMock.mockResponseOnce(
        JSON.stringify({
          damage_relations: {
            double_damage_from: [
              {
                name: "ground",
                url: "https://pokeapi.co/api/v2/type/5/",
              },
              {
                name: "psychic",
                url: "https://pokeapi.co/api/v2/type/14/",
              },
            ],
            half_damage_from: [
              {
                name: "fighting",
                url: "https://pokeapi.co/api/v2/type/2/",
              },
              {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
              {
                name: "bug",
                url: "https://pokeapi.co/api/v2/type/7/",
              },
              {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
              {
                name: "fairy",
                url: "https://pokeapi.co/api/v2/type/18/",
              },
            ],
          },
        })
      );

      const response = await PokemonService.getPokemon("bulbasaur");

      expect(response.weaknesses.sort()).toEqual([
        "fire",
        "flying",
        "psychic",
        "ice",
      ].sort());
    });
    it("given only one type returns weaknesses", async () => {
      fetchMock.resetMocks();
      fetchMock.mockResponseOnce(
        JSON.stringify({
          abilities: [
            {
              ability: {
                name: "overgrow",
                url: "https://pokeapi.co/api/v2/ability/65/",
              },
            },
          ],
          height: 7,
          name: "test",
          id: 1,
          sprites: { front_default: "exampleUrl" },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
            },
          ],
          weight: 69,
          stats: [
            {
              base_stat: 45,
              stat: {
                name: "hp",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "attack",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "defense",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-attack",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-defense",
              },
            },
            {
              base_stat: 45,
              stat: {
                name: "speed",
              },
            },
          ],
        })
      );
      fetchMock.mockResponseOnce(
        JSON.stringify({
          damage_relations: {
            double_damage_from: [
              {
                name: "flying",
                url: "https://pokeapi.co/api/v2/type/3/",
              },
              {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
              {
                name: "bug",
                url: "https://pokeapi.co/api/v2/type/7/",
              },
              {
                name: "fire",
                url: "https://pokeapi.co/api/v2/type/10/",
              },
              {
                name: "ice",
                url: "https://pokeapi.co/api/v2/type/15/",
              },
            ],
            half_damage_from: [
              {
                name: "ground",
                url: "https://pokeapi.co/api/v2/type/5/",
              },
              {
                name: "water",
                url: "https://pokeapi.co/api/v2/type/11/",
              },
              {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
              {
                name: "electric",
                url: "https://pokeapi.co/api/v2/type/13/",
              },
            ],
          },
        })
      );
      const response = await PokemonService.getPokemon("test");

      expect(response.weaknesses.sort()).toEqual([
        "fire",
        "flying",
        "poison",
        "ice",
        "bug",
      ].sort());
    })
    it("returns weaknesses given one type is immune and another tpye is weak", async () => {
      fetchMock.resetMocks();
      fetchMock.mockResponseOnce(
        JSON.stringify({
          abilities: [
            {
              ability: {
                name: "overgrow",
                url: "https://pokeapi.co/api/v2/ability/65/",
              },
            },
          ],
          height: 7,
          name: "bulbasaur",
          id: 1,
          sprites: { front_default: "exampleUrl" },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
            },
            {
              slot: 2,
              type: {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
            },
          ],
          weight: 69,
          stats: [
            {
              base_stat: 45,
              stat: {
                name: "hp",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "attack",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "defense",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-attack",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-defense",
              },
            },
            {
              base_stat: 45,
              stat: {
                name: "speed",
              },
            },
          ],
        })
      );
      fetchMock.mockResponseOnce(
        JSON.stringify({
          damage_relations: {
            double_damage_from: [
              {
                name: "flying",
                url: "https://pokeapi.co/api/v2/type/3/",
              },
              {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
              {
                name: "bug",
                url: "https://pokeapi.co/api/v2/type/7/",
              },
              {
                name: "fire",
                url: "https://pokeapi.co/api/v2/type/10/",
              },
              {
                name: "ice",
                url: "https://pokeapi.co/api/v2/type/15/",
              },
            ],
            half_damage_from: [
              {
                name: "ground",
                url: "https://pokeapi.co/api/v2/type/5/",
              },
              {
                name: "water",
                url: "https://pokeapi.co/api/v2/type/11/",
              },
              {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
              {
                name: "electric",
                url: "https://pokeapi.co/api/v2/type/13/",
              },
            ],
            no_damage_from: [
              {
                name: "psychic",
                url: "https://pokeapi.co/api/v2/type/14/",
              }
            ]
          },
        })
      );
      fetchMock.mockResponseOnce(
        JSON.stringify({
          damage_relations: {
            double_damage_from: [
              {
                name: "ground",
                url: "https://pokeapi.co/api/v2/type/5/",
              },
              {
                name: "psychic",
                url: "https://pokeapi.co/api/v2/type/14/",
              },
            ],
            half_damage_from: [
              {
                name: "fighting",
                url: "https://pokeapi.co/api/v2/type/2/",
              },
              {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
              {
                name: "bug",
                url: "https://pokeapi.co/api/v2/type/7/",
              },
              {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
              {
                name: "fairy",
                url: "https://pokeapi.co/api/v2/type/18/",
              },
            ],
          },
        })
      );

      const response = await PokemonService.getPokemon("test");

      expect(response.weaknesses.sort()).toEqual([
        "fire",
        "flying",
        "ice",
      ].sort());
    })
  });
});
