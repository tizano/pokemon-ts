import { env } from '@/config/env';
import { db } from '@/db/connect';
import { NewCard, NewCardRarity, NewPokemon, NewPokemonToType, NewPokemonType } from '@/lib/types/schema.type';
import { CardForSeed, PokemonForSeed, PokemonTypeForSeed } from '@/lib/types/seed.type';
import { basePokemonCards } from './data/0-base-pokemon-cards';
import { gymPokemonCards } from './data/1-gym-pokemon-cards';
import { hgssPokemonCards } from './data/10-hgss-pokemon-card';
import { colPokemonCards } from './data/11-col-pokemon-card';
import { bwPokemonCards } from './data/12-bw-pokemon-card';
import { mcPokemonCards } from './data/13-mc-pokemon-card';
import { xyPokemonCards } from './data/14-xy-pokemon-card';
import { smPokemonCards } from './data/15-sm-pokemon-card';
import { swshPokemonCards } from './data/16-swsh-pokemon-card';
import { svPokemonCards } from './data/17-sv-pokemon-card';
import { neoPokemonCards } from './data/2-neo-pokemon-cards';
import { lcPokemonCards } from './data/3-lc-pokemon-cards';
import { ecardPokemonCards } from './data/4-ecard-pokemon-card';
import { exPokemonCards } from './data/5-ex-pokemon-card';
import { popPokemonCards } from './data/6-pop-pokemon-card';
import { tkPokemonCards } from './data/7-tk-pokemon-card';
import { dpPokemonCards } from './data/8-dp-pokemon-card';
import { plPokemonCards } from './data/9-pl-pokemon-card';
import { cardRarities } from './data/card-rarity';
import { card, cardRarity, pokemon, pokemonToType, pokemonType } from './schema/schema';

async function clearBeforeSeed() {
  await db.delete(pokemonToType);
  await db.delete(pokemonType);
  await db.delete(card);
  await db.delete(cardRarity);
  await db.delete(pokemon);
}

async function fetchData<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  }
  return [];
}

async function insertCards<T extends { cards: CardForSeed[] }>(
  cardSets: T[],
  insertedPokemon: NewPokemon[],
  cardRarities: NewCardRarity[],
): Promise<NewCard[]> {
  const cardsToInsert = cardSets.flatMap((cardSet) =>
    cardSet.cards
      .map((card) => {
        const matchingPokemon = insertedPokemon.find(
          (p) => card.dexId?.includes(p.pokedexId) || card.name.toLowerCase().includes(p.name.toLowerCase()),
        );
        if (matchingPokemon) {
          return {
            pokedexId: matchingPokemon.pokedexId,
            cardNumber: card.localId,
            pokemonId: matchingPokemon.id,
            imageUrl: card.image ? `${card.image}/high.webp` : '',
            rarityId: cardRarities.find((rarity) => rarity.name === card.rarity)?.id,
          };
        }
        return null;
      })
      .filter((card) => card !== null),
  );

  return cardsToInsert;
}

async function seed() {
  const LIMIT = ''; // Limit to the first 151 Pokémon '/limit/151' or '' for all
  const [pokemonsToTransform, pokemonTypesTransform] = await Promise.all([
    fetchData<PokemonForSeed>(`${env.POKEMON_API_URL}pokemon${LIMIT}`),
    fetchData<PokemonTypeForSeed>(`${env.POKEMON_API_URL}types`),
  ]);

  const pokemonsToInsert: NewPokemon[] = pokemonsToTransform.map((pokemon) => ({
    name: pokemon.name,
    slug: `${pokemon.slug.toLowerCase()}-${pokemon.pokedexId}`, // avoid duplicate for nidoran
    imageUrl: pokemon.image,
    pokedexId: pokemon.pokedexId,
  }));

  const pokemonTypesToInsert: NewPokemonType[] = pokemonTypesTransform.map((type) => ({
    name: type.name,
    slug: type.englishName.toLowerCase(),
  }));

  const [insertedPokemon, insertedPokemonType]: [NewPokemon[], NewPokemonType[]] = await Promise.all([
    db.insert(pokemon).values(pokemonsToInsert).returning(),
    db.insert(pokemonType).values(pokemonTypesToInsert).returning(),
  ]);

  const pokemonToTypesToInsert: NewPokemonToType[] = [];
  insertedPokemon.map((dbPokemon) => {
    const apiPokemon = pokemonsToTransform.find((p) => p.name === dbPokemon.name);
    if (apiPokemon && apiPokemon.apiTypes.length > 0) {
      apiPokemon.apiTypes.map((apiType) => {
        const typeId = insertedPokemonType.find((t) => t.name === apiType.name)?.id;
        if (typeId) {
          pokemonToTypesToInsert.push({
            pokemonId: dbPokemon.id,
            typeId: typeId,
          });
        }
      });
    }
  });

  await db.insert(pokemonToType).values(pokemonToTypesToInsert);
  const cardRaritiesInserted = await db
    .insert(cardRarity)
    .values(cardRarities satisfies NewCardRarity[])
    .returning();

  const basePokemonData: NewCard[] = await insertCards(basePokemonCards, insertedPokemon, cardRaritiesInserted);
  const gymPokemonData: NewCard[] = await insertCards(gymPokemonCards, insertedPokemon, cardRaritiesInserted);
  const neoPokemonData: NewCard[] = await insertCards(neoPokemonCards, insertedPokemon, cardRaritiesInserted);
  const lcPokemonData: NewCard[] = await insertCards(lcPokemonCards, insertedPokemon, cardRaritiesInserted);
  const ecardPokemonData: NewCard[] = await insertCards(ecardPokemonCards, insertedPokemon, cardRaritiesInserted);
  const exPokemonData: NewCard[] = await insertCards(exPokemonCards, insertedPokemon, cardRaritiesInserted);
  const popPokemonData: NewCard[] = await insertCards(popPokemonCards, insertedPokemon, cardRaritiesInserted);
  const tkPokemonData: NewCard[] = await insertCards(tkPokemonCards, insertedPokemon, cardRaritiesInserted);
  const dpPokemonData: NewCard[] = await insertCards(dpPokemonCards, insertedPokemon, cardRaritiesInserted);
  const plPokemonData: NewCard[] = await insertCards(plPokemonCards, insertedPokemon, cardRaritiesInserted);
  const hgssPokemonData: NewCard[] = await insertCards(hgssPokemonCards, insertedPokemon, cardRaritiesInserted);
  const colPokemonData: NewCard[] = await insertCards(colPokemonCards, insertedPokemon, cardRaritiesInserted);
  const bwPokemonData: NewCard[] = await insertCards(bwPokemonCards, insertedPokemon, cardRaritiesInserted);
  const mcPokemonData: NewCard[] = await insertCards(mcPokemonCards, insertedPokemon, cardRaritiesInserted);
  const xyPokemonData: NewCard[] = await insertCards(xyPokemonCards, insertedPokemon, cardRaritiesInserted);
  const smPokemonData: NewCard[] = await insertCards(smPokemonCards, insertedPokemon, cardRaritiesInserted);
  const swshPokemonData: NewCard[] = await insertCards(swshPokemonCards, insertedPokemon, cardRaritiesInserted);
  const svPokemonData: NewCard[] = await insertCards(svPokemonCards, insertedPokemon, cardRaritiesInserted);

  await Promise.all([
    db.insert(card).values(basePokemonData),
    db.insert(card).values(gymPokemonData),
    db.insert(card).values(neoPokemonData),
    db.insert(card).values(lcPokemonData),
    db.insert(card).values(ecardPokemonData),
    db.insert(card).values(exPokemonData),
    db.insert(card).values(popPokemonData),
    db.insert(card).values(tkPokemonData),
    db.insert(card).values(dpPokemonData),
    db.insert(card).values(plPokemonData),
    db.insert(card).values(hgssPokemonData),
    db.insert(card).values(colPokemonData),
    db.insert(card).values(bwPokemonData),
    db.insert(card).values(mcPokemonData),
    db.insert(card).values(xyPokemonData),
    db.insert(card).values(smPokemonData),
    db.insert(card).values(swshPokemonData),
    db.insert(card).values(svPokemonData),
  ]);
}

async function main() {
  try {
    await clearBeforeSeed();
    await seed();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

main();
