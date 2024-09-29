import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Modèle Pokemon
export const pokemon = pgTable('pokemon', {
  id: uuid('id').defaultRandom().primaryKey(),
  pokedexId: integer('pokedex_id').notNull(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});

export const pokemonRelations = relations(pokemon, ({ many }) => ({
  types: many(pokemonToType),
  cards: many(card),
}));

// Modèle PokemonType
export const pokemonType = pgTable('pokemon_type', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
});

export const pokemonTypeRelations = relations(pokemonType, ({ many }) => ({
  pokemons: many(pokemonToType),
}));

// Modèle PokemonToType
export const pokemonToType = pgTable('pokemon_to_type', {
  pokemonId: uuid('pokemon_id').references(() => pokemon.id),
  typeId: uuid('type_id').references(() => pokemonType.id),
});

export const pokemonToTypeRelations = relations(pokemonToType, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [pokemonToType.pokemonId],
    references: [pokemon.id],
  }),
  type: one(pokemonType, {
    fields: [pokemonToType.typeId],
    references: [pokemonType.id],
  }),
}));

// Modèle Card
export const card = pgTable('card', {
  id: uuid('id').defaultRandom().primaryKey(),
  pokemonId: uuid('pokemon_id').references(() => pokemon.id),
  cardNumber: text('card_number').notNull(),
  pokedexId: integer('pokedex_id').notNull(),
  imageUrl: text('image_url').notNull(),
  rarityId: uuid('rarity_id').references(() => cardRarity.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});

export const cardRelations = relations(card, ({ one }) => ({
  pokemon: one(pokemon, { fields: [card.pokemonId], references: [pokemon.id] }),
  rarity: one(cardRarity, {
    fields: [card.rarityId],
    references: [cardRarity.id],
  }),
}));

export const cardRarity = pgTable('card_rarity', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
});

export const cardRarityRelations = relations(cardRarity, ({ many }) => ({
  cards: many(card),
}));
