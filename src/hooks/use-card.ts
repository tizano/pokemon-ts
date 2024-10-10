import getQueryClient from '@/components/providers/get-query-client';
import { GetCardsByPokemonProps } from '@/lib/types/card.type';
import { NewCard } from '@/lib/types/schema.type';
import { createCard, getCardsByPokemon } from '@/services/card.service';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

export const cardsQueryOptions = ({ pokemonSlug }: GetCardsByPokemonProps) =>
  queryOptions({
    queryKey: ['cards', { pokemonSlug }],
    queryFn: () => getCardsByPokemon({ pokemonSlug }),
  });

export const useCards = (props: GetCardsByPokemonProps) => useQuery(cardsQueryOptions(props));

export const useCreateCard = (newCard: NewCard) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ['createCard'],
    mutationFn: () => createCard(newCard),
    onSuccess: () => {
      // Invalidate the cards query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ['cards'],
        exact: true,
        refetchType: 'active',
      });
    },
  });
};
