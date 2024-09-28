import { env } from '@/env/server';
import { setRarity } from '@/lib/utils';
import { PokemonForSeed, PokemonTypeForSeed } from '@/types/pokemon.type';
import { NewCard, NewCardType, NewPokemon, NewPokemonToType, NewPokemonType } from '@/types/schema.type';
import { db } from './connect';
import { dataPokemonCardsSet } from './data-pokemon-cards';
import { card, cardType, pokemon, pokemonToType, pokemonType } from './schema/schema'; // Importez vos tables

async function clearBeforeSeed() {
  await db.delete(pokemonToType);
  await db.delete(pokemonType);
  await db.delete(card);
  await db.delete(cardType);
  await db.delete(pokemon);
}

async function getPokemonsFromApi(): Promise<PokemonForSeed[]> {
  const getPokemons = await fetch(`${env.POKEMON_API_URL}pokemon/limit/151`);
  if (getPokemons.ok) {
    const result: PokemonForSeed[] = await getPokemons.json();
    return result;
  }
  return [];
}

async function getPokemonTypesFromApi(): Promise<PokemonTypeForSeed[]> {
  const getPokemonTypes = await fetch(`${env.POKEMON_API_URL}types`);
  if (getPokemonTypes.ok) {
    const result: PokemonTypeForSeed[] = await getPokemonTypes.json();
    return result;
  }
  return [];
}

// TODO : si null mettre la carte placeholder ou bien la carte EN
const setImage = (imageUrl: string | null) =>
  imageUrl === null ? '/loader-poekmon-card.jpg' : `${imageUrl}/high.webp`;

async function seed() {
  const pokemonsToTransform = await getPokemonsFromApi();
  // Récupérer les données de l'API
  const pokemonsToInsert: NewPokemon[] = [];
  pokemonsToTransform.map((pokemon) => {
    pokemonsToInsert.push({
      name: pokemon.name,
      slug: `${pokemon.slug.toLowerCase()}-${pokemon.pokedexId}`,
      imageUrl: pokemon.image,
      pokedexId: pokemon.pokedexId,
    });
  });

  const pokemonTypesToInsert: NewPokemonType[] = [];
  const pokemonTypesTransform = await getPokemonTypesFromApi();
  pokemonTypesTransform.map((type) => {
    pokemonTypesToInsert.push({
      name: type.name,
      slug: type.englishName.toLowerCase(),
    });
  });
  // Insérer les Pokémon dans la base de données
  const insertedPokemon = await db.insert(pokemon).values(pokemonsToInsert).returning();
  // Insérer les types de Pokémon
  const insertedPokemonType = await db.insert(pokemonType).values(pokemonTypesToInsert).returning();
  const pokemonToTypesToInsert: NewPokemonToType[] = [];
  insertedPokemon.forEach((dbPokemon) => {
    const apiPokemon = pokemonsToTransform.find((p) => p.name === dbPokemon.name);
    if (apiPokemon && apiPokemon.apiTypes.length > 0) {
      apiPokemon.apiTypes.forEach((apiType) => {
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

  // Insérer les associations Pokémon -> Types
  await db.insert(pokemonToType).values(pokemonToTypesToInsert);
  // Types de cartes (par exemple, Base, EX, etc.)
  const cardTypes: NewCardType[] = [{ name: 'Base' }, { name: 'EX' }, { name: 'GX' }, { name: 'VMAX' }];
  // Insérer les types de cartes
  const cardTypesInserted = await db.insert(cardType).values(cardTypes).returning();

  const cardsToInsert: NewCard[] = [];

  insertedPokemon.forEach((pokemon) => {
    dataPokemonCardsSet.forEach((cardSet) => {
      cardSet.cards.forEach((card) => {
        // check if the current card is for the current pokemon by name
        if (card.name.toLowerCase().includes(pokemon.name.toLowerCase())) {
          cardsToInsert.push({
            pokedexId: pokemon.pokedexId,
            cardNumber: card.localId,
            pokemonId: pokemon.id,
            imageUrl: setImage(card.image),
            cardTypeId: cardTypesInserted.find((ct) => ct.name === 'Base')?.id || '',
            rarity: setRarity(card.rarity),
          });
        }
      });
    });
  });
  // Insérer les cartes Pokémon
  await db.insert(card).values(cardsToInsert);
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
