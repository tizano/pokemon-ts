import { Pokemon, PokemonType } from './schema.type';

export type PokemonWithType = Pokemon & {
  types: PokemonType[];
};

export interface GetPokemonsProps {
  page?: number;
  itemsPerPage?: number;
  pokemonName?: string;
  pokemonTypeSlug?: string;
}

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
