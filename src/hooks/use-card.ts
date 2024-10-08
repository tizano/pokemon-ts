// TODO
import { getCardsByPokemon } from '@/services/card.service';
import { queryOptions } from '@tanstack/react-query';

export const cardsQueryOptions = (pokemonSlug: string) =>
  queryOptions({
    queryKey: ['cards', { pokemonSlug }],
    queryFn: () => getCardsByPokemon({ pokemonSlug }),
  });
