import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PokemonType } from '@/lib/types/schema.type';
import { useQueryState } from 'nuqs';
import React from 'react';

interface SelectTypeProps {
  pokemonTypes: PokemonType[];
  onValueChange: (value: string) => void;
}

const SelectType: React.FC<SelectTypeProps> = ({ pokemonTypes, onValueChange }) => {
  const defaultTypeValue: PokemonType = {
    id: 'all',
    slug: 'all',
    name: 'Tous les types',
  };

  const [selectedType, setSelectedType] = useQueryState<string>('type', {
    defaultValue: defaultTypeValue.slug,
    clearOnDefault: true,
    parse: (value) => value,
  });

  const pokemonTypesList: PokemonType[] = [defaultTypeValue, ...pokemonTypes];

  const handleValueChange = (value: string) => {
    if (value === defaultTypeValue.slug) {
      setSelectedType(null);
    } else {
      const pokemonTypeToFind = pokemonTypesList.find((type) => type.slug === value);
      setSelectedType(pokemonTypeToFind?.slug || defaultTypeValue.slug);
    }
    onValueChange(value);
  };

  return (
    <Select value={selectedType} onValueChange={(typeSlug) => handleValueChange(typeSlug)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        {pokemonTypesList.map((pokemonType) => (
          <SelectItem key={pokemonType.id} value={pokemonType.slug}>
            {pokemonType.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectType;
