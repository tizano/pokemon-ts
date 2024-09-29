'use client';

import { getCardsByPokemon } from '@/services/card.service';
import { CardWithPokemonAndRarity } from '@/shared/types/card.type';
import { CustomQuery } from '@/shared/types/query.type';
import { capitalize, removeDigitFromSlug } from '@/shared/utils/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const CardsList = ({ pokemonSlug }: { pokemonSlug: string }) => {
  const [cardsData, setCardsData] = useState<CustomQuery<CardWithPokemonAndRarity[]>>({
    data: [],
  });

  const clearedSlug = removeDigitFromSlug(pokemonSlug);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCardsByPokemon({ pokemonSlug });
      setCardsData(data);
    };
    fetchData();
  }, [clearedSlug, pokemonSlug]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Liste des cartes pokemon de <strong>{capitalize(clearedSlug)}</strong>
      </h1>
      {!cardsData.data.length && <div>No Pokémon found</div>}
      {cardsData.data && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {cardsData.data.map(
            (cardData) =>
              cardData.imageUrl && (
                <li key={cardData.id}>
                  <h2 className="text-lg font-bold">Card NB {cardData.cardNumber}</h2>
                  <p className="text-lg font-bold">Pokedex ID {cardData.pokedexId}</p>
                  <p className="text-lg font-bold">Rarity {cardData.rarity?.slug}</p>
                  <Image
                    src={cardData.imageUrl}
                    alt={`${cardData.pokemon?.name} image`}
                    width={200}
                    height={200}
                    className="mt-2 rounded-md"
                    priority={false}
                  />
                </li>
              ),
          )}
        </ul>
      )}
    </div>
  );
};
