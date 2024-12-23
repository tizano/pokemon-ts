'use server';
import { db } from '@/db/connect';
import { card, cardRarity, pokemon } from '@/db/schema/schema';
import { CardWithPokemonAndRarity } from '@/lib/types/card.type';
import { CustomQuery } from '@/lib/types/query.type';
import { NewCard } from '@/lib/types/schema.type';
import { and, asc, desc, eq, SQL } from 'drizzle-orm';

export const getCardsByPokemon = async ({
  pokemonSlug,
  raritySlug,
  order = 'asc',
}: {
  pokemonSlug: string;
  raritySlug?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}): Promise<CustomQuery<CardWithPokemonAndRarity[]>> => {
  try {
    const where: SQL<unknown>[] = [eq(pokemon.slug, `${pokemonSlug}`)];
    if (raritySlug) {
      where.push(eq(cardRarity.slug, raritySlug));
    }

    const data = await db
      .select({
        id: card.id,
        cardNumber: card.cardNumber,
        imageUrl: card.imageUrl,
        pokedexId: card.pokedexId,
        pokemonId: card.pokemonId,
        rarityId: card.rarityId,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
        pokemon: {
          slug: pokemon.slug,
          name: pokemon.name,
        },
        rarity: {
          slug: cardRarity.slug,
          name: cardRarity.name,
        },
      })
      .from(card)
      .leftJoin(pokemon, eq(pokemon.id, card.pokemonId))
      .leftJoin(cardRarity, eq(cardRarity.id, card.rarityId))
      .where(and(...where))
      .orderBy(order === 'asc' ? asc(card.cardNumber) : desc(card.cardNumber));

    return {
      data,
    } satisfies CustomQuery<CardWithPokemonAndRarity[]>;
  } catch (error) {
    throw new Error(`Unable to fetch Pokemon : ${error}`);
  }
};

export const createCard = async (cardToInsert: NewCard) => {
  try {
    const data = await db.insert(card).values(cardToInsert);
    if (data.rowCount === 0) {
      return { error: 'Failed to create Card' };
    }
    return { data };
  } catch (error) {
    return { error: `Failed to create Card : ${error}` };
  }
};
