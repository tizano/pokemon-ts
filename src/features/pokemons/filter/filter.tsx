'use client';

import { getPokemonTypes } from '@/services/pokemon-type.service';
import { CustomQuery } from '@/shared/types/query.type';
import { PokemonType } from '@/shared/types/schema.type';
import { useEffect, useState } from 'react';
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
      <SelectType pokemonTypes={pokemonTypesData.data} onValueChange={onSelectValueChange} />
    </div>
  );
};

export default Filter;
