'use client';

import { PokemonCard } from '@/components/pokemon-card/pokemon-card';
import { PokemonCardSkeleton } from '@/components/pokemon-card/pokemon-card-skeleton';
import { cardsQueryOptions } from '@/hooks/use-card';
import { useQuery } from '@tanstack/react-query';

export const Cards = ({ pokemonSlug }: { pokemonSlug: string }) => {
  const { data: pokemonCards, isLoading } = useQuery(cardsQueryOptions(pokemonSlug));
  if (isLoading) {
    return (
      <ul className="flex flex-wrap gap-8 mb-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <PokemonCardSkeleton key={index} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="flex flex-wrap gap-8 mb-4">
        {pokemonCards?.data.map(
          (pokemonCard) =>
            pokemonCard.imageUrl && (
              <li key={pokemonCard.id}>
                <PokemonCard card={pokemonCard} />
              </li>
            ),
        )}
      </ul>
    </>
  );
};
