export type CardForSeed = {
  localId: string;
  dexId: number[] | null;
  types: string[] | null;
  rarity: string;
  name: string;
  image: string | null;
};

export type CardsForSeed = Array<{
  cards: CardForSeed[];
}>;

export type PokemonTypeForSeed = {
  id: number;
  name: string;
  image: string;
  englishName: string;
};

export type PokemonForSeed = {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  slug: string;
  stats: {
    HP: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  apiTypes: Array<{
    name: string;
    image: string;
  }>;
  apiGeneration: number;
  apiResistances: Array<{
    name: string;
    damage_multiplier: number;
    damage_relation: 'neutral' | 'resistant' | 'vulnerable' | 'twice_resistant';
  }>;
  resistanceModifyingAbilitiesForApi: unknown[]; // Type plus précis si nécessaire
  apiEvolutions: Array<{
    name: string;
    pokedexId: number;
  }>;
  apiPreEvolution: string;
  apiResistancesWithAbilities: unknown[]; // Type plus précis si nécessaire
};
