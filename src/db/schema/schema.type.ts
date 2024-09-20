import { card, cardType, pokemon, pokemonToType, pokemonType, rarityEnum } from './schema';

export type Pokemon = typeof pokemon.$inferSelect;
export type NewPokemon = typeof pokemon.$inferInsert;

export type Card = typeof card.$inferSelect;
export type NewCard = typeof card.$inferInsert;

export type CardType = typeof cardType.$inferSelect;
export type NewCardType = typeof cardType.$inferInsert;

export type PokemonType = typeof pokemonType.$inferSelect;
export type NewPokemonType = typeof pokemonType.$inferInsert;

export type PokemonToType = typeof pokemonToType.$inferSelect;
export type NewPokemonToType = typeof pokemonToType.$inferInsert;

export type RarityEnum = (typeof rarityEnum.enumValues)[number];

export type ListWithPagination<T> = {
  data: T;
  page: number;
  itemsPerPage: number;
  count: number;
};
