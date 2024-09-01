import { pokemon, card, cardType, pokemonType, pokemonToType, rarityEnum } from "./schema";

export type SelectPokemon = typeof pokemon.$inferSelect;
export type InsertPokemon = typeof pokemon.$inferInsert;

export type SelectCard = typeof card.$inferSelect;
export type InsertCard = typeof card.$inferInsert;

export type SelectCardType = typeof cardType.$inferSelect;
export type InsertCardType = typeof cardType.$inferInsert;

export type SelectPokemonType = typeof pokemonType.$inferSelect;
export type InsertPokemonType = typeof pokemonType.$inferInsert;

export type SelectPokemonToType = typeof pokemonToType.$inferSelect;
export type InsertPokemonToType = typeof pokemonToType.$inferInsert;

export type RarityEnum = typeof rarityEnum.enumValues[number];