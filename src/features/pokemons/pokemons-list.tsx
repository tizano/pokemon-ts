'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination/pagination';
import useDebounce from '@/hooks/use-debounce';
import { getPokemons } from '@/services/pokemon.service';
import { PokemonWithType } from '@/types/pokemon.type';
import { QueryWithPagination } from '@/types/query.type';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import Filter from './filter/filter';

// const types = ['All', ...new Set(pokemonData.map((pokemon) => pokemon.type))];

export const PokemonList = () => {
  const queryParam = 'name';
  const itemsPerPage = 3;

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
    itemsPerPage: itemsPerPage,
    count: 0,
  });

  const debouncedSearchName = useDebounce(searchName, 300);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemons({
        page: currentPage,
        itemsPerPage,
        pokemonName: debouncedSearchName,
        pokemonTypeSlug: currentType,
      });
      setPokemonsData(data);
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

  // sdfsdf
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
            <li key={pokemonData.pokemon.id}>
              <Link href={`/pokemon/${pokemonData.pokemon.slug}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{pokemonData.pokemon.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Type: {pokemonData.pokemon_type?.name}</p>
                    <Image
                      src={pokemonData.pokemon.imageUrl}
                      alt={`${pokemonData.pokemon.name} image`}
                      width={200}
                      height={200}
                      className="mt-2 rounded-md"
                      priority={true}
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
