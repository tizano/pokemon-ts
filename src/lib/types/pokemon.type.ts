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
