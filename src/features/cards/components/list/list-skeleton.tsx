import { ITEMS_PER_PAGE } from '@/constants';
import { cn } from '@/lib/utils/utils';
import { PokemonCardSkeleton } from '../pokemon-card/pokemon-card-skeleton';

export const CardListSkeleton: React.FC<{
  className?: string;
}> = ({ className }) => (
  <ul className={cn('flex flex-wrap gap-8 mb-4', className)}>
    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
      <li key={index}>
        <PokemonCardSkeleton />
      </li>
    ))}
  </ul>
);
