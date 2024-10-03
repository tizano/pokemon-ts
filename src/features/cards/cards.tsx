'use client';

import { PokemonCard } from '@/components/pokemon-card/pokemon-card';
import { capitalize, removeDigitFromSlug } from '@/shared/utils/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { cardsQueryOptions } from './cards-query-options';

export const Cards = ({ pokemonSlug }: { pokemonSlug: string }) => {
  const clearedSlug = removeDigitFromSlug(pokemonSlug);
  const { data: pokemonCards } = useSuspenseQuery(cardsQueryOptions(pokemonSlug));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Liste des cartes Pokemon de <strong>{capitalize(clearedSlug)}</strong>
      </h1>
      {!pokemonCards?.data && <div>No Pokémon found</div>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {pokemonCards?.data.map(
          (pokemonCard) =>
            pokemonCard.imageUrl && (
              <li key={pokemonCard.id}>
                <PokemonCard card={pokemonCard} />
              </li>
            ),
        )}
      </ul>
    </div>
  );
};
