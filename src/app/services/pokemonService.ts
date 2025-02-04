interface PokemonUrl {
  name: string;
  url: string;
}

interface NameUrl {
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

interface TypeUrl {
  type: NameUrl;
}

interface DamageRelations {
  double_damage_from: NameUrl[];
  double_damage_to: NameUrl[];
  half_damage_from: NameUrl[];
  half_damage_to: NameUrl[];
  no_damage_from: NameUrl[];
  no_damage_to: NameUrl[];
}

interface PokemonListResponse {
  next: boolean;
  previous: boolean;
  pokemonList: Pokemon[];
}

interface PokemonDetails {
  name: string;
  id: number;
  imageUrl: string;
  description: string;
  height: number;
  category: string;
  weight: number;
  gender: string[];
  type: string[];
  weaknesses: string[];
  ability: {
    name: string;
    description: string;
  };
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefence: number;
    speed: number;
  };
}

export default class PokemonService {
  public static async getPokemonPerPage(limit: number = 0, offset: number = 0) {
    // initial fetch for list pokemon
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    const response = await fetch(url, { method: "GET" });
    const data: PokemonFetchData = await response.json();

    const pokemonList = await this.getPokemonFromList(data.results);

    const res: PokemonListResponse = {
      next: data.next !== null ? true : false,
      previous: data.previous !== null ? true : false,
      pokemonList,
    };

    return res;
  }

  private static async getWeaknesses(types: TypeUrl[]) {
    let doubleDamageFrom: string[] = [];
    let halfDamageFrom: string[] = [];
    let noDamageFrom: string[] = [];
    for (const type of types) {
      if (type.type.url) {
        const response = await fetch(type.type.url);
        const data = await response.json();
        const damageRelations: DamageRelations = data.damage_relations;
        if (damageRelations.double_damage_from) {
          const doubleDamageFromNames = damageRelations.double_damage_from.map(
            (element) => element.name
          );
          doubleDamageFrom = doubleDamageFrom.concat(doubleDamageFromNames);
        }
        if (damageRelations.half_damage_from) {
          const halfDamageFromNames = damageRelations.half_damage_from.map(
            (element) => element.name
          );
          halfDamageFrom = halfDamageFrom.concat(halfDamageFromNames);
        }
        if (damageRelations.no_damage_from) {
          const noDamageFromNames = damageRelations.no_damage_from.map(
            (element) => element.name
          );
          noDamageFrom = noDamageFrom.concat(noDamageFromNames);
        }
      }
    }
    doubleDamageFrom = [...new Set(doubleDamageFrom)];
    halfDamageFrom = [...new Set(halfDamageFrom)];
    noDamageFrom = [...new Set(noDamageFrom)];
    console.log("double damage", doubleDamageFrom);
    console.log("double damage", doubleDamageFrom);

    // remove from double damage list if in half damage list
    const array = doubleDamageFrom.filter(
      (element) => halfDamageFrom.indexOf(element) < 0
    );
    console.log("first filter", array);
    // remove from array if in no damage from list
    const array2 = array.filter((element) => noDamageFrom.indexOf(element) < 0);
    console.log("second filter", array2);
    return array2;
  }

  private static getTypes(types: TypeUrl[]) {
    // converts list of objects into list of strings
    return types.map((type) => type.type.name);
  }

  public static async getAllPokemon() {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
      { method: "GET" }
    );
    const data: PokemonFetchData = await response.json();
    return data.results;
  }

  public static async getPokemonFromList(pokemonUrlList: PokemonUrl[]) {
    const pokemonList: Pokemon[] = [];

    for (const pokemon of pokemonUrlList) {
      const response = await fetch(pokemon.url, { method: "GET" });
      const data = await response.json();
      const convertedPokemon = {
        name: data.name,
        id: data.id,
        imageUrl: data.sprites.front_default,
        types: this.getTypes(data.types),
      };
      pokemonList.push(convertedPokemon);
    }

    return pokemonList;
  }

  public static async getPokemon(pokemonName: string): Promise<PokemonDetails> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      {
        method: "GET",
      }
    );
    const basicData = await response.json();

    return {
      name: basicData.name,
      id: basicData.id,
      imageUrl: basicData.sprites.front_default,
      description: "",
      height: basicData.height / 10,
      category: "",
      weight: basicData.weight / 10,
      gender: [""],
      type: this.getTypes(basicData.types),
      weaknesses: await this.getWeaknesses(basicData.types),
      ability: {
        name: basicData.abilities[0].ability.name,
        description: "",
      },
      stats: {
        hp: basicData.stats[0].base_stat,
        attack: basicData.stats[1].base_stat,
        defense: basicData.stats[2].base_stat,
        specialAttack: basicData.stats[3].base_stat,
        specialDefence: basicData.stats[4].base_stat,
        speed: basicData.stats[5].base_stat,
      },
    };
  }
}
