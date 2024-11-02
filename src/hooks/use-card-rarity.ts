import { getCardRarities } from '@/services/card-rarity.service';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const cardRaritiesQueryOptions = () =>
  queryOptions({
    queryKey: ['rarities'],
    queryFn: () => getCardRarities(),
  });

export const useCardRarities = () => useQuery(cardRaritiesQueryOptions());
