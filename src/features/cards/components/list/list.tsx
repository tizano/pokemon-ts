import { PokemonCard } from '@/features/cards/components/pokemon-card/pokemon-card';
import { CardWithPokemonAndRarity } from '@/lib/types/card.type';
import { cn } from '@/lib/utils/utils';

export const CardList: React.FC<{
  cardsData: CardWithPokemonAndRarity[];
  className?: string;
}> = ({ cardsData, className }) => (
  <ul className={cn('flex flex-wrap gap-8 mb-4', className)}>
    {cardsData.map(
      (cardData) =>
        cardData.imageUrl && (
          <li key={cardData.id}>
            <PokemonCard card={cardData} />
          </li>
        ),
    )}
  </ul>
);
