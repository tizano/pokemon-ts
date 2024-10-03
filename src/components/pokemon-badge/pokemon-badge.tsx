import { PokemonWithType } from '@/shared/types/pokemon.type';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const PokemonBadge: React.FC<{ pokemon: PokemonWithType }> = ({ pokemon }) => {
  const { name, types, imageUrl } = pokemon;
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Type:{' '}
          {types.map((type) => (
            //add coma if not last element
            <span key={type.id}>
              {type.name}
              {types.indexOf(type) !== types.length - 1 && ', '}
            </span>
          ))}
        </p>
        <Image
          src={imageUrl}
          alt={`${name} image`}
          width={200}
          height={200}
          className="mt-2 rounded-md"
          priority={false}
        ></Image>
      </CardContent>
    </Card>
  );
};
