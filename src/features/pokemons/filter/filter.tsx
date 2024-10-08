'use client';

import { CustomQuery } from '@/lib/types/query.type';
import { PokemonType } from '@/lib/types/schema.type';
import { getPokemonTypes } from '@/services/pokemon-type.service';
import { Suspense, useEffect, useState } from 'react';
import SearchBar from './search-bar';
import SelectType from './select-type';

interface FilterProps {
  queryParam: string;
  placeholder?: string;
  onSearchValueChange?: (value: string) => void;
  onSelectValueChange: (value: string) => void;
  className?: string;
}

const Filter = ({ queryParam, placeholder, onSearchValueChange, onSelectValueChange, className }: FilterProps) => {
  const [pokemonTypesData, setPokemonTypesData] = useState<CustomQuery<PokemonType[]>>({ data: [] });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonTypes();
      setPokemonTypesData(data);
    };
    fetchData();
  }, [queryParam]);
  return (
    <div className={`flex gap-4 mb-4 ${className}`}>
      <SearchBar queryParam={queryParam} onValueChange={onSearchValueChange} placeholder={placeholder} />
      <Suspense fallback={<div>Loading filter type ...</div>}>
        <SelectType pokemonTypes={pokemonTypesData.data} onValueChange={onSelectValueChange} />
      </Suspense>
    </div>
  );
};

export default Filter;
