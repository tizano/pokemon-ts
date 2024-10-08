'use server';
import getQueryClient from '@/components/providers/get-query-client';
import { NewCard } from '@/lib/types/schema.type';
import { createCard, getCardsByPokemon } from '@/services/card.service';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { headers } from 'next/headers';

export const cardsQueryOptions = (pokemonSlug: string) =>
  queryOptions({
    queryKey: ['cards', { pokemonSlug }],
    queryFn: () => getCardsByPokemon({ pokemonSlug, order: 'asc' }),
  });

export const useCards = (pokemonSlug: string) => useQuery(cardsQueryOptions(pokemonSlug));

export const useCreateCard = (newCard: NewCard) => {
  const queryClient = getQueryClient();
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';

  return useMutation({
    mutationKey: ['createCard'],
    mutationFn: () => createCard(newCard),
    onSuccess: () => {
      // Invalidate the cards query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ['cards', { pokemonSlug: pathname }],
        exact: true,
        refetchType: 'active',
      });
    },
  });
};
