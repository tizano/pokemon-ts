import { CardWithPokemonAndRarity } from '@/lib/types/card.type';
import Image from 'next/image';

export const PokemonCard: React.FC<{ card: CardWithPokemonAndRarity }> = ({ card }) => {
  const { rarity, imageUrl, pokemon } = card;
  return (
    <>
      <div className="flex w-fit rounded-[10px] overflow-hidden" data-rarity={rarity}>
        <Image src={imageUrl} alt={`${pokemon?.name} image`} width={200} height={275} priority={false} />
      </div>
    </>
  );
};
