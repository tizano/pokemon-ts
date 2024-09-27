import { Pokemon, PokemonToType, PokemonType } from './schema.type';
import { AddNullable } from './utils.type';

export type PokemonWithType = {
  pokemon: Pokemon;
  pokemon_type: PokemonType;
  pokemon_to_type: AddNullable<PokemonToType> | null;
};

export interface GetPokemonsProps {
  page?: number;
  itemsPerPage?: number;
  pokemonName?: string;
  pokemonTypeSlug?: string;
}
