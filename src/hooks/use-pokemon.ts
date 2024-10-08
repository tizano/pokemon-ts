import getQueryClient from '@/components/providers/get-query-client';
import { GetPokemonsProps } from '@/lib/types/pokemon.type';
import { NewPokemon } from '@/lib/types/schema.type';
import { createPokemon, getPokemons } from '@/services/pokemon.service';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

export const pokemonsQueryOptions = ({ page = 1, itemsPerPage = 10, pokemonName, pokemonTypeSlug }: GetPokemonsProps) =>
  queryOptions({
    queryKey: [
      'pokemons',
      {
        page,
        itemsPerPage,
        pokemonName,
        pokemonTypeSlug,
      },
    ],
    queryFn: () =>
      getPokemons({
        page,
        itemsPerPage,
        pokemonName,
        pokemonTypeSlug,
      }),
  });

export const usePokemons = (props: GetPokemonsProps) => useQuery(pokemonsQueryOptions(props));

// card mutation to create a new card
export const useCreatePokemon = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ['createPokemon'],
    mutationFn: (newPokemon: NewPokemon) => createPokemon(newPokemon),
    onSuccess: () =>
      // Invalidate the pokemons query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ['pokemons'],
      }),
  });
};
