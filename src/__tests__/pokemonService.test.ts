import PokemonService from "@/app/services/pokemonService";

describe("pokemon service", () => {
  describe("get all pokemons", () => {
    describe("get pokemon list", () => {
      fetchMock.resetMocks();
      fetchMock.mockResponseOnce(
        JSON.stringify({
          count: 1304,
          next: null,
          previous: null,
          results: [
            {
              name: "bulbasaur",
              url: "https://pokeapi.co/api/v2/pokemon/1/",
            },
            {
              name: "ivysaur",
              url: "https://pokeapi.co/api/v2/pokemon/2/",
            },
            {
              name: "venusaur",
              url: "https://pokeapi.co/api/v2/pokemon/3/",
            },
          ],
        })
      );
    });
    it("returns a list of pokemon urls", async () => {
      const response = await PokemonService.getAllPokemon();
      expect(response[0]).toMatchObject({
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
      });
    });
    describe("get basic pokemon data", () => {
      beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(
          JSON.stringify({
            name: "bulbasaur",
            id: 1,
            sprites: {
              front_default: "url1",
            },
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
          })
        );
        fetchMock.mockResponseOnce(
          JSON.stringify({
            name: "ivysaur",
            id: 2,
            sprites: {
              front_default: "url2",
            },
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
          })
        );
        fetchMock.mockResponseOnce(
          JSON.stringify({
            name: "venusaur",
            id: 3,
            sprites: {
              front_default: "url3",
            },
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
          })
        );
      });
      it("reutrns list of basic pokemon data", async () => {
        const response = await PokemonService.getBasicPokemonData([
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
          {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon/2/",
          },
          {
            name: "venusaur",
            url: "https://pokeapi.co/api/v2/pokemon/3/",
          },
        ]);

        expect(response[0].name).toEqual("bulbasaur");
      });
    });
  });
  describe("get single pokemon", () => {
    describe("get pokemon data", () => {
      beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(
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
            species: {
              name: "bulbasaur",
              url: "https://pokeapi.co/api/v2/pokemon-species/1/",
            },
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
        await PokemonService.getPokemonData("bulbasaur");
        expect(fetchMock).toHaveBeenCalledWith(
          "https://pokeapi.co/api/v2/pokemon/bulbasaur",
          { method: "GET" }
        );
      });
      it("returns pokemon object with basic data", async () => {
        const response = await PokemonService.getPokemonData("bulbasaur");

        expect(response.name).toEqual("bulbasaur");
        expect(response.id).toEqual(1);
        expect(response.image).toEqual("exampleUrl");
        expect(response.height).toEqual(0.7);
        expect(response.weight).toEqual(6.9);
        expect(response.stats.hp).toEqual(45);
        expect(response.stats.attack).toEqual(49);
        expect(response.stats.defense).toEqual(49);
        expect(response.stats.specialAttack).toEqual(65);
        expect(response.stats.specialDefence).toEqual(65);
        expect(response.stats.speed).toEqual(45);
        expect(response.abilityUrl).toEqual(
          "https://pokeapi.co/api/v2/ability/65/"
        );
        expect(response.typeUrl).toEqual([
          "https://pokeapi.co/api/v2/type/12/",
          "https://pokeapi.co/api/v2/type/4/",
        ]);
        expect(response.speciesUrl).toEqual(
          "https://pokeapi.co/api/v2/pokemon-species/1/"
        );
      });
    });
    describe("get type data", () => {
      beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(
          JSON.stringify({
            name: "grass",
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
            name: "poison",
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
      });
      it("it should have given type in url", async () => {
        await PokemonService.getTypeData([
          "https://pokeapi.co/api/v2/type/12/",
        ]);
        expect(fetchMock).toHaveBeenCalledWith(
          "https://pokeapi.co/api/v2/type/12/",
          { method: "GET" }
        );
      });
      it("should return bulbasaurs weaknesses", async () => {
        const types = [
          "https://pokeapi.co/api/v2/type/12/",

          "https://pokeapi.co/api/v2/type/4/",
        ];
        const response = await PokemonService.getTypeData(types);

        expect(response.weaknesses.sort()).toEqual(
          ["fire", "flying", "psychic", "ice"].sort()
        );
        expect(response.types.sort()).toEqual(["grass", "poison"].sort());
      });
      it("given only one type returns weaknesses", async () => {
        const types = ["https://pokeapi.co/api/v2/type/12/"];
        const response = await PokemonService.getTypeData(types);

        expect(response.weaknesses.sort()).toEqual(
          ["fire", "flying", "poison", "ice", "bug"].sort()
        );
        expect(response.types).toEqual(["grass"]);
      });
      it("returns weaknesses given one type is immune and another type is weak", async () => {
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(
          JSON.stringify({
            name: "grass",
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
                },
              ],
            },
          })
        );
        fetchMock.mockResponseOnce(
          JSON.stringify({
            name: "poison",
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
        const types = [
          "https://pokeapi.co/api/v2/type/12/",
          "https://pokeapi.co/api/v2/type/4/",
        ];
        const response = await PokemonService.getTypeData(types);

        expect(response.weaknesses.sort()).toEqual(
          ["fire", "flying", "ice"].sort()
        );
        expect(response.types.sort()).toEqual(["grass", "poison"].sort());
      });
    });
    describe("get species data", () => {
      beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(
          JSON.stringify({
            genera: [
              {
                genus: "たねポケモン",
                language: {
                  name: "ja-Hrkt",
                  url: "https://pokeapi.co/api/v2/language/1/",
                },
              },
              {
                genus: "씨앗포켓몬",
                language: {
                  name: "ko",
                  url: "https://pokeapi.co/api/v2/language/3/",
                },
              },
              {
                genus: "種子寶可夢",
                language: {
                  name: "zh-Hant",
                  url: "https://pokeapi.co/api/v2/language/4/",
                },
              },
              {
                genus: "Pokémon Graine",
                language: {
                  name: "fr",
                  url: "https://pokeapi.co/api/v2/language/5/",
                },
              },
              {
                genus: "Samen-Pokémon",
                language: {
                  name: "de",
                  url: "https://pokeapi.co/api/v2/language/6/",
                },
              },
              {
                genus: "Pokémon Semilla",
                language: {
                  name: "es",
                  url: "https://pokeapi.co/api/v2/language/7/",
                },
              },
              {
                genus: "Pokémon Seme",
                language: {
                  name: "it",
                  url: "https://pokeapi.co/api/v2/language/8/",
                },
              },
              {
                genus: "Seed Pokémon",
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
              },
              {
                genus: "たねポケモン",
                language: {
                  name: "ja",
                  url: "https://pokeapi.co/api/v2/language/11/",
                },
              },
              {
                genus: "种子宝可梦",
                language: {
                  name: "zh-Hans",
                  url: "https://pokeapi.co/api/v2/language/12/",
                },
              },
            ],
            flavor_text_entries: [
              {
                flavor_text:
                  "A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.",
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
                version: {
                  name: "red",
                  url: "https://pokeapi.co/api/v2/version/1/",
                },
              },
            ],
          })
        );
      });
      it("should fetch with given url", async () => {
        await PokemonService.getSpeciesData(
          "https://pokeapi.co/api/v2/pokemon-species/1/"
        );
        expect(fetchMock).toHaveBeenCalledWith(
          "https://pokeapi.co/api/v2/pokemon-species/1/",
          { method: "GET" }
        );
      });
      it("should return english category", async () => {
        const response = await PokemonService.getSpeciesData(
          "https://pokeapi.co/api/v2/pokemon-species/1/"
        );
        expect(response.category).toEqual("Seed");
      });

      it("should return entry with no breaks", async () => {
        const response = await PokemonService.getSpeciesData(
          "https://pokeapi.co/api/v2/pokemon-species/1/"
        );
        expect(response.entry).toEqual(
          "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON."
        );
      });

      it("should return genderless if gender rate is less < 1", async () => {
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(
          JSON.stringify({
            gender_rate: -1,
            genera: [
              {
                genus: "たねポケモン",
                language: {
                  name: "ja-Hrkt",
                  url: "https://pokeapi.co/api/v2/language/1/",
                },
              },
              {
                genus: "씨앗포켓몬",
                language: {
                  name: "ko",
                  url: "https://pokeapi.co/api/v2/language/3/",
                },
              },
              {
                genus: "種子寶可夢",
                language: {
                  name: "zh-Hant",
                  url: "https://pokeapi.co/api/v2/language/4/",
                },
              },
              {
                genus: "Pokémon Graine",
                language: {
                  name: "fr",
                  url: "https://pokeapi.co/api/v2/language/5/",
                },
              },
              {
                genus: "Samen-Pokémon",
                language: {
                  name: "de",
                  url: "https://pokeapi.co/api/v2/language/6/",
                },
              },
              {
                genus: "Pokémon Semilla",
                language: {
                  name: "es",
                  url: "https://pokeapi.co/api/v2/language/7/",
                },
              },
              {
                genus: "Pokémon Seme",
                language: {
                  name: "it",
                  url: "https://pokeapi.co/api/v2/language/8/",
                },
              },
              {
                genus: "Seed Pokémon",
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
              },
              {
                genus: "たねポケモン",
                language: {
                  name: "ja",
                  url: "https://pokeapi.co/api/v2/language/11/",
                },
              },
              {
                genus: "种子宝可梦",
                language: {
                  name: "zh-Hans",
                  url: "https://pokeapi.co/api/v2/language/12/",
                },
              },
            ],
            flavor_text_entries: [
              {
                flavor_text:
                  "A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.",
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
                version: {
                  name: "red",
                  url: "https://pokeapi.co/api/v2/version/1/",
                },
              },
            ],
          })
        );
        const response = await PokemonService.getSpeciesData(
          "https://pokeapi.co/api/v2/pokemon-species/1/"
        );
        expect(response.gender).toEqual("Genderless");
      });
      it("should return male / female if gender rate is less 0 < and < 8", async () => {
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(
          JSON.stringify({
            gender_rate: 1,
            genera: [
              {
                genus: "たねポケモン",
                language: {
                  name: "ja-Hrkt",
                  url: "https://pokeapi.co/api/v2/language/1/",
                },
              },
              {
                genus: "씨앗포켓몬",
                language: {
                  name: "ko",
                  url: "https://pokeapi.co/api/v2/language/3/",
                },
              },
              {
                genus: "種子寶可夢",
                language: {
                  name: "zh-Hant",
                  url: "https://pokeapi.co/api/v2/language/4/",
                },
              },
              {
                genus: "Pokémon Graine",
                language: {
                  name: "fr",
                  url: "https://pokeapi.co/api/v2/language/5/",
                },
              },
              {
                genus: "Samen-Pokémon",
                language: {
                  name: "de",
                  url: "https://pokeapi.co/api/v2/language/6/",
                },
              },
              {
                genus: "Pokémon Semilla",
                language: {
                  name: "es",
                  url: "https://pokeapi.co/api/v2/language/7/",
                },
              },
              {
                genus: "Pokémon Seme",
                language: {
                  name: "it",
                  url: "https://pokeapi.co/api/v2/language/8/",
                },
              },
              {
                genus: "Seed Pokémon",
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
              },
              {
                genus: "たねポケモン",
                language: {
                  name: "ja",
                  url: "https://pokeapi.co/api/v2/language/11/",
                },
              },
              {
                genus: "种子宝可梦",
                language: {
                  name: "zh-Hans",
                  url: "https://pokeapi.co/api/v2/language/12/",
                },
              },
            ],
            flavor_text_entries: [
              {
                flavor_text:
                  "A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.",
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
                version: {
                  name: "red",
                  url: "https://pokeapi.co/api/v2/version/1/",
                },
              },
            ],
          })
        );
        const response = await PokemonService.getSpeciesData(
          "https://pokeapi.co/api/v2/pokemon-species/1/"
        );
        expect(response.gender).toEqual("Male / Female");
      });
      it("should return female if gender rate is 8", async () => {
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(
          JSON.stringify({
            gender_rate: 8,
            genera: [
              {
                genus: "たねポケモン",
                language: {
                  name: "ja-Hrkt",
                  url: "https://pokeapi.co/api/v2/language/1/",
                },
              },
              {
                genus: "씨앗포켓몬",
                language: {
                  name: "ko",
                  url: "https://pokeapi.co/api/v2/language/3/",
                },
              },
              {
                genus: "種子寶可夢",
                language: {
                  name: "zh-Hant",
                  url: "https://pokeapi.co/api/v2/language/4/",
                },
              },
              {
                genus: "Pokémon Graine",
                language: {
                  name: "fr",
                  url: "https://pokeapi.co/api/v2/language/5/",
                },
              },
              {
                genus: "Samen-Pokémon",
                language: {
                  name: "de",
                  url: "https://pokeapi.co/api/v2/language/6/",
                },
              },
              {
                genus: "Pokémon Semilla",
                language: {
                  name: "es",
                  url: "https://pokeapi.co/api/v2/language/7/",
                },
              },
              {
                genus: "Pokémon Seme",
                language: {
                  name: "it",
                  url: "https://pokeapi.co/api/v2/language/8/",
                },
              },
              {
                genus: "Seed Pokémon",
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
              },
              {
                genus: "たねポケモン",
                language: {
                  name: "ja",
                  url: "https://pokeapi.co/api/v2/language/11/",
                },
              },
              {
                genus: "种子宝可梦",
                language: {
                  name: "zh-Hans",
                  url: "https://pokeapi.co/api/v2/language/12/",
                },
              },
            ],
            flavor_text_entries: [
              {
                flavor_text:
                  "A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.",
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
                version: {
                  name: "red",
                  url: "https://pokeapi.co/api/v2/version/1/",
                },
              },
            ],
          })
        );
        const response = await PokemonService.getSpeciesData(
          "https://pokeapi.co/api/v2/pokemon-species/1/"
        );
        expect(response.gender).toEqual("Female");
      });
    });
  });

  describe("get ability", () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResponseOnce(
        JSON.stringify({
          flavor_text_entries: [
            {
              flavor_text: "Powers up Grass-type\nmoves in a pinch.",
              language: {
                name: "en",
                url: "https://pokeapi.co/api/v2/language/9/",
              },
              version_group: {
                name: "heartgold-soulsilver",
                url: "https://pokeapi.co/api/v2/version-group/10/",
              },
            },
          ],
          name: "overgrow"
        })
      );
    });
    it("should have given url in fetch call", async () => {
      await PokemonService.getAbilityData("https://pokeapi.co/api/v2/ability/65/");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/ability/65/",
        { method: "GET" }
      );
    });
    it("should return entry with breaks", async () => {
      const response = await PokemonService.getAbilityData(
        "https://pokeapi.co/api/v2/ability/65/"
      );
      expect(response.ability.description).toEqual("Powers up Grass-type moves in a pinch.");
      expect(response.ability.name).toEqual("overgrow");
    });
  });
});
