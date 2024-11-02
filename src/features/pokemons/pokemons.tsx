'use client';

import { Pagination } from '@/components/pagination/pagination';
import { ITEMS_PER_PAGE } from '@/constants';
import { Filter } from '@/features/pokemons/components/filter/filter';
import { PokemonList } from '@/features/pokemons/components/list/list';
import { PokemonListSkeleton } from '@/features/pokemons/components/list/list-skeleton';
import useDebounce from '@/hooks/use-debounce';
import { usePokemons } from '@/hooks/use-pokemon';
import { useUrlParams } from '@/hooks/use-url-params';

export const Pokemons = () => {
  const queryParam = 'name';

  const { searchName, currentType, currentPage, setCurrentPage, setCurrentType } = useUrlParams();
  const debouncedSearchName = useDebounce(searchName, 300);

  const { data: pokemonsData, isLoading } = usePokemons({
    page: currentPage ?? 1,
    itemsPerPage: ITEMS_PER_PAGE,
    pokemonName: debouncedSearchName,
    pokemonTypeSlug: currentType,
  });

  const resetPagination = (value: string = '') => {
    if (value === '') {
      setCurrentPage(null);
    } else {
      setCurrentPage(1);
    }
  };

  const handleSearchValueChange = (value: string) => {
    resetPagination(value);
    console.info('search value change', value);
  };

  const handleSelectValueChange = (value: string) => {
    resetPagination();
    if (value === 'all') {
      setCurrentType(null);
    }
    console.info('select value change', value);
  };

  return (
    <>
      <Filter
        queryParam={queryParam}
        onSearchValueChange={handleSearchValueChange}
        onSelectValueChange={handleSelectValueChange}
        className="mb-8"
        placeholder="Rechercher un Pokémon"
      />
      {isLoading && <PokemonListSkeleton className="mb-24" />}
      {!pokemonsData?.data.length && !isLoading && (
        <h3 className="my-12 text-xl text-center text-white">Aucun Pokeémon trouvé</h3>
      )}

      <PokemonList pokemonsData={pokemonsData?.data || []} />

      {pokemonsData && pokemonsData.count > pokemonsData.itemsPerPage && (
        <Pagination className="mt-14" itemsPerPage={pokemonsData.itemsPerPage} totalItems={pokemonsData.count} />
      )}
    </>
  );
};
