import { PokemonWithType } from '@/shared/types/pokemon.type';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
interface PokemonBadgeProps {
  pokemon: PokemonWithType;
}

export const PokemonBadge: React.FC<PokemonBadgeProps> = ({ pokemon }) => {
  const { name, types, imageUrl, pokedexId } = pokemon;

  const colorVariants: Record<string, string> = {
    grass: 'bg-pokemon-type-grass text-white',
    poison: 'bg-pokemon-type-poison text-white',
    fire: 'bg-pokemon-type-fire text-white',
    water: 'bg-pokemon-type-water text-white',
    bug: 'bg-pokemon-type-bug text-black',
    normal: 'bg-pokemon-type-normal text-white',
    electric: 'bg-pokemon-type-electric text-white',
    ground: 'bg-pokemon-type-ground text-white',
    fairy: 'bg-pokemon-type-fairy text-white',
    fighting: 'bg-pokemon-type-fighting text-white',
    psychic: 'bg-pokemon-type-psychic text-white',
    rock: 'bg-pokemon-type-rock text-white',
    steel: 'bg-pokemon-type-steel text-white',
    ice: 'bg-pokemon-type-ice text-white',
    ghost: 'bg-pokemon-type-ghost text-white',
    dragon: 'bg-pokemon-type-dragon text-white',
    dark: 'bg-pokemon-type-dark text-white',
    flying: 'bg-pokemon-type-flying text-white',
  };

  return (
    <div className="group flex justify-between items-center gap-3 md:gap-4 rounded-full bg-white p-4 transition-shadow hover:shadow-lg hover:shadow-pokemon-bg-600 overflow-hidden">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="relative after:bg-background after:rounded-full after:absolute after:h-[calc(100%-5px)] after:w-[calc(100%-5px)] after:top-[5px] after:left-[5px] after:z-0">
          <Image
            src={imageUrl}
            alt={`Illustration of ${name} pokemon`}
            width={90}
            height={90}
            priority={false}
            className="relative z-10 min-w-[80px] lg:min-w-[90px] transition-transform group-hover:animate-floating"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <h2 className="fluid-lg flex gap-2 items-center">
            <span className="font-semibold">{name}</span>
            <span className="text-gray-400">#{pokedexId}</span>
          </h2>
          <div className="flex gap-1">
            {types.map((type) => (
              <span
                key={type.id}
                className={`flex text-xs py-0.5 px-2 rounded-full text-white ${colorVariants[type.slug]}`}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mr-2 group-hover:translate-x-2 transition-transform">
        <ChevronRight className="text-pokemon-bg-900" size={32} />
      </div>
    </div>
  );
};
