'use client';

import { getPokemonTypes } from '@/services/pokemon-type.service';
import { CustomQuery } from '@/types/query.type';
import { PokemonType } from '@/types/schema.type';
import { useEffect, useState } from 'react';
import SearchBar from './search-bar';
import SelectType from './select-type';

const Filter = ({
  queryParam,
  placeholder,
  onSearchValueChange,
  onSelectValueChange,
}: {
  queryParam: string;
  placeholder?: string;
  onSearchValueChange?: (value: string) => void;
  onSelectValueChange: (value: string) => void;
}) => {
  const [pokemonTypesData, setPokemonTypesData] = useState<CustomQuery<PokemonType[]>>({ data: [] });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonTypes();
      setPokemonTypesData(data);
    };
    fetchData();
  }, [queryParam]);
  return (
    <div className="flex gap-4 mb-4">
      <SearchBar queryParam={queryParam} onValueChange={onSearchValueChange} placeholder={placeholder} />
      <SelectType pokemonTypes={pokemonTypesData.data} onValueChange={onSelectValueChange} />
    </div>
  );
};

export default Filter;
