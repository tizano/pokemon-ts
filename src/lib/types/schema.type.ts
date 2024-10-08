import { card, cardRarity, pokemon, pokemonToType, pokemonType } from '@/db/schema/schema';

export type Pokemon = typeof pokemon.$inferSelect;
export type NewPokemon = typeof pokemon.$inferInsert;

export type Card = typeof card.$inferSelect;
export type NewCard = typeof card.$inferInsert;

export type CardRarity = typeof cardRarity.$inferSelect;
export type NewCardRarity = typeof cardRarity.$inferInsert;

export type PokemonType = typeof pokemonType.$inferSelect;
export type NewPokemonType = typeof pokemonType.$inferInsert;

export type PokemonToType = typeof pokemonToType.$inferSelect;
export type NewPokemonToType = typeof pokemonToType.$inferInsert;
