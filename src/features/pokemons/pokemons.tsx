'use client';

import { Pagination } from '@/components/pagination/pagination';
import { ITEMS_PER_PAGE } from '@/constants/pagination';
import useDebounce from '@/hooks/use-debounce';
import { usePokemons } from '@/hooks/use-pokemon';
import { useUrlParams } from '@/hooks/use-url-params';
import Filter from './components/filter/filter';
import { PokemonList } from './components/list/list';
import { PokemonListSkeleton } from './components/list/list-skeleton';

export const Pokemons = () => {
  const queryParam = 'name';

  const { searchName, currentType, currentPage, setCurrentPage } = useUrlParams();

  const debouncedSearchName = useDebounce(searchName, 300);

  const { data: pokemonsData, isLoading } = usePokemons({
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    pokemonName: debouncedSearchName,
    pokemonTypeSlug: currentType,
  });

  const resetPagination = (value: string = '') => (value === '' ? setCurrentPage(null) : setCurrentPage(1));

  const handleSearchValueChange = (value: string) => {
    resetPagination(value);
    console.info('search value change', value);
  };

  const handleSelectValueChange = (value: string) => {
    resetPagination();
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
      {!pokemonsData && <div>No Pokémon found</div>}
      {isLoading && <PokemonListSkeleton className="mb-14" />}

      {pokemonsData && (
        <>
          <PokemonList pokemonsData={pokemonsData} className="mb-14" />
          {pokemonsData.count > pokemonsData.itemsPerPage && (
            <Pagination itemsPerPage={pokemonsData.itemsPerPage} totalItems={pokemonsData.count} />
          )}
        </>
      )}
    </>
  );
};
