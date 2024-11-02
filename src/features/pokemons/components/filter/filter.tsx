'use client';

import { GenericSelect } from '@/components/generic-select/generic-select';
import SearchBar from '@/features/pokemons/components/filter/search-bar';
import { usePokemonTypes } from '@/hooks/use-pokemon-type';
import { PokemonType } from '@/lib/types/schema.type';
import { cn } from '@/lib/utils/utils';

interface FilterProps {
  queryParam: string;
  placeholder?: string;
  onSearchValueChange?: (value: string) => void;
  onSelectValueChange: (value: string) => void;
  className?: string;
}

export const Filter = ({
  queryParam,
  placeholder,
  onSearchValueChange,
  onSelectValueChange,
  className,
}: FilterProps) => {
  const defaultTypeValue: PokemonType = {
    id: 'all',
    slug: 'all',
    name: 'Tous les types',
  };

  const { data: pokemonTypes, isLoading } = usePokemonTypes();

  if (!pokemonTypes) {
    return null;
  }
  return (
    // add disabled prop to SearchBar and SelectType

    <div className={cn('flex gap-4 mb-4', isLoading && 'opacity-50', className)}>
      <SearchBar queryParam={queryParam} onValueChange={onSearchValueChange} placeholder={placeholder} />
      <GenericSelect
        items={pokemonTypes.data}
        onValueChange={onSelectValueChange}
        getItemKey={(type) => type.id}
        getItemValue={(type) => type.slug}
        getItemLabel={(type) => type.name}
        defaultItem={defaultTypeValue}
        queryKey="type"
        placeholder="Tous les types"
        useQueryParam={true}
      />
    </div>
  );
};
