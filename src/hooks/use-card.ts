import getQueryClient from '@/components/providers/get-query-client';
import { GetCardsByPokemonProps } from '@/lib/types/card.type';
import { NewCard } from '@/lib/types/schema.type';
import { createCard, getCardsByPokemon } from '@/services/card.service';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

export const cardsQueryOptions = ({ pokemonSlug, raritySlug }: GetCardsByPokemonProps) =>
  queryOptions({
    queryKey: ['cards', { pokemonSlug, raritySlug }],
    queryFn: () => getCardsByPokemon({ pokemonSlug, raritySlug }),
  });

export const useCards = (props: GetCardsByPokemonProps) => useQuery(cardsQueryOptions(props));

export const useCreateCard = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ['createCard'],
    mutationFn: (newCard: NewCard) => createCard(newCard),
    onSuccess: () => {
      // Invalidate the cards query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ['cards'],
      });
    },
  });
};
