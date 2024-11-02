'use client';

import { CardList } from '@/features/cards/components/list/list';
import { CardListSkeleton } from '@/features/cards/components/list/list-skeleton';
import { useCards } from '@/hooks/use-card';
import { useUrlParams } from '@/hooks/use-url-params';
import { FilterCard } from './components/filter/filter';

export const Cards = ({ pokemonSlug }: { pokemonSlug: string }) => {
  const { currentRarity, setCurrentRarity } = useUrlParams();
  const { data: cardsData, isLoading } = useCards({ pokemonSlug, raritySlug: currentRarity });

  const handleSelectValueChange = (value: string) => {
    if (value === 'all') {
      setCurrentRarity(null);
    }
    console.info('select value change', value);
  };

  return (
    <>
      <FilterCard className="mb-8" placeholder="Toutes les raretés" onSelectValueChange={handleSelectValueChange} />
      {isLoading && <CardListSkeleton />}
      <CardList cardsData={cardsData?.data || []} />
      {!cardsData?.data.length && !isLoading && (
        <h3 className="my-12 text-xl text-center text-white">Aucune carte trouvée</h3>
      )}
    </>
  );
};
