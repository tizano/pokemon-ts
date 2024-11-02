import { ITEMS_PER_PAGE } from '@/constants';
import { PokemonBadgeSkeleton } from '@/features/pokemons/components/pokemon-badge/pokemon-badge-skeleton';
import { cn } from '@/lib/utils/utils';

export const PokemonListSkeleton: React.FC<{
  className?: string;
}> = ({ className }) => (
  <ul className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6', className)}>
    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
      <li key={index}>
        <PokemonBadgeSkeleton />
      </li>
    ))}
  </ul>
);
