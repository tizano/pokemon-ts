'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination/pagination';
import useDebounce from '@/hooks/use-debounce';
import { getPokemons } from '@/services/pokemon.service';
import { PokemonWithType } from '@/shared/types/pokemon.type';
import { QueryWithPagination } from '@/shared/types/query.type';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import Filter from './filter/filter';

export const PokemonsList = () => {
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
    console.info('select value change', value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Listing</h1>
      <>
        <Filter
          queryParam={queryParam}
          onSearchValueChange={handleSearchValueChange}
          onSelectValueChange={handleSelectValueChange}
        />
      </>

      {!pokemonsData.count && <div>No Pokémon found</div>}
      {pokemonsData.count && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {pokemonsData.data.map((pokemonData) => (
            <li key={pokemonData.id}>
              <Link href={`/pokemon/${pokemonData.slug}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{pokemonData.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Type:{' '}
                      {pokemonData.types.map((type) => (
                        //add coma if not last element
                        <span key={type.id}>
                          {type.name}
                          {pokemonData.types.indexOf(type) !== pokemonData.types.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                    <Image
                      src={pokemonData.imageUrl}
                      alt={`${pokemonData.name} image`}
                      width={200}
                      height={200}
                      className="mt-2 rounded-md"
                      priority={false}
                    ></Image>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {pokemonsData.count > pokemonsData.itemsPerPage && (
        <Pagination itemsPerPage={pokemonsData.itemsPerPage} totalItems={pokemonsData.count} />
      )}
    </div>
  );
};
