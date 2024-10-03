import { CardWithPokemonAndRarity } from '@/shared/types/card.type';
import Image from 'next/image';

export const PokemonCard: React.FC<{ card: CardWithPokemonAndRarity }> = ({ card }) => {
  const { rarity, imageUrl, cardNumber, pokemon, pokedexId } = card;
  return (
    <div>
      <h2 className="text-lg font-bold">Card NB {cardNumber}</h2>
      <p className="text-lg font-bold">Pokedex ID {pokedexId}</p>
      <p className="text-lg font-bold">Rarity {rarity?.slug}</p>
      <Image
        src={imageUrl}
        alt={`${pokemon?.name} image`}
        width={200}
        height={275}
        className="mt-2 rounded-md"
        priority={false}
      />
    </div>
  );
};
