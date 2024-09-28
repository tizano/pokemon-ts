import { Card, Pokemon } from './schema.type';
import { AddNullable } from './utils.type';

export type CardWithPokemon = {
  card: Card;
  pokemon: AddNullable<Pokemon> | null;
};

export type CardForSeed = {
  localId: string;
  dexId: number[] | null;
  types: string[] | null;
  rarity: string;
  name: string;
  level: null;
  image: string | null;
  hp: number | null;
  energyType: string | null;
  description: string | null;
  category: string;
};

export type CardSetForSeed = {
  name: string;
  cards: CardForSeed[];
};
