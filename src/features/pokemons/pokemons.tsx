'use client';

import { Container } from '@/components/container/container';
import { Pagination } from '@/components/pagination/pagination';
import { PokemonBadge } from '@/components/pokemon-badge/pokemon-badge';
import useDebounce from '@/hooks/use-debounce';
import { getPokemons } from '@/services/pokemon.service';
import { PokemonWithType } from '@/shared/types/pokemon.type';
import { QueryWithPagination } from '@/shared/types/query.type';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import Filter from './filter/filter';

export const Pokemons = () => {
  const queryParam = 'name';
  const itemsPerPage = 30;

  const [currentType] = useQueryState<string>('type', {
    defaultValue: '',
    clearOnDefault: true,
    parse: (value) => value,
  });
  const [searchName] = useQueryState(queryParam, { defaultValue: '' });
  const [currentPage, setCurrentPage] = useQueryState<number>('page', {
    defaultValue: 1,
    clearOnDefault: true,
    parse: (value) => parseInt(value, 10),
    serialize: (value) => value.toString(),
  });

  const [pokemonsData, setPokemonsData] = useState<QueryWithPagination<PokemonWithType[]>>({
    data: [],
    page: 0,
    itemsPerPage,
    count: 0,
  });

  const debouncedSearchName = useDebounce(searchName, 300);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPokemons({
        page: currentPage,
        itemsPerPage,
        pokemonName: debouncedSearchName,
        pokemonTypeSlug: currentType,
      });

      setPokemonsData(result);
    };
    fetchData();
  }, [debouncedSearchName, currentPage, currentType]);

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
    <Container htmlTag="section" className="relative z-10">
      <h1 className="fluid-2xl font-bold mb-4">Pokémon Listing</h1>
      <Filter
        queryParam={queryParam}
        onSearchValueChange={handleSearchValueChange}
        onSelectValueChange={handleSelectValueChange}
      />

      {!pokemonsData.count && <div>No Pokémon found</div>}
      {pokemonsData.count && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6  mb-4">
          {pokemonsData.data.map((pokemonData) => (
            <li key={pokemonData.id}>
              <Link href={`/pokemon/${pokemonData.slug}`}>
                <PokemonBadge pokemon={pokemonData} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {pokemonsData.count > pokemonsData.itemsPerPage && (
        <Pagination itemsPerPage={pokemonsData.itemsPerPage} totalItems={pokemonsData.count} />
      )}
    </Container>
  );
};
