import { getPokemonTypes } from '@/services/pokemon-type.service';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const typesQueryOptions = () =>
  queryOptions({
    queryKey: ['types'],
    queryFn: () => getPokemonTypes(),
  });

export const usePokemonTypes = () => useQuery(typesQueryOptions());
