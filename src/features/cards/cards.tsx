'use client';

import { PokemonCard } from '@/components/pokemon-card/pokemon-card';
import { PokemonCardSkeleton } from '@/components/pokemon-card/pokemon-card-skeleton';
import { useCards } from '@/hooks/use-card';

export const Cards = ({ pokemonSlug }: { pokemonSlug: string }) => {
  const { data: pokemonCards, isLoading } = useCards(pokemonSlug);
  if (isLoading) {
    return (
      <ul className="flex flex-wrap gap-8 mb-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index}>
            <PokemonCardSkeleton />
          </li>
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
