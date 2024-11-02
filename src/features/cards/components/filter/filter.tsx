'use client';

import { GenericSelect } from '@/components/generic-select/generic-select';
import { useCardRarities } from '@/hooks/use-card-rarity';
import { PokemonType } from '@/lib/types/schema.type';
import { cn } from '@/lib/utils/utils';

interface FilterProps {
  placeholder?: string;
  onSelectValueChange?: (value: string) => void;
  className?: string;
}

export const FilterCard = ({ placeholder, onSelectValueChange = () => {}, className }: FilterProps) => {
  const defaultRarityValue: PokemonType = {
    id: 'all',
    slug: 'all',
    name: 'Toutes les raretés',
  };

  const { data: cardRarities, isLoading } = useCardRarities();

  if (!cardRarities) {
    return null;
  }
  return (
    <div className={cn('flex gap-4 mb-4', isLoading && 'opacity-50', className)}>
      <GenericSelect
        items={cardRarities.data}
        onValueChange={onSelectValueChange}
        getItemKey={(rarity) => rarity.id}
        getItemValue={(rarity) => rarity.slug}
        getItemLabel={(rarity) => rarity.name}
        defaultItem={defaultRarityValue}
        queryKey="rarity"
        placeholder={placeholder || 'Toutes les raretés'}
        useQueryParam={true}
      />
    </div>
  );
};
