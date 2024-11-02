import { PokemonBadge } from '@/features/pokemons/components/pokemon-badge/pokemon-badge';
import { PokemonWithType } from '@/lib/types/pokemon.type';
import { cn } from '@/lib/utils/utils';
import Link from 'next/link';

export const PokemonList: React.FC<{
  pokemonsData: PokemonWithType[];
  className?: string;
}> = ({ pokemonsData, className }) => (
  <ul className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6', className)}>
    {pokemonsData.map((pokemonData) => (
      <li key={pokemonData.id}>
        <Link href={`/pokemon/${pokemonData.slug}`}>
          <PokemonBadge pokemon={pokemonData} />
        </Link>
      </li>
    ))}
  </ul>
);
