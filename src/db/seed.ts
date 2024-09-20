import { card, cardType, pokemon, pokemonToType, pokemonType } from './schema/schema'; // Importez vos tables
import { NewCard, NewCardType, NewPokemon, NewPokemonToType, NewPokemonType } from './schema/schema.type';

import { db } from './connect';

async function clearBeforeSeed() {
  await db.delete(cardType);
  await db.delete(card);
  await db.delete(pokemonToType);
  await db.delete(pokemonType);
  await db.delete(pokemon);
}

async function seed() {
  // Types de Pokémon
  const pokemonTypes: NewPokemonType[] = [{ name: 'Électrique' }, { name: 'Eau' }, { name: 'Feu' }, { name: 'Plante' }];
  // Insérer les types de Pokémon
  await db.insert(pokemonType).values(pokemonTypes);

  // Pokémon
  const pokemons: NewPokemon[] = [
    {
      name: 'Pikachu',
      slug: 'pikachu',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
    },
    {
      name: 'Carapuce',
      slug: 'carapuce',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
    },
    {
      name: 'Salamèche',
      slug: 'salameche',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
    },
    {
      name: 'Bulbizarre',
      slug: 'bulbizarre',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
    },
  ];
  // Insérer les Pokémon
  await db.insert(pokemon).values(pokemons);

  const pokemonsRows = await db.select().from(pokemon);
  const pokemonIds = pokemonsRows.map((row) => row.id);

  const pokemonTypesRows = await db.select().from(pokemonType);
  const pokemonTypeIds = pokemonTypesRows.map((row) => row.id);

  // Associations Pokémon -> Types
  const pokemonToTypes: NewPokemonToType[] = [
    { pokemonId: pokemonIds[0], typeId: pokemonTypeIds[0] }, // Pikachu -> Electric
    { pokemonId: pokemonIds[1], typeId: pokemonTypeIds[1] }, // Carapuce -> Water
    { pokemonId: pokemonIds[2], typeId: pokemonTypeIds[2] }, // Salameche -> Fire
    { pokemonId: pokemonIds[3], typeId: pokemonTypeIds[3] }, // Bulbizarre -> Grass
  ];
  // Insérer les associations Pokémon -> Types
  await db.insert(pokemonToType).values(pokemonToTypes);

  // Types de cartes (par exemple, Base, EX, etc.)
  const cardTypes: NewCardType[] = [{ name: 'Base' }, { name: 'EX' }, { name: 'GX' }, { name: 'VMAX' }];
  // Insérer les types de cartes
  await db.insert(cardType).values(cardTypes);

  const cardTypesRows = await db.select().from(cardType);
  const cardTypeIds = cardTypesRows.map((row) => row.id);
  // Cartes Pokémon
  const cards: NewCard[] = [
    {
      pokemonId: pokemonIds[0],
      cardNumber: '001',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2-fr-fr/img/cards/web/SMP/SMP_FR_SM76.png',
      rarity: 'common',
      cardTypeId: cardTypeIds[0],
    },
    {
      pokemonId: pokemonIds[1],
      cardNumber: '002',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2-fr-fr/img/cards/web/SVP/SVP_FR_48.png',
      rarity: 'common',
      cardTypeId: cardTypeIds[0],
    },
    {
      pokemonId: pokemonIds[2],
      cardNumber: '003',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2-fr-fr/img/cards/web/SV3PT5/SV3PT5_FR_4.png',
      rarity: 'common',
      cardTypeId: cardTypeIds[0],
    },
    {
      pokemonId: pokemonIds[3],
      cardNumber: '004',
      imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2-fr-fr/img/cards/web/DP3/DP3_FR_77.png',
      rarity: 'common',
      cardTypeId: cardTypeIds[0],
    },
  ];
  // Insérer les cartes Pokémon
  await db.insert(card).values(cards);
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
