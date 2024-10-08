'use client';

import { usePokemonTypes } from '@/hooks/use-pokemon-type';
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
  const { data: pokemonTypes } = usePokemonTypes();
  return (
    <div className={`flex gap-4 mb-4 ${className}`}>
      <SearchBar queryParam={queryParam} onValueChange={onSearchValueChange} placeholder={placeholder} />
      {pokemonTypes && <SelectType pokemonTypes={pokemonTypes.data} onValueChange={onSelectValueChange} />}
    </div>
  );
};

export default Filter;
