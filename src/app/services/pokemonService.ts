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

interface Type {
  type: NameUrl;
}

interface BasicPokemon {
  name: string;
  id: number;
  image: string;
  types: string[];
}

interface DamageRelations {
  double_damage_from: NameUrl[];
  double_damage_to: NameUrl[];
  half_damage_from: NameUrl[];
  half_damage_to: NameUrl[];
  no_damage_from: NameUrl[];
  no_damage_to: NameUrl[];
}

interface Genus {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}

interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}

interface TypeData {
  types: string[];
  weaknesses: string[];
}

interface AbilityData {
  ability: {
    name: string;
    description: string;
  };
}

interface SpeciesData {
  entry: string;
  gender: string;
  category: string;
}

interface PokemonData {
  name: string;
  id: number;
  image: string;
  height: number;
  weight: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefence: number;
    speed: number;
  };
  typeUrl: string[];
  abilityUrl: string;
  speciesUrl: string;
}

export default class PokemonService {
  // GET BASIC POKEMON DATA

  public static async getAllPokemon() {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
      { method: "GET" }
    );

    if (response.status !== 200) {
      throw new Error("Unable to fetch pokemon list");
    }
    const data: PokemonFetchData = await response.json();
    return data.results;
  }

  public static async getBasicPokemonData(
    pokemonUrlList: PokemonUrl[]
  ): Promise<BasicPokemon[]> {
    const pokemonList: BasicPokemon[] = [];
    for (const pokemon of pokemonUrlList) {
      const response = await fetch(pokemon.url, { method: "GET" });
      if (response.status !== 200) {
        throw new Error("Unable to fetch pokemon data");
      }
      const data = await response.json();
      const basicPokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        types: data.types.map((type: Type) => type.type.name),
      };
      pokemonList.push(basicPokemon);
    }

    return pokemonList;
  }

  // GET DETAILED POKEMON DATA

  // /pokemon

  public static async getPokemonData(
    pokemonName: string
  ): Promise<PokemonData> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      {
        method: "GET",
      }
    );
    if (response.status !== 200) {
      throw new Error("Unable to fetch detailed pokemon data");
    }
    const basicData = await response.json();

    return {
      name: basicData.name,
      id: basicData.id,
      image: basicData.sprites.front_default,
      height: basicData.height / 10,
      weight: basicData.weight / 10,
      stats: {
        hp: basicData.stats[0].base_stat,
        attack: basicData.stats[1].base_stat,
        defense: basicData.stats[2].base_stat,
        specialAttack: basicData.stats[3].base_stat,
        specialDefence: basicData.stats[4].base_stat,
        speed: basicData.stats[5].base_stat,
      },
      typeUrl: basicData.types.map((type: Type) => type.type.url),
      speciesUrl: basicData.species.url,
      abilityUrl: basicData.abilities[0].ability.url,
    };
  }

  // /type

  public static async getTypeData(typeUrl: string[]): Promise<TypeData> {
    const types: string[] = [];
    const damageRelations: DamageRelations[] = [];
    for (const url of typeUrl) {
      const response = await fetch(url, { method: "GET" });
      if (response.status !== 200) {
        throw new Error("Unable to fetch pokemon type data");
      }
      const data = await response.json();
      damageRelations.push(data.damage_relations);
      types.push(data.name);
    }
    const weaknesses = await this.getWeaknesses(damageRelations);
    return { types, weaknesses };
  }

  public static async getWeaknesses(damageRelations: DamageRelations[]) {
    let doubleDamageFrom: string[] = [];
    let halfDamageFrom: string[] = [];
    let noDamageFrom: string[] = [];
    for (const damageRelation of damageRelations) {
      const doubleDamageFromNames = damageRelation.double_damage_from?.map(
        (element) => element.name
      );
      doubleDamageFrom = doubleDamageFrom.concat(doubleDamageFromNames);
      const halfDamageFromNames = damageRelation.half_damage_from?.map(
        (element) => element.name
      );
      halfDamageFrom = halfDamageFrom.concat(halfDamageFromNames);
      const noDamageFromNames = damageRelation.no_damage_from?.map(
        (element) => element.name
      );
      noDamageFrom = noDamageFrom.concat(noDamageFromNames);
    }
    doubleDamageFrom = [...new Set(doubleDamageFrom)];
    halfDamageFrom = [...new Set(halfDamageFrom)];
    noDamageFrom = [...new Set(noDamageFrom)];

    // remove from double damage list if in half damage list
    const array = doubleDamageFrom.filter(
      (element) => halfDamageFrom.indexOf(element) < 0
    );
    // remove from array if in no damage from list
    const array2 = array.filter((element) => noDamageFrom.indexOf(element) < 0);
    return array2;
  }

  // /pokemon-species

  public static async getSpeciesData(speciesUrl: string): Promise<SpeciesData> {
    const response = await fetch(speciesUrl, { method: "GET" });
    if (response.status !== 200) {
      throw new Error("Unable to fetch pokemon species data");
    }
    const data = await response.json();
    const entry = this.getEnglishFlavorText(data.flavor_text_entries);
    const genera: Genus[] = data.genera;
    const genus = genera.filter((genus) => genus.language.name === "en");
    // remove pokemon word from genus
    const category = genus[0].genus.split(" ")[0];
    const gender = this.getGender(data.gender_rate);
    return {
      entry,
      category,
      gender,
    };
  }

  public static getGender(genderRate: number) {
    if (genderRate < 1) {
      return "Genderless";
    } else if (genderRate > 0 && genderRate < 8) {
      return "Male / Female";
    } else {
      return "Female";
    }
  }

  public static async getAbilityData(abilityUrl: string): Promise<AbilityData> {
    const response = await fetch(abilityUrl, { method: "GET" });
    if (response.status !== 200) {
      throw new Error("Unable to fetch pokemon ability data");
    }
    const data = await response.json();
    return {
      ability: {
        name: data.name,
        description: this.getEnglishFlavorText(data.flavor_text_entries),
      },
    };
  }

  private static getEnglishFlavorText(flavorTextList: FlavorText[]): string {
    const englishDescription: FlavorText[] = flavorTextList.filter(
      (element: FlavorText) => element.language.name === "en"
    );
    const formattedDescription = englishDescription[0].flavor_text.replace(
      /[\f\n]+/gm,
      " "
    );
    return formattedDescription;
  }
}
