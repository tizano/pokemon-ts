import { Card, Pokemon } from './schema.type';

export type CardWithPokemonAndRarity = Card & {
  pokemon: Pick<Pokemon, 'slug' | 'name'> | null;
  rarity: Pick<Pokemon, 'slug' | 'name'> | null;
};

export interface GetCardsByPokemonProps {
  pokemonSlug: string;
  raritySlug?: string;
}
