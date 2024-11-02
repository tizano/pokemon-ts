'use server';

import { db } from '@/db/connect';
import { cardRarity } from '@/db/schema/schema';
import { CustomQuery } from '@/lib/types/query.type';
import { CardRarity } from '@/lib/types/schema.type';
import { asc } from 'drizzle-orm';

export const getCardRarities = async (): Promise<CustomQuery<CardRarity[]>> => {
  try {
    const data = await db.select().from(cardRarity).orderBy(asc(cardRarity.name));
    return { data };
  } catch (error) {
    throw new Error(`Unable to fetch card rarities : ${error}`);
  }
};
